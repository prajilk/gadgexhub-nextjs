import { AddressProps } from "@/lib/types/types";
import AddressDialog from "./dialog/AddressDialog";

const AddressCard = ({ address }: { address: AddressProps }) => {
  return (
    <>
      <div className="relative space-y-2 rounded-md border bg-white p-4 text-sm">
        {address.is_default && (
          <span className="rounded-sm bg-gray-200 px-2 py-1 text-xs font-normal text-gray-600">
            Default
          </span>
        )}
        <h2 className="font-semibold">{address.name}</h2>
        <p>{address.address}</p>
        <p>{address.locality}</p>
        <p>{address.district}</p>
        <p>
          {address.state} - {address.pincode}
        </p>
        <p>{address.phone}</p>
        <p>{address.alternate_phone}</p>
        <AddressDialog action="edit" address={address} />
      </div>
    </>
  );
};

export default AddressCard;

// const Loading = () => {
//   return (
//     <div className="flex flex-col justify-center space-y-3 rounded-md border p-2">
//       <div className="flex justify-between space-x-0">
//         <div className="skeleton h-5 w-20 rounded-md"></div>
//         <div className="skeleton h-7 w-7 rounded-full"></div>
//       </div>
//       <div className="skeleton h-7 w-64 rounded-md"></div>
//       <div className="skeleton h-5 w-56 rounded-md"></div>
//       <div className="skeleton h-5 w-56 rounded-md"></div>
//       <div className="skeleton h-5 w-56 rounded-md"></div>
//       <div className="skeleton h-5 w-56 rounded-md"></div>
//     </div>
//   );
// };

// const Failed = () => {
//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="w-fit rounded-full bg-gray-100 p-3">
//         <Unplug size={60} className="animate-pulse" />
//       </div>
//       <span className="text-xl font-medium">Failed to fetch data</span>
//     </div>
//   );
// };
