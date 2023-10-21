import { authOptions } from "@/lib/auth";
import { error400, error429, error500, success200 } from "@/lib/utils";
import { ZodAddressSchema } from "@/lib/zodSchemas";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAllAddresses,
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
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return error400("Missing user ID in the session.", { user: null });
  }

  const userId = session.user.id;

  const address = await req.json();
  const result = ZodAddressSchema.safeParse(address);

  if (result.success) {
    try {
      // Retrieve a list of addresses associated with the userId
      const addressList = await getAllAddresses(userId);

      let data;

      if (addressList?.length && addressList.length >= 5) {
        return error429("Address creation limit exceeded", { addresses: null });
      }

      // Check if there are no addresses in the list or result.data.is_default is false
      if (addressList?.length && addressList.length === 0) {
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
          await setDefaultFalseAddress(userId);
          data = {
            userId: userId,
            ...result.data,
            is_deleted: false,
          };
        }
      }

      await createAddress(data);

      return success200({ addresses: result.data });
    } catch (error) {
      return error500({ addresses: null });
    }
  }

  if (result.error) {
    return error400("Invalid data format", { addresses: null });
  }
}

export async function PUT(req: NextRequest) {
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
    try {
      if (result.data.is_default) {
        await setDefaultFalseAddress(userId);
      }

      const address = await updateAddress(result.data, body.address_id, userId);

      return success200({ addresses: address });
    } catch (error) {
      return error500({ address: null });
    }
  }

  if (!result.success) {
    return error400("Invalid data format.", { address: null });
  }
}

export async function DELETE(req: NextRequest) {
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

  try {
    const isDefault = await getAddress(address_id, userId);

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
