'use client';

import { useSidebarStore } from "../../store/sidebarStore";
import { useResponsive } from "../../hooks/useResponsive";

export default function MobileMenuButton() {
    const { toggleSidebar, sidebarState } = useSidebarStore();
    const { isMobile } = useResponsive();
    const isCollapsed = sidebarState === 'collapsed';

    if (!isMobile) return null;

    return (
        <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-60 p-3 bg-white rounded-lg shadow-lg border border-gray-200"
            aria-label="Menu"
        >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600 transition-all"></div>
                <div className="w-full h-0.5 bg-gray-600 transition-all"></div>
                <div className="w-full h-0.5 bg-gray-600 transition-all"></div>
            </div>
        </button>
    );
}
