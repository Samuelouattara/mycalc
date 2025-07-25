"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "../ui/icones/logoIcon";
import CalculerIcon from "../ui/icones/calculerIcon";
import SettingsIcon from "../ui/icones/settingsIcon";
import HistoryIcon from "../ui/icones/historyIcon";
import UsersIcon from "../ui/icones/usersIcon";
import DashboardIcon from "../ui/icones/dashboardIcon";

const menuItems = [
    {
        id: 1,
        label: "Dashboard",
        href: "/",
        icon: <DashboardIcon />
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
}

// lien pour les pages
const LinkSidebar = ({ href, label, icon, isActive = false, badge }: LinkSidebarProps) => {
    return (
        <Link href={href}>
            <div className={`relative flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-gray-50'
                }`}>
                {/* Barre verte pour l'état actif */}
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-sm"></div>
                )}

                <div className="flex items-center gap-3 pl-2">
                    <div className={`${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                        {icon}
                    </div>
                    <span className={`text-sm font-medium ${isActive ? 'text-green-600 font-semibold' : 'text-gray-600'
                        }`}>
                        {label}
                    </span>
                </div>

                {/* Badge de notification */}
                {badge && (
                    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                        {badge}
                    </div>
                )}
            </div>
        </Link>
    )
}

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-80 bg-[#F7F7F7] p-6 rounded-xl shadow-sm">
            {/* Logo de mycalc  */}
            <div className="flex items-center gap-3 mb-8">
                <LogoIcon />
                <p className="text-gray-800 text-xl font-bold">MyCalc</p>
            </div>

            {/* Menu de navigation  */}
            <div className="flex-1">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">MENU</p>
                <div className="space-y-1 mb-8">
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
                            />
                        );
                    })}
                </div>

                {/* General Section */}
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">GENERAL</p>
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
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}