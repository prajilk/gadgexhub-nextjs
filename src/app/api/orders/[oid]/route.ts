import { getImageThumbnail } from "@/lib/cart-utils";
import { db } from "@/lib/prisma";
import { error400, error500, success200 } from "@/lib/utils";
import { NextRequest } from "next/server";
import { getAddress } from "../../user/address/helper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function formatVia(via: string | undefined, method: string | undefined) {
  if (!via || !method) return null;
  if (method === "upi") {
    const visiblePart = via.split("@")[0].substring(0, 3);
    const hiddenPart = "*".repeat(4);
    const visibleEnd = via.split("@")[1];
    return visiblePart + hiddenPart + "@" + visibleEnd;
  } else if (method.endsWith("card")) {
    return (
      via.split(",")[1].toUpperCase() + " " + "****" + " " + via.split(",")[0]
    );
  } else if (method === "wallet") {
    return via.substring(0, 1).toUpperCase() + via.substring(1, via.length);
  } else if (method === "netbanking") {
    return via.toUpperCase();
  }
  return null;
}

function formatMethod(method: string | undefined) {
  if (!method) return null;
  if (method === "upi") {
    return method.toUpperCase();
  } else if (method.endsWith("card")) {
    const name = method.split(" ")[0];
    const card = method.split(" ")[1];
    const capitalizeName =
      name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
    const capitalizeCard =
      card.substring(0, 1).toUpperCase() + card.substring(1, card.length);
    return capitalizeName + " " + capitalizeCard;
  } else if (method === "wallet") {
    return (
      method.substring(0, 1).toUpperCase() + method.substring(1, method.length)
    );
  } else if (method === "netbanking") {
    const net = method.substring(0, 3);
    const banking = method.substring(3, method.length);
    const capitalizeNet =
      net.substring(0, 1).toUpperCase() + net.substring(1, net.length);
    const capitalizeBanking =
      banking.substring(0, 1).toUpperCase() +
      banking.substring(1, banking.length);
    return capitalizeNet + " " + capitalizeBanking;
  }
  return null;
}

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
        payment: {
          select: {
            method: true,
            via: true,
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
      slug: orderItem.product.slug,
      productId: orderItem.productId,
      color: orderItem.color,
      quantity: orderItem.quantity,
      basePrice: orderItem.basePrice,
      offerPrice: orderItem.offerPrice,
      imageUrl: getImageThumbnail(
        { images: orderItem.product.images },
        orderItem.color,
      ),
    }));

    return success200({
      order: {
        address,
        orderItems,
        orderDate: order.orderDate,
        payment_verified: order.payment_verified,
        method: formatMethod(order.payment?.method),
        via: formatVia(order.payment?.via, order.payment?.method),
      },
    });
  } catch (error) {
    return error500({ order: null });
  }
}
