'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "../ui/icones/logoIcon";
import CalculerIcon from "../ui/icones/calculerIcon";
import SettingsIcon from "../ui/icones/settingsIcon";
import HistoryIcon from "../ui/icones/historyIcon";
import UsersIcon from "../ui/icones/usersIcon";
import IconDashboard from "../ui/icones/IconDashboard";
import { useSidebarStore } from "../../store/sidebarStore";
import ProfilIcon from "../ui/icones/ProfilIcon";
import { useResponsive } from "../../hooks/useResponsive";
import { useEffect } from "react";

const menuItems = [
    {
        id: 1,
        label: "Dashboard",
        href: "/",
        icon: <IconDashboard />
    },
    {
        id: 2,
        label: "Calculer",
        href: "/calculer",
        icon: <CalculerIcon />,
        badge: "12+"
    },
    {
        id: 3,
        label: "Mes calculs",
        href: "/mes-calculs",
        icon: <HistoryIcon />
    },
    {
        id: 4,
        label: "Utilisateurs",
        href: "/utilisateurs",
        icon: <UsersIcon />
    },
    {
        id: 5,
        label: "Profil",
        href: "/Profil",
        icon: <ProfilIcon />
    }
];

const generalItems = [
    {
        id: 1,
        label: "Settings",
        href: "/settings",
        icon: <SettingsIcon />
    },
    
];

interface LinkSidebarProps {
    href: string;
    label: string;
    icon?: any;
    isActive?: boolean;
    badge?: string;
    isCollapsed?: boolean;
}

// lien pour les pages
const LinkSidebar = ({ href, label, icon, isActive = false, badge, isCollapsed = false }: LinkSidebarProps) => {
    return (
        <Link href={href}>
            <div className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg transition-all duration-200 ${isActive
                ? 'bg-white shadow-sm'
                : 'hover:bg-gray-50'
                }`} title={isCollapsed ? label : undefined}>
                {/* Barre bleue pour l'état actif */}
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1C274D] rounded-r-sm"></div>
                )}

                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 pl-2'}`}>
                    <div className={`${isActive ? 'text-[#1C274D]' : 'text-gray-500'}`}>
                        {icon}
                    </div>
                    {!isCollapsed && (
                        <span className={`text-sm font-medium ${isActive ? 'text-[#1C274D] font-semibold' : 'text-gray-600'
                            }`}>
                            {label}
                        </span>
                    )}
                </div>

                {/* Badge de notification */}
                {badge && !isCollapsed && (
                    <div className="bg-[#1C274D] text-white text-xs px-2 py-1 rounded-md font-medium">
                        {badge}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default function SideBar() {
    const pathname = usePathname();
    const { sidebarState, setSidebarState } = useSidebarStore();
    const { isMobile, isTablet } = useResponsive();
    
    // Auto-collapse sidebar on mobile and tablet
    useEffect(() => {
        if (isMobile || isTablet) {
            setSidebarState('collapsed');
        }
    }, [isMobile, isTablet, setSidebarState]);
    
    const isCollapsed = sidebarState === 'collapsed';
    const shouldHideOnMobile = isMobile && !isCollapsed;

    // Sur mobile, on cache complètement la sidebar quand elle n'est pas collapsed
    if (shouldHideOnMobile) {
        return null;
    }

    return (
        <div className={`
            flex flex-col bg-[#F7F7F7] shadow-sm transition-all duration-300
            ${isMobile ? (
                isCollapsed 
                    ? 'fixed left-0 top-0 bottom-0 z-50 w-16 p-2' 
                    : 'fixed left-0 top-0 bottom-0 z-50 w-64 p-4 overflow-y-auto'
            ) : isTablet ? (
                isCollapsed 
                    ? 'w-16 p-2' 
                    : 'w-48 p-4'
            ) : (
                isCollapsed 
                    ? 'w-20 p-3' 
                    : 'w-80 p-6'
            )}
            ${isMobile || isTablet ? 'rounded-none' : 'rounded-xl m-4'}
        `}>
            {/* Overlay pour mobile quand sidebar ouverte */}
            {isMobile && !isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarState('collapsed')}
                />
            )}
            {/* Logo de mycalc  */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center mb-6' : 'gap-3 mb-8'}`}>
                <LogoIcon />
                {!isCollapsed && (
                    <p className="text-gray-800 text-xl font-bold">MyCalc</p>
                )}
            </div>

            {/* Menu de navigation  */}
            <div className="flex-1">
                {!isCollapsed && (
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">MENU</p>
                )}
                <div className={`space-y-1 ${isCollapsed ? 'mb-6' : 'mb-8'}`}>
                    {menuItems.map((item) => {
                        const isActive: boolean = pathname === item.href ||
                            (item.href === "/" && pathname === "/") ||
                            (item.href !== "/" && pathname.startsWith(item.href));

                        return (
                            <LinkSidebar
                                key={item.id}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                isActive={isActive}
                                badge={item.badge}
                                isCollapsed={isCollapsed}
                            />
                        );
                    })}
                </div>

                {/* General Section */}
                {!isCollapsed && (
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">GENERAL</p>
                )}
                <div className="space-y-1">
                    {generalItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href);

                        return (
                            <LinkSidebar
                                key={item.id}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                isActive={isActive}
                                isCollapsed={isCollapsed}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}