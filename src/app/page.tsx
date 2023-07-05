'use client';

import Dropzone from './components/Dropzone';
import { useImageStore } from './state/imageStore';
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
    const [showEdit, setShowEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const { croppedImage, setCroppedImage } = useImageStore();
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
                setShowEdit(false);
            }
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null);
    }, []);

    const onFileChange = async (e: File | React.ChangeEvent<HTMLInputElement>) => {
        let file;
        if (e instanceof File) file = e;
        else if (e.target.files && e.target.files.length > 0) file = e.target.files[0];
        if (!file) return;

        const imageDataUrl = await readFile(file);
        setImageSrc(imageDataUrl);
        setShowEdit(true);
    };

    return (
        <>
            {imageSrc && showEdit ? (
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
                                onClick={() => {
                                    croppedImage ? setShowEdit(false) : setImageSrc(null);
                                    setShowEdit(false);
                                }}
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
                </>
            ) : (
                <Layout>
                    {croppedImage ? (
                        <>
                            <Image
                                height={896}
                                width={504}
                                src={croppedImage}
                                alt="Cropped"
                                className="mx-auto w-72 rounded-lg"
                            />
                            <div className="flex justify-center gap-3 pt-4">
                                <button
                                    onClick={() => setCroppedImage(null)}
                                    className="flex items-center justify-between rounded-md border-2 border-gray-600 px-6 py-1 text-xs font-semibold text-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    <span>Delete</span>
                                </button>
                                <button
                                    onClick={() => setShowEdit(true)}
                                    className="flex items-center justify-between rounded-md border-2 border-transparent bg-gray-800 px-6 py-1 text-xs font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    <span>Edit</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <Dropzone onFileChange={onFileChange} />
                    )}
                </Layout>
            )}
        </>
    );
};

export default App;
