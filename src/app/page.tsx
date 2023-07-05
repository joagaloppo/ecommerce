'use client';

import useImageStore from '@/app/state/imageStore';
import { FaTimes as Close, FaTrash as Trash, FaEdit as Edit, FaSave as Save } from 'react-icons/fa';
import { FaMagnifyingGlass as Zoom, FaArrowsRotate as Rotate, FaCheck as Check } from 'react-icons/fa6';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Range, Slider, Thumb, Track } from '@radix-ui/react-slider';
import Cropper, { Area } from 'react-easy-crop';
import Dropzone from '@/app/components/Dropzone';
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
                console.log('Cropped Area Pixels', croppedAreaPixels);
                const newCroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
                console.log('done', { newCroppedImage });
                setCroppedImage(newCroppedImage);
                setShowEdit(false);
            }
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, rotation, setCroppedImage]);

    const onFileChange = async (e: File) => {
        const imageDataUrl = await readFile(e);
        setImageSrc(imageDataUrl);
        setShowEdit(true);
    };

    return (
        <>
            {imageSrc && showEdit ? (
                <>
                    <div id="cropper-container" className="absolute inset-0 bottom-[167.2px]">
                        <Cropper
                            image={imageSrc}
                            rotation={rotation}
                            crop={crop}
                            zoom={zoom}
                            aspect={9 / 16}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            objectFit="vertical-cover"
                        />
                    </div>
                    <div id="controls" className="absolute bottom-0 flex w-full flex-col gap-6 bg-white px-4 py-6">
                        <div id="zoom" className="flex items-center gap-4">
                            <Zoom className="mx-2 h-6 w-auto" />
                            <Slider
                                className="group relative flex h-5 w-full touch-none select-none items-center"
                                defaultValue={[0]}
                                min={1}
                                max={2}
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
                            <input type="number" value={zoom} className="text-md m-0 w-10 p-0 text-center" />
                        </div>
                        <div id="rotation" className="flex items-center gap-4">
                            <Rotate className="mx-2 h-6 w-auto" />
                            <Slider
                                className="group relative flex h-5 w-full touch-none select-none items-center"
                                defaultValue={[0]}
                                min={0}
                                max={360}
                                step={15}
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
                            <input type="number" value={rotation} className="text-md m-0 w-10 p-0 text-center" />
                        </div>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => {
                                    setShowEdit(false);
                                }}
                                className="flex items-center justify-between gap-2 rounded-full border-2 border-gray-600 px-6 py-1.5 text-xs font-semibold text-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                            >
                                <Close />
                                <span className="pointer-events-none">Cancelar</span>
                            </button>
                            <button
                                onClick={showCroppedImage}
                                className="flex items-center justify-between gap-2 rounded-full border-2 border-transparent bg-gray-800 px-6 py-1.5 text-xs font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                            >
                                <Check />
                                <span className="pointer-events-none">Guardar</span>
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
                                src="/phone-bg.png"
                                alt="Cropped"
                                className="pointer-events-none absolute inset-0 top-6 mx-auto aspect-[9/16]  max-w-[288px] rounded-lg"
                            />
                            <Image
                                height={896}
                                width={504}
                                src={croppedImage}
                                alt="Cropped"
                                className="mx-auto aspect-[9/16]  max-w-[288px] rounded-lg"
                            />
                            <div className="flex flex-col justify-center gap-4 pt-4">
                                <button
                                    onClick={() => {
                                        setCroppedImage(null);
                                        setImageSrc(null);
                                    }}
                                    className="ring-red/20 mx-auto flex w-full max-w-[288px] items-center justify-center gap-2 rounded-full border-2 border-red-600 px-6 py-2 text-sm font-semibold text-red-800 outline-none ring-red-800/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    <Trash />
                                    <span className="pointer-events-none">Eliminar</span>
                                </button>

                                <button
                                    onClick={() => setShowEdit(true)}
                                    className="mx-auto flex w-full max-w-[288px] items-center justify-center gap-2 rounded-full border-2 border-gray-600 px-6 py-2 text-sm font-semibold text-gray-800 outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    <Edit />
                                    <span className="pointer-events-none">Editar</span>
                                </button>
                                <button
                                    // onClick={}
                                    className="mx-auto flex w-full max-w-[288px] items-center justify-center gap-2 rounded-full border-2 border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    <Save />
                                    <span className="pointer-events-none">Guardar</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Image
                                height={896}
                                width={504}
                                src="/phone-bg.png"
                                alt="Cropped"
                                className="pointer-events-none absolute inset-0 top-6 mx-auto aspect-[9/16]  max-w-[288px] rounded-lg"
                            />
                            <Dropzone onFileChange={onFileChange} />
                        </>
                    )}
                </Layout>
            )}
        </>
    );
};

export default App;
