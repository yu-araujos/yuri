import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'contact';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface OSState {
  windows: Record<AppId, WindowState>;
  activeWindow: AppId | null;
  highestZIndex: number;

  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
}

const defaultWindows: Record<AppId, WindowState> = {
  about: { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  contact: { id: 'contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const useOSStore = create<OSState>((set) => ({
  windows: defaultWindows,
  activeWindow: null,
  highestZIndex: 1,

  openApp: (id) =>
    set((state) => {
      const isAppOpen = state.windows[id].isOpen;
      const newZIndex = state.highestZIndex + 1;
      
      if (isAppOpen) {
        return {
          windows: {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: false, zIndex: newZIndex },
          },
          activeWindow: id,
          highestZIndex: newZIndex,
        };
      }
      
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false, zIndex: newZIndex },
        },
        activeWindow: id,
        highestZIndex: newZIndex,
      };
    }),

  closeApp: (id) =>
    set((state) => {
      const nextActive = Object.values(state.windows)
        .filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: false, isMinimized: false, isMaximized: false },
        },
        activeWindow: nextActive,
      };
    }),

  minimizeApp: (id) =>
    set((state) => {
      const nextActive = Object.values(state.windows)
        .filter((w) => w.id !== id && w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex)[0]?.id || null;

      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: true },
        },
        activeWindow: nextActive,
      };
    }),

  maximizeApp: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusApp: (id) =>
    set((state) => {
      if (state.activeWindow === id) return state;
      
      const newZIndex = state.highestZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: newZIndex, isMinimized: false },
        },
        activeWindow: id,
        highestZIndex: newZIndex,
      };
    }),
}));
