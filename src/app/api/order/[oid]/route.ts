import { getImageThumbnail } from "@/lib/cart-utils";
import { db } from "@/lib/prisma";
import { error400, error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";
import { getAddress } from "../../user/address/helper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { oid: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }
    const userId = session.user.id;

    const orderId = params.oid;
    if (!orderId)
      return error400("Missing Order Id parameter", { order: null });

    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
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

    if (!order) return error400("Invalid Order Id parameter", { order: null });

    const address = await getAddress(order.addressId, userId);
    if (!address)
      return error400("Invalid Delivery Address Id", { order: null });

    const orderItems = order.orderItems.map((orderItem) => ({
      title: orderItem.product.title,
      quantity: orderItem.quantity,
      price: orderItem.amount,
      imageUrl: getImageThumbnail(
        { images: orderItem.product.images },
        orderItem.color,
      ),
    }));

    return success200({
      order: {
        address,
        orderItems,
      },
    });
  } catch (error) {
    return error500({ order: null });
  }
}
