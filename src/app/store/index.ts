import { create } from 'zustand';

interface imageState {
    croppedImage: string | null;
    setCroppedImage: (croppedImage: string | null) => void;
}

export const useImageStore = create<imageState>()((set) => ({
    croppedImage: null,
    setCroppedImage: (croppedImage: string | null) => set({ croppedImage }),
}));

// --------------------------------------------------------------------------------- //

interface aspectRatioState {
    aspectRatio: number;
    setAspectRatio: (aspectRatio: number) => void;
}

export const useAspectRatioStore = create<aspectRatioState>((set) => ({
    aspectRatio: 292 / 550,
    setAspectRatio: (aspectRatio: number) => set({ aspectRatio }),
}));
