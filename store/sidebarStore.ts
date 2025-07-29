'use client'


export type SidebarState = 'expanded' | 'collapsed' | 'hidden';
export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-desktop';

interface SidebarStore {
    sidebarState: SidebarState;
    userPreference: SidebarState | null; // Préférence manuelle de l'utilisateur
    lastDeviceType: DeviceType;
    setSidebarState: (state: SidebarState, isUserAction?: boolean) => void;
    setDeviceType: (device: DeviceType) => void;
    toggleSidebar: () => void;
    // getStateForDevice: (device: DeviceType) => SidebarState;
  }

export const useSidebarStore = () => {

}