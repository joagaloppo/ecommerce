import { create } from 'zustand';

interface imageState {
    croppedImage: string | null;
    setCroppedImage: (croppedImage: string | null) => void;
}

export const useImageStore = create<imageState>()((set) => ({
    croppedImage: null,
    setCroppedImage: (croppedImage: string | null) => set({ croppedImage }),
}));
