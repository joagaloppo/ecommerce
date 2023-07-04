"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";

const App = () => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  return (
    <section>
      <div className="absolute inset-0 bottom-[96px]">
        <Cropper
          image="https://images.unsplash.com/photo-1668701649406-83c46add1b1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
          aspect={9 / 16}
          crop={crop}
          zoom={zoom}
          maxZoom={3}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          objectFit="vertical-cover"
        />
      </div>
      <div className="flex gap-4 items-center justify-center absolute bottom-0 left-0 p-4 bg-white w-full h-24">
        <input
          className="focus:outline-none focus:ring-2 w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-black"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          maxLength={3}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <button className="focus:outline-none focus:ring-2 px-4 py-2 border border-gray-300 rounded-lg text-black">
          Submit
        </button>
      </div>
    </section>
  );
};

export default App;
