import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed z-[9999] flex min-h-screen min-w-full items-center justify-center bg-black/50">
      <div className="rounded-md bg-white p-5">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
