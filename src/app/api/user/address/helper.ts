import { db } from "@/lib/prisma";

async function getAddress(address_id: number, userId: string) {
  return await db.address.findUnique({
    where: {
      address_id,
      userId,
    },
  });
}

async function getAllAddresses(userId: string) {
  return await db.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        addresses: true,
      },
    })
    .addresses();
}

async function createAddress(data: any) {
  return await db.address.create({
    data,
  });
}

async function setDefaultFalseAddress(userId: string) {
  return await db.address.updateMany({
    data: {
      is_default: false,
    },
    where: {
      userId,
    },
  });
}

async function updateAddress(data: any, address_id: number, userId: string) {
  return await db.address.update({
    data,
    where: {
      address_id,
      userId,
    },
  });
}

async function deleteAddress(address_id: number, userId: string) {
  return await db.address.delete({
    where: {
      address_id,
      userId,
    },
  });
}

export {
  getAddress,
  getAllAddresses,
  createAddress,
  setDefaultFalseAddress,
  updateAddress,
  deleteAddress,
};
