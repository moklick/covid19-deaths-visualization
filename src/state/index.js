import create from 'zustand';

const useStore = create((set) => ({
  size: 100000,
  setSize: (size) => set({ size }),
  country: 'deu',
  setCountry: (country) => set({ country }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  mousePos: { x: 0, y: 0 },
  setMousePos: (mousePos) => set({ mousePos }),
}));

export default useStore;
