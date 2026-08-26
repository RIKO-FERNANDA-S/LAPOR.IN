"use client";
import dynamic from "next/dynamic";

const MapComponents = dynamic(() => import("./(map)/Peta.client"), {
  ssr: false,
  loading: () => <div>Tunggu sebentar</div>,
});

function petaWrapper() {
  return (
    <div className="h-screen w-screen">
      <MapComponents />
    </div>
  );
}

export default petaWrapper;
