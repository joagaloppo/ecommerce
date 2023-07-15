'use client';

import { FaTimes as Close, FaTrash as Trash, FaEdit as Edit, FaSave as Save } from 'react-icons/fa';
import { FaMagnifyingGlass as Zoom, FaCheck as Check } from 'react-icons/fa6';
import { Range, Slider, Thumb, Track } from '@radix-ui/react-slider';

interface EditOptionsProps {
    children?: React.ReactNode;
    zoom: number;
    setZoom: (e: number) => void;
    showCroppedImage: () => void;
    setShowEdit: (e: boolean) => void;
}

export const EditOptions: React.FC<EditOptionsProps> = ({ zoom, setZoom, showCroppedImage, setShowEdit }) => {
    return (
        <div className="mx-auto flex w-full max-w-xs flex-col justify-center gap-6 bg-white px-4 py-6">
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
                <input disabled type="number" value={zoom} className="text-md m-0 w-10 bg-white p-0 text-center" />
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
    );
};

interface SaveOptionsProps {
    children?: React.ReactNode;
    setCroppedImage: (e: string | null) => void;
    setImageSrc: (e: string | null) => void;
    setShowEdit: (e: boolean) => void;
    downloadCroppedImage: () => void;
}

export const SaveOptions = ({ setShowEdit, setCroppedImage, setImageSrc, downloadCroppedImage }: SaveOptionsProps) => {
    return (
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
                onClick={downloadCroppedImage}
                className="mx-auto flex w-full max-w-[288px] items-center justify-center gap-2 rounded-full border-2 border-transparent bg-gray-800 px-6 py-2 text-sm font-medium text-white outline-none ring-black/20 transition-all duration-300 hover:ring-4 active:ring-8"
            >
                <Save />
                <span className="pointer-events-none">Guardar</span>
            </button>
        </div>
    );
};
