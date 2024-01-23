import { authOptions } from "@/lib/auth";
import { getImageThumbnail } from "@/lib/cart-utils";
import { db } from "@/lib/prisma";
import { error400, error500, success200 } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page") ?? 1;
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", {
        user: null,
        orders: [],
      });
    }
    const userId = session.user.id;
    const orders = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        order: {
          include: {
            orderItems: {
              include: {
                product: {
                  select: {
                    images: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!orders)
      return error400("There are no orders associated with this user id.", {
        orders: [],
      });

    const orderResponse = orders.order.map((order) => ({
      imageUrl: order.orderItems.map((orderItem) =>
        getImageThumbnail(
          {
            images: orderItem.product.images,
          },
          orderItem.color,
        ),
      ),
      orderId: order.id,
      orderDate: order.orderDate,
      status: order.status,
      payment_verified: order.payment_verified,
    }));

    return success200({
      orders: orderResponse
        .reverse()
        .slice((Number(page) - 1) * 10, Number(page) * 10),
    });
  } catch (error) {
    return error500({ orders: [] });
  }
}
