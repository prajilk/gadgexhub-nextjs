import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        addresses: null,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }
  const userId = session.user.id;

  try {
    const addresses = await db.address.findMany({
      where: {
        userId: userId,
      },
    });

    if (!addresses) {
      return NextResponse.json(
        {
          success: false,
          addresses: null,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        addresses: addresses,
        message: "Success",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        addresses: null,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }

  const userId = session.user.id;

  const address = await req.json();
  const result = ZodAddressSchema.safeParse(address);

  if (result.success) {
    try {
      // Retrieve a list of addresses associated with the userId
      const addressList = await db.address.findMany({
        where: {
          userId,
        },
      });

      let data;

      // Check if there are no addresses in the list or result.data.is_default is false
      if (addressList.length === 0) {
        data = {
          userId: userId,
          ...result.data,
          is_default: true,
          is_deleted: false,
        };
      } else {
        if (!result.data.is_default) {
          data = {
            userId: userId,
            ...result.data,
            is_deleted: false,
          };
        } else {
          await db.address.updateMany({
            data: {
              is_default: false,
            },
            where: {
              userId: userId,
            },
          });
          data = {
            userId: userId,
            ...result.data,
            is_deleted: false,
          };
        }
      }

      await db.address.create({
        data,
      });

      return NextResponse.json(
        {
          success: true,
          user: result.data,
          message: "Address saved successfully.",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }
  }

  if (result.error) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Invalid data format.",
      },
      { status: 400 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }

  const userId = session.user.id;

  const body = await req.json();

  if (!body?.address_id) {
    return NextResponse.json(
      {
        success: false,
        addresses: null,
        isDefault: false,
        message: "Address id missing!",
      },
      { status: 400 },
    );
  }
  const result = ZodAddressSchema.safeParse(body.data);

  if (result.success) {
    try {
      if (result.data.is_default) {
        await db.address.updateMany({
          data: {
            is_default: false,
          },
          where: {
            userId,
          },
        });
      }

      const address = await db.address.update({
        data: result.data,
        where: {
          address_id: body.address_id,
          userId,
        },
      });

      return NextResponse.json(
        {
          success: true,
          addresses: address,
          message: "Address updated successfully",
        },
        { status: 400 },
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          address: null,
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }
  }

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        address: null,
        message: "Invalid data format.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      {
        success: false,
        addresses: null,
        isDefault: false,
        message: "Missing user ID in the session.",
      },
      { status: 400 },
    );
  }
  const userId = session.user.id;
  const body = await req.json();

  if (!body?.address_id) {
    return NextResponse.json(
      {
        success: false,
        addresses: null,
        isDefault: false,
        message: "Address id missing!",
      },
      { status: 400 },
    );
  }

  try {
    const isDefault = await db.address.findUnique({
      where: {
        address_id: body.address_id,
        userId,
      },
    });

    if (isDefault?.is_default) {
      return NextResponse.json(
        {
          success: false,
          addresses: null,
          isDefault: true,
          message: "Default address cannot be deleted!",
        },
        { status: 400 },
      );
    }

    const result = await db.address.delete({
      where: {
        address_id: body.address_id,
        userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        addresses: result,
        isDefault: false,
        message: "Deleted address successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
