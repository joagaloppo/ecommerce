'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { Range, Slider, Thumb, Track } from '@radix-ui/react-slider';
import Cropper, { Area } from 'react-easy-crop';
import Layout from '@/app/components/layout';
import { getCroppedImg } from '@/app/utils/canvas';

function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string), false);
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

    const onCropComplete = useCallback((_: Area, newCroppedAreaPixels: Area) => {
        setCroppedAreaPixels(newCroppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            if (imageSrc && croppedAreaPixels) {
                const newCroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
                console.log('done', { newCroppedImage });
                setCroppedImage(newCroppedImage);
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
            const imageDataUrl = await readFile(file);
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
                    <div
                        id="controls"
                        className="absolute bottom-0 flex w-full flex-col items-center gap-4 bg-white p-4"
                    >
                        <div id="zoom" className="flex items-center gap-4">
                            <p className="rounded-md bg-gray-800 px-3.5 py-1 text-xs font-medium text-gray-100">Zoom</p>
                            <Slider
                                className="group relative flex h-5 w-[200px] touch-none select-none items-center"
                                defaultValue={[0]}
                                min={1}
                                max={3}
                                step={0.1}
                                value={[zoom]}
                                onValueChange={(e) => setZoom(e[0])}
                            >
                                <Track className="relative h-[3px] grow cursor-pointer rounded-full bg-black/10">
                                    <Range className="absolute h-full rounded-full bg-black" />
                                </Track>
                                <Thumb
                                    className="block h-4 w-4 cursor-pointer rounded-full bg-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 group-active:ring-8"
                                    aria-label="Zoom"
                                />
                            </Slider>
                        </div>
                        <div id="rotation" className="flex items-center gap-4">
                            <p className="rounded-md bg-gray-800 px-3.5 py-1 text-xs font-medium text-gray-100">
                                Rotation
                            </p>
                            <Slider
                                className="group relative flex h-5 w-[200px] touch-none select-none items-center"
                                defaultValue={[0]}
                                min={0}
                                max={360}
                                step={10}
                                value={[rotation]}
                                onValueChange={(e) => setRotation(e[0])}
                            >
                                <Track className="relative h-[3px] grow cursor-pointer rounded-full bg-black/10">
                                    <Range className="absolute h-full rounded-full bg-black" />
                                </Track>
                                <Thumb
                                    className="block h-4 w-4 cursor-pointer rounded-full bg-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 group-active:ring-8"
                                    aria-label="Rotation"
                                />
                            </Slider>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setImageSrc(null)}
                                className="flex items-center justify-between rounded-md border-2 border-gray-600 px-6 py-1 text-xs font-semibold text-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                            >
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={showCroppedImage}
                                className="flex items-center justify-between rounded-md border-2 border-transparent bg-gray-800 px-6 py-1 text-xs font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                            >
                                <span>Submit</span>
                            </button>
                        </div>
                    </div>
                    <Dialog open={!!croppedImage} onOpenChange={onClose}>
                        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} asChild>
                            <div className="fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-[0px_0px_10px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                                <div className="flex h-full w-full items-center justify-center p-4">
                                    <Image
                                        height={896}
                                        width={504}
                                        src={croppedImage || ''}
                                        alt="Cropped"
                                        className="flex h-screen max-h-[90dvh] w-full items-center justify-center"
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
