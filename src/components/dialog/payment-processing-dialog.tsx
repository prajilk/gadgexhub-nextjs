import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";

const PaymentProcessingDialog = ({ open }: { open: boolean }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex max-w-fit items-center justify-center rounded-xl">
        <div>
          <div className="my-5 flex justify-center gap-1">
            <div className="h-5 w-2 animate-bounce bg-black duration-700"></div>
            <div className="h-5 w-2 animate-bounce bg-black delay-100 duration-700"></div>
            <div className="h-5 w-2 animate-bounce bg-black delay-200 duration-700"></div>
          </div>
          <h1 className="text-center text-xs md:text-sm">
            Payment Processing...
          </h1>
          <p className="mt-1 whitespace-nowrap text-center text-[.55rem] md:text-[.7rem]">
            Do not close or refresh the window!
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentProcessingDialog;
