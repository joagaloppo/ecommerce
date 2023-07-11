'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import Cropper, { Area } from 'react-easy-crop';
import Dropzone from '@/app/components/Dropzone';
import { EditOptions, SaveOptions } from '@/app/components/Options';
import { useAspectRatioStore, useImageStore } from '@/app/store';
import { getCroppedImg } from '@/app/utils/canvas';

function readFile(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string), false);
        reader.readAsDataURL(file);
    });
}

const App = () => {
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [showEdit, setShowEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [phoneTemplateSrc, setPhoneTemplateSrc] = useState('/iphone_x.png');
    const { croppedImage, setCroppedImage } = useImageStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore();

    const onFileChange = async (e: File) => {
        const imageDataUrl = await readFile(e);
        console.log('FILE CHANGE,', e);
        console.log('FILE CHANGE,', imageDataUrl);
        setImageSrc(imageDataUrl);
        setShowEdit(true);
    };

    const onCropComplete = useCallback((_: Area, newCroppedAreaPixels: Area) => {
        setCroppedAreaPixels(newCroppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            if (imageSrc && croppedAreaPixels) {
                console.log('Cropped Area Pixels', croppedAreaPixels);
                const newCroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
                console.log('done', { newCroppedImage });
                setCroppedImage(newCroppedImage);
                setShowEdit(false);
            }
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, setCroppedImage]);

    const downloadCroppedImage = () => {
        const a = document.createElement('a');
        a.href = croppedImage || '';
        a.download = 'image.png';
        a.click();
    };

    return (
        <>
            {imageSrc && showEdit ? (
                <>
                    <div className="relative mx-auto mt-6 h-auto w-[288px]" style={{ aspectRatio }}>
                        <Image
                            width={250}
                            height={500}
                            src={phoneTemplateSrc}
                            alt="Cropped"
                            className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-[288px]"
                            style={{ aspectRatio }}
                        />
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            maxZoom={2}
                            aspect={aspectRatio}
                            onZoomChange={setZoom}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            objectFit="vertical-cover"
                            showGrid={true}
                        />
                    </div>
                    <EditOptions
                        zoom={zoom}
                        setZoom={setZoom}
                        showCroppedImage={showCroppedImage}
                        setShowEdit={setShowEdit}
                    />
                </>
            ) : (
                <div className="absolute inset-0 mx-auto mt-6 h-auto ">
                    {croppedImage ? (
                        <>
                            <div
                                className="pointer-events-none relative inset-0 mx-auto w-full max-w-[288px]"
                                style={{ aspectRatio }}
                            >
                                <Image
                                    width={250}
                                    height={500}
                                    src={phoneTemplateSrc}
                                    alt="Cropped"
                                    className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-[288px]"
                                    style={{ aspectRatio }}
                                />
                                <Image
                                    width={250}
                                    height={500}
                                    src={croppedImage}
                                    alt="Cropped"
                                    className="pointer-events-none absolute inset-0 mx-auto w-full max-w-[288px]"
                                    style={{ aspectRatio }}
                                />
                            </div>
                            <SaveOptions
                                setCroppedImage={setCroppedImage}
                                setImageSrc={setImageSrc}
                                setShowEdit={setShowEdit}
                                downloadCroppedImage={downloadCroppedImage}
                            />
                        </>
                    ) : (
                        <div className="relative inset-0 mx-auto w-full max-w-[288px]">
                            <Image
                                width={250}
                                height={500}
                                src={phoneTemplateSrc}
                                alt="Phone Template"
                                className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-[288px]"
                                onLoad={(e: any) => setAspectRatio(e.target.naturalWidth / e.target.naturalHeight)}
                                style={{ aspectRatio }}
                            />
                            <Dropzone onFileChange={onFileChange} />
                            <div className="pt-4">
                                <button
                                    onClick={() =>
                                        setPhoneTemplateSrc(
                                            phoneTemplateSrc === '/iphone_14.png' ? '/iphone_x.png' : '/iphone_14.png'
                                        )
                                    }
                                    className="mx-auto flex w-full max-w-[288px] items-center justify-center gap-2 rounded-full border-2 border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
                                >
                                    Change phone
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default App;
