import { create } from 'zustand';
import { sounds } from '@/utils/audio';

export type AppId = 'about' | 'projects' | 'contact' | 'arcade';

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
  isDark: boolean;

  isArcadeMode: boolean;
  isWarping: boolean;

  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  returnToDesktop: () => void;
  toggleTheme: () => void;

  startArcadeMode: () => void;
  exitArcadeMode: () => void;
}

const defaultWindows: Record<AppId, WindowState> = {
  about: { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  projects: { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  contact: { id: 'contact', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  arcade: { id: 'arcade', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
};

export const useOSStore = create<OSState>((set, get) => ({
  windows: defaultWindows,
  activeWindow: null,
  highestZIndex: 1,
  isDark: true,

  isArcadeMode: false,
  isWarping: false,

  startArcadeMode: () => {
    if (get().isArcadeMode || get().isWarping) return;

    sounds.playWarp();
    get().returnToDesktop();

    set({ isWarping: true });

    setTimeout(() => {
      set({ isWarping: false, isArcadeMode: true });
    }, 500);
  },

  exitArcadeMode: () => {
    set({ isArcadeMode: false, isWarping: false });
  },

  openApp: (id) =>
    set((state) => {
      if (id === "arcade") {
        get().startArcadeMode();
        return state;
      }

      const newZIndex = state.highestZIndex + 1;

      if (id === "contact") {
        return {
          windows: {
            ...state.windows,
            contact: {
              ...state.windows.contact,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              zIndex: newZIndex,
            },
          },
          activeWindow: "contact",
          highestZIndex: newZIndex,
        };
      }

      const isAppOpen = state.windows[id].isOpen;
      const otherMaximized = (Object.keys(state.windows) as AppId[]).find(
        (key) => key !== "contact" && key !== id && state.windows[key].isMaximized,
      );

      if (otherMaximized) {
        const updatedWindows = { ...state.windows };
        updatedWindows[otherMaximized] = {
          ...updatedWindows[otherMaximized],
          isMinimized: true,
        };
        updatedWindows[id] = {
          ...updatedWindows[id],
          isOpen: true,
          isMinimized: false,
          isMaximized: true,
          zIndex: newZIndex,
        };

        return {
          windows: updatedWindows,
          activeWindow: id,
          highestZIndex: newZIndex,
        };
      }

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
    set((state) => {
      if (id === "contact") return state;

      const willBeMaximized = !state.windows[id].isMaximized;
      const updatedWindows = { ...state.windows };

      if (willBeMaximized) {
        (Object.keys(updatedWindows) as AppId[]).forEach((key) => {
          if (key !== id && key !== "contact" && updatedWindows[key].isOpen) {
            updatedWindows[key] = { ...updatedWindows[key], isMinimized: true, isMaximized: false };
          }
        });
      }

      updatedWindows[id] = { ...updatedWindows[id], isMaximized: willBeMaximized };

      return { windows: updatedWindows };
    }),

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

  returnToDesktop: () =>
    set((state) => {
      const updatedWindows = { ...state.windows };
      (Object.keys(updatedWindows) as AppId[]).forEach((key) => {
        updatedWindows[key] = { ...updatedWindows[key], isMaximized: false, isMinimized: true };
      });
      return { windows: updatedWindows, activeWindow: null };
    }),

  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
