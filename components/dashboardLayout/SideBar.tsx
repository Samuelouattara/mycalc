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
import CloseIcon from "../ui/icones/CloseIcon";
import { useResponsive } from "../../hooks/useResponsive";
import { useEffect, useRef } from "react";

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
    onClick?: () => void;
}

// lien pour les pages
const LinkSidebar = ({ href, label, icon, isActive = false, badge, isCollapsed = false, onClick }: LinkSidebarProps) => {
    return (
        <Link href={href} onClick={onClick}>
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
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    const isCollapsed = sidebarState === 'collapsed';
    const isHidden = sidebarState === 'hidden';
    const isExpanded = sidebarState === 'expanded';
    
    // Auto-hide sidebar on mobile, auto-collapse on tablet
    useEffect(() => {
        if (isMobile) {
            setSidebarState('hidden');
        } else if (isTablet) {
            setSidebarState('collapsed');
        }
    }, [isMobile, isTablet, setSidebarState]);

    // Gérer les clics à l'extérieur de la sidebar sur mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMobile && 
                isExpanded && 
                sidebarRef.current && 
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setSidebarState('hidden');
            }
        };

        if (isMobile && isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isMobile, isExpanded, setSidebarState]);

    // Sur mobile, on cache complètement la sidebar quand elle est hidden
    if (isMobile && isHidden) {
        return null;
    }

    // Fonction pour fermer la sidebar sur mobile quand on clique sur un lien
    const handleLinkClick = () => {
        if (isMobile && isExpanded) {
            setSidebarState('hidden');
        }
    };

    return (
        <>
            {/* Overlay avec flou pour mobile quand la sidebar est ouverte */}
            {isMobile && isExpanded && (
                <div 
                    className="fixed inset-0 backdrop-blur-sm z-[100] transition-all duration-300"
                    onClick={() => setSidebarState('hidden')}
                    style={{ left: '256px', top: '0', right: '0', bottom: '0' }} // Décalage pour ne pas couvrir la sidebar et s'assurer que tout le reste est couvert
                />
            )}
            
            <div 
                ref={sidebarRef}
                className={`
                    flex flex-col bg-[#F7F7F7] transition-all duration-300
                    ${isMobile ? (
                        isExpanded 
                            ? 'fixed left-0 top-0 bottom-0 z-50 w-64 p-4 overflow-y-auto shadow-2xl' 
                            : 'fixed left-0 top-0 bottom-0 z-50 w-16 p-2 shadow-sm'
                    ) : isTablet ? (
                        isCollapsed 
                            ? 'w-16 p-2 shadow-sm' 
                            : 'w-48 p-4 shadow-sm'
                    ) : (
                        isCollapsed 
                            ? 'w-20 p-3 shadow-sm' 
                            : 'w-80 p-6 shadow-sm'
                    )}
                    ${isMobile || isTablet ? 'rounded-none' : 'rounded-xl m-4'}
                `}>
                
                {/* Bouton fermer pour mobile */}
                {isMobile && isExpanded && (
                    <button
                        onClick={() => setSidebarState('hidden')}
                        className="absolute top-5 right-4 p-2 hover:bg-gray-200 rounded-lg transition-colors z-60"
                        aria-label="Fermer le menu"
                    >
                        <CloseIcon />
                    </button>
                )}

                {/* Logo de mycalc  */}
                <div className={`flex items-center ${(isMobile && !isExpanded) || (!isMobile && isCollapsed) ? 'justify-center mb-6' : 'gap-3 mb-8'}`}>
                    <LogoIcon />
                    {((isMobile && isExpanded) || (!isMobile && !isCollapsed)) && (
                        <Link href="./" className="text-gray-800 text-xl font-bold">OuattCALC?</Link>
                    )}
                </div>

                {/* Menu de navigation  */}
                <div className="flex-1">
                    {((isMobile && isExpanded) || (!isMobile && !isCollapsed)) && (
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">MENU</p>
                    )}
                    <div className={`space-y-1 ${(isMobile && !isExpanded) || (!isMobile && isCollapsed) ? 'mb-6' : 'mb-8'}`}>
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
                                    isCollapsed={(isMobile && !isExpanded) || (!isMobile && isCollapsed)}
                                    onClick={handleLinkClick}
                                />
                            );
                        })}
                    </div>

                    {/* General Section */}
                    {((isMobile && isExpanded) || (!isMobile && !isCollapsed)) && (
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
                                    isCollapsed={(isMobile && !isExpanded) || (!isMobile && isCollapsed)}
                                    onClick={handleLinkClick}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}