import { authOptions } from "@/lib/auth";
import { error400, error429, error500, success200 } from "@/lib/utils";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import {
  checkAddressPresentInOrder,
  createAddress,
  deleteAddress,
  getAddress,
  getAllAddresses,
  markAsDeletedAddress,
  setDefaultFalseAddress,
  updateAddress,
} from "./helper";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { addresses: null });
    }
    const userId = session.user.id;
    const addresses = await getAllAddresses(userId);

    return success200({ addresses });
  } catch (error) {
    return error500({ addresses: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }

    const userId = session.user.id;

    const address = await req.json();
    const result = ZodAddressSchema.safeParse(address);
    if (result.success) {
      // Retrieve a list of addresses associated with the userId
      const addressList = await getAllAddresses(userId);

      if (addressList?.length && addressList?.length >= 5) {
        return error429("Address creation limit exceeded", { addresses: null });
      }

      let data;

      // Check if there are no addresses in the list or result.data.is_default is false
      if (addressList && addressList.length === 0) {
        data = {
          userId: userId,
          ...result.data,
          is_default: true,
          is_deleted: false,
        };
      } else {
        data = {
          userId: userId,
          ...result.data,
          is_deleted: false,
        };

        if (result.data.is_default) {
          await setDefaultFalseAddress(userId); // Remove old default address
        }
      }

      await createAddress(data);

      return success200({ addresses: result.data });
    }

    if (result.error) {
      return error400("Invalid data format", { addresses: null });
    }
  } catch (error) {
    return error500({ addresses: null });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }

    const userId = session.user.id;

    const body = await req.json();

    if (!body?.address_id) {
      return error400("Address id missing!", {
        addresses: null,
        isDefault: false,
      });
    }

    const result = ZodAddressSchema.safeParse(body.data);

    if (result.success) {
      if (result.data.is_default) {
        await setDefaultFalseAddress(userId);
      }

      const isAddressPresentInOrder = await checkAddressPresentInOrder(
        body.address_id,
        userId,
      );

      if (isAddressPresentInOrder) {
        await markAsDeletedAddress(userId, body.address_id);

        const newAddress = await createAddress({
          userId,
          ...result.data,
          is_deleted: false,
        });
        return success200({ addresses: newAddress });
      }

      const address = await updateAddress(result.data, body.address_id, userId);

      return success200({ addresses: address });
    }

    if (!result.success) {
      return error400("Invalid data format.", { address: null });
    }
  } catch (error) {
    return error500({ address: null });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return error400("Missing user ID in the session.", { user: null });
    }
    const userId = session.user.id;
    const address_id = parseInt(req.nextUrl.searchParams.get("id") || "");

    if (!address_id) {
      return error400("Address id missing!", {
        addresses: null,
        isDefault: false,
      });
    }
    const isDefault = await getAddress(address_id, userId);
    const isAddressPresentInOrder = await checkAddressPresentInOrder(
      address_id,
      userId,
    );

    if (isAddressPresentInOrder) {
      const result = await markAsDeletedAddress(userId, address_id);

      return success200({ addresses: result, isDefault: false });
    }

    if (isDefault?.is_default) {
      return error400("Default address cannot be deleted!", {
        addresses: null,
        isDefault: true,
      });
    }

    const result = await deleteAddress(address_id, userId);

    return success200({ addresses: result, isDefault: false });
  } catch (error) {
    return error500({ addresses: null, isDefault: false });
  }
}
