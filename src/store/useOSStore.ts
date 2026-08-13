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
  isDark: boolean;

  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  returnToDesktop: () => void;
  toggleTheme: () => void;
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
  isDark: true,

  openApp: (id) =>
    set((state) => {
      const isAppOpen = state.windows[id].isOpen;
      const newZIndex = state.highestZIndex + 1;
      const anyMaximized = Object.values(state.windows).some(w => w.isMaximized);

      if (anyMaximized) {
        const updatedWindows = { ...state.windows };
        (Object.keys(updatedWindows) as AppId[]).forEach(key => {
          updatedWindows[key] = { 
            ...updatedWindows[key], 
            isMinimized: key !== id, 
            isMaximized: key === id ? true : updatedWindows[key].isMaximized,
            isOpen: key === id
          };
        });
        updatedWindows[id].zIndex = newZIndex;
        
        return {
          windows: updatedWindows,
          activeWindow: id,
          highestZIndex: newZIndex
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
      const willBeMaximized = !state.windows[id].isMaximized;
      const updatedWindows = { ...state.windows };

      if (willBeMaximized) {
        (Object.keys(updatedWindows) as AppId[]).forEach(key => {
          if (key !== id && updatedWindows[key].isOpen) {
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
