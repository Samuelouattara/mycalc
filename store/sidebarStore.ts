'use client'

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SidebarState = 'expanded' | 'collapsed' | 'hidden';
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-desktop';

interface SidebarStore {
    sidebarState: SidebarState;
    lastDeviceType: DeviceType;
    setSidebarState: (state: SidebarState, isUserAction?: boolean) => void;
    setDeviceType: (device: DeviceType) => void;
    toggleSidebar: () => void;
    retractSidebar: () => void;
    expandSidebar: () => void;
    initializeFromStorage: () => void;
}

// Fonction utilitaire pour récupérer l'état depuis localStorage
const getStoredSidebarState = (): SidebarState => {
    if (typeof window === 'undefined') return 'expanded';
    
    try {
        const stored = localStorage.getItem('sidebarState');
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed === 'collapsed' ? 'collapsed' : 'expanded';
        }
    } catch (error) {
        console.warn('Erreur lors de la lecture du localStorage:', error);
    }
    return 'expanded';
};

// Fonction utilitaire pour sauvegarder l'état dans localStorage
const saveSidebarState = (state: SidebarState) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('sidebarState', JSON.stringify(state));
        } catch (error) {
            console.warn('Erreur lors de la sauvegarde dans localStorage:', error);
        }
    }
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
    sidebarState: getStoredSidebarState(),
    lastDeviceType: 'desktop',
    
    setSidebarState: (state: SidebarState, isUserAction = false) => {
        set({ sidebarState: state });
        saveSidebarState(state);
    },
    
    setDeviceType: (device: DeviceType) => {
        set({ lastDeviceType: device });
    },
    
    toggleSidebar: () => {
        const { sidebarState } = get();
        const newState = sidebarState === 'expanded' ? 'collapsed' : 'expanded';
        set({ sidebarState: newState });
        saveSidebarState(newState);
    },
    
    retractSidebar: () => {
        set({ sidebarState: 'collapsed' });
        saveSidebarState('collapsed');
    },
    
    expandSidebar: () => {
        set({ sidebarState: 'expanded' });
        saveSidebarState('expanded');
    },
    
    initializeFromStorage: () => {
        const storedState = getStoredSidebarState();
        set({ sidebarState: storedState });
    }
}));