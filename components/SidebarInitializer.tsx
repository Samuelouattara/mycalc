'use client'

import { useEffect } from 'react';
import { useSidebarStore } from '../store/sidebarStore';

export default function SidebarInitializer() {
    const { initializeFromStorage } = useSidebarStore();

    useEffect(() => {
        // Initialiser l'état depuis localStorage au montage du composant
        initializeFromStorage();
    }, [initializeFromStorage]);

    // Ce composant ne rend rien visuellement
    return null;
}
