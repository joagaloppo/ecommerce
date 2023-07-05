"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { Slider, Track, Range, Thumb } from "@radix-ui/react-slider";
import { getCroppedImg } from "./utils/canvas";
import Layout from "./components/layout";
import Image from "next/image";

function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result as string), false);
    reader.readAsDataURL(file);
  });
}

const App = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        console.log("done", { croppedImage });
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  return (
    <>
      {imageSrc ? (
        <>
          <div id="cropper-container" className="absolute inset-0 bottom-[136px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={9 / 16}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="vertical-cover"
            />
          </div>
          <div id="controls" className="absolute gap-4 bottom-0 bg-white flex-col items-center flex w-full p-4">
            <div id="zoom" className="gap-4 flex items-center">
              <p className="font-medium px-3.5 py-1 text-xs text-slate-100 rounded-full bg-slate-800">Zoom</p>
              <Slider
                className="relative flex items-center select-none touch-none w-[200px] h-5"
                defaultValue={[0]}
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={(e) => setZoom(e[0])}
              >
                <Track className="bg-black/10 relative grow rounded-full h-[3px]">
                  <Range className="absolute bg-black rounded-full h-full" />
                </Track>
                <Thumb
                  className="block w-4 h-4 bg-gray-800 rounded-full outline-none hover:ring-4 active:ring-8 ring-black/20 transition-all duration-300"
                  aria-label="Zoom"
                />
              </Slider>
            </div>
            <div id="rotation" className="gap-4 flex items-center">
              <p className="font-medium px-3.5 py-1 text-xs text-slate-100 rounded-full bg-slate-800">Rotation</p>
              <Slider
                className="relative flex items-center select-none touch-none w-[200px] h-5"
                defaultValue={[0]}
                min={0}
                max={360}
                step={10}
                value={[rotation]}
                onValueChange={(e) => setRotation(e[0])}
              >
                <Track className="bg-black/10 relative grow rounded-full h-[3px]">
                  <Range className="absolute bg-black rounded-full h-full" />
                </Track>
                <Thumb
                  className="block w-4 h-4 bg-gray-800 rounded-full outline-none hover:ring-4 active:ring-8 ring-black/20 transition-all duration-300"
                  aria-label="Rotation"
                />
              </Slider>
            </div>
            <button
              id="submit"
              onClick={showCroppedImage}
              className="flex rounded-full text-xs transition-all duration-300 focus:ring-4 ring-black/20 focus:outline-none justify-between items-center px-6 py-1 font-medium bg-slate-800 text-white"
            >
              <span>Submit</span>
            </button>
          </div>
          <Dialog open={!!croppedImage} onOpenChange={onClose}>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} asChild>
              <div className="fixed left-1/2 top-[2vw] z-20 flex max-w-md -translate-x-1/2 rounded-md backdrop-blur-sm sm:top-1/2 sm:-translate-y-1/2 shadow-[0px_0px_10px_rgba(0,0,0,0.3)]">
                <div className="h-full w-full flex items-center justify-center p-4">
                  <Image
                    height={896}
                    width={504}
                    src={croppedImage || ""}
                    alt="Cropped"
                    className="flex items-center justify-center w-auto h-full max-h-[90dvh]"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <Layout>
          <input type="file" onChange={onFileChange} accept="image/*" />
        </Layout>
      )}
    </>
  );
};

export default App;
