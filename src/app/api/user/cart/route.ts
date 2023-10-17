import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type PostBody = {
  productId: string;
  quantity: number;
  color: string | null;
};

type PatchBody = Omit<PostBody, "color">;

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Missing user ID in the session.",
        },
        { status: 400 },
      );
    }

    const userId = session.user.id;
    const cart = await db.cart.findUnique({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0) {
      return NextResponse.json(
        {
          success: true,
          item: [],
          message: "Cart is Empty!",
        },
        { status: 200 },
      );
    }

    const cartItemsArray = cart.cartItems.map((cartItem) => ({
      id: cartItem.productId,
      slug: cartItem.product.slug,
      title: cartItem.product.title,
      image: cartItem.product.images.reverse()[0].imagePublicId,
      color: cartItem.color,
      quantity: cartItem.quantity,
      url: `store/${cartItem.product.slug}?pid=${cartItem.productId}`,
    }));

    return NextResponse.json(
      {
        success: true,
        item: cartItemsArray,
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. SVR",
        item: null,
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body: PostBody | null = await req.json();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Missing user ID in the session.",
        },
        { status: 400 },
      );
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Invalid data format.",
        },
        { status: 400 },
      );
    }

    const existingCart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        cartItems: true,
      },
    });

    if (!existingCart) {
      const cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
      });
      await db.cartItem.create({
        data: {
          ...body,
          cartId: cart.id,
        },
      });
    } else {
      const itemIndex = existingCart.cartItems.findIndex(
        (item) => item.productId === body.productId,
      );

      if (itemIndex === -1) {
        await db.cartItem.create({
          data: {
            ...body,
            cartId: existingCart.id,
          },
        });
      } else {
        if (existingCart.cartItems[itemIndex].quantity >= 10) {
          return NextResponse.json(
            {
              success: false,
              message: "Maximum quantity of 10 reached for this item!",
              item: null,
            },
            { status: 400 },
          );
        }
        await db.cartItem.update({
          where: {
            id: existingCart.cartItems[itemIndex].id,
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success",
        item: {},
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. SVR",
        item: null,
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body: PatchBody | null = await req.json();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Missing user ID in the session.",
        },
        { status: 400 },
      );
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Invalid data format.",
        },
        { status: 400 },
      );
    }

    const cart = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        cartItems: true,
      },
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "No cart available with this user id",
          item: null,
        },
        { status: 400 },
      );
    }

    const itemIndex = cart.cartItems.findIndex(
      (cartItem) => cartItem.productId === body.productId,
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "No product available in this cart with given product id",
          item: null,
        },
        { status: 400 },
      );
    } else {
      if (cart.cartItems[itemIndex].quantity >= 10 || body.quantity > 10) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum quantity of 10 reached for this item!",
            item: null,
          },
          { status: 400 },
        );
      }
      if (cart.cartItems[itemIndex].quantity <= 1 || body.quantity < 1) {
        return NextResponse.json(
          {
            success: false,
            message: "Minimum quantity is 1!",
            item: null,
          },
          { status: 400 },
        );
      }
      await db.cartItem.update({
        where: {
          id: cart.cartItems[itemIndex].id,
        },
        data: {
          quantity: body.quantity,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: "Success",
          item: {},
        },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. SVR!",
        item: null,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          success: false,
          item: null,
          message: "Missing user ID in the session.",
        },
        { status: 400 },
      );
    }

    const product_id = req.nextUrl.searchParams.get("pid");
    if (!product_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Product id missing!",
          item: null,
        },
        { status: 400 },
      );
    }

    const cartItems = await db.cart.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        cartItems: true,
      },
    });

    if (!cartItems) {
      return NextResponse.json(
        {
          success: false,
          message: "No items in the cart!",
          item: null,
        },
        { status: 400 },
      );
    }

    const item = cartItems.cartItems.find(
      (cartItem) => cartItem.productId === product_id,
    );
    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: `No item in the cart with id ${product_id}`,
          item: null,
        },
        { status: 400 },
      );
    }

    await db.cartItem.delete({
      where: {
        id: item.id,
      },
    });

    return NextResponse.json(
      {
        success: false,
        message: "Success",
        item: [],
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. SVR",
      item: null,
    });
  }
}
