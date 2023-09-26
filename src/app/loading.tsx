import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-2 rounded-3xl bg-white p-5">
        <Loader2 className="mx-auto animate-spin" size={30} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
