"use client";

import dynamic from "next/dynamic";

const DashboardMapClient = dynamic(
  () => import("./DashboardMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[340px] rounded-2xl bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center gap-3 text-neutral-400">
        <span className="w-6 h-6 border-2 border-neutral-300 border-t-black rounded-full animate-spin"></span>
        <span className="text-xs font-medium">Memuat Peta Spasial Realtime...</span>
      </div>
    ),
  }
);

export default DashboardMapClient;
