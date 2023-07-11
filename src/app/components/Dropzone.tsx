import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { HiOutlineCloudUpload as Upload } from 'react-icons/hi';
import { useAspectRatioStore } from '@/app/store';

interface Props {
    children?: React.ReactNode;
    onFileChange: (e: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileChange }) => {
    const { aspectRatio } = useAspectRatioStore();
    const [dragging, setDragging] = useState(false);
    const dropRef = useRef<HTMLLabelElement>(null);
    let dragCounter = 0;

    const handleDrag = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragIn = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounter += 1;
        if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
            setDragging(true);
        }
    };

    const handleDragOut = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        dragCounter -= 1;
        if (dragCounter === 0) {
            setDragging(false);
        }
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setDragging(false);
        if (event.dataTransfer?.files && event.dataTransfer?.files.length > 0) {
            onFileChange(event.dataTransfer?.files[0]);
            event.dataTransfer?.clearData();
            dragCounter = 0;
        }
    };

    useEffect(() => {
        const div = dropRef.current;
        if (div) {
            div.addEventListener('dragenter', handleDragIn);
            div.addEventListener('dragleave', handleDragOut);
            div.addEventListener('dragover', handleDrag);
            div.addEventListener('drop', handleDrop);
        }
        return () => {
            if (div) {
                div.removeEventListener('dragenter', handleDragIn);
                div.removeEventListener('dragleave', handleDragOut);
                div.removeEventListener('dragover', handleDrag);
                div.removeEventListener('drop', handleDrop);
            }
        };
    }, [handleDragIn, handleDragOut, handleDrop]);

    return (
        <div className="relative inset-0 mx-auto flex w-full max-w-[288px]" style={{ aspectRatio }}>
            <label
                className={clsx(
                    'flex w-full cursor-pointer flex-col items-center justify-center bg-gray-50 hover:bg-gray-100',
                    dragging && 'text-blue bg-blue-100 hover:bg-blue-100'
                )}
                ref={dropRef}
            >
                <div className="flex flex-col items-center justify-center">
                    <Upload className="mb-4 h-10 w-10 text-gray-400" />
                    <p className="mb-2 px-4 text-center text-sm text-gray-500 ">
                        <span className="font-semibold">Toca aqui </span>para seleccionar
                        <br />o arrastra una imagen
                    </p>
                </div>
                <input
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) onFileChange(e.target.files[0]);
                    }}
                    accept="image/*"
                />
            </label>
        </div>
    );
};

export default Dropzone;
