import Link from "next/link";
import LogoIcon from "../ui/icones/logoIcon";
import DashboardIcon from "../ui/icones/dashboardIcon";


const menuItems = [
    {
        id: 1,
        label: "Dashboard",
        href: "/",
        icon: <DashboardIcon />,    
        isActive: true
    },
    {
        id: 2,
        label: "Calculer",
        href: "/calculer",
        // icon: CalculatorIcon,
        badge: "12+"
    },
    {
        id: 3,
        label: "Mes calculs",
        href: "/mes-calculs",
        // icon: HistoryIcon
    },
    {
        id: 4,
        label: "Utilisateurs",
        href: "/utilisateurs",
        // icon: UsersIcon
    }
];

const generalItems = [
    {
        id: 1,
        label: "Settings",
        href: "/settings",
        // icon: SettingsIcon
    },
    {
        id: 2,
        label: "Help",
        href: "/help",
        icon: "❓"
    },
    {
        id: 3,
        label: "Logout",
        href: "/logout",
        icon: "🚪"
    }
];

interface LinkSidebarProps {    
    href: string;
    label: string;
    key: number;
    icon?: any;
}

const LinkSidebar = ({href, label, key, icon}: LinkSidebarProps) => {
    return (
        <Link href={href} key={key}>
            <div className="flex items-center gap-2">
                {icon}
                <p className="text-black text-base font-regular">{label}</p>
            </div>
        </Link>
    )
}

export default function SideBar() {
    return (
        <div className="flex flex-col h-full w-80 bg-[#F7F7F7] p-2 ml-2 mt-2 rounded-xl">
            {/* Logo de mycalc  */}
            <div className="flex items-center gap-2 pt-2" >
                <LogoIcon />
                <p className="text-black text-2xl font-semibold">MyCalc</p>
            </div>

            {/* Menu de navigation  */}
            <div className="pt-10">
                <p className="text-black text-base font-semibold">MENU</p>
                {/* liens de navigation  */}
                <div>
                    {menuItems.map((item) => (  
                        <LinkSidebar href={item.href} label={item.label} key={item.id} icon={item.icon} />
                    ))}
                </div>
            </div>

            {/* General Section */}
            <div className="pt-10">
                <p className="text-black text-base font-semibold">GENERAL</p>
                {/* liens de navigation  */}
                <div>
                    {generalItems.map((item) => (  
                        <LinkSidebar href={item.href} label={item.label} key={item.id} icon={item.icon} />
                    ))}
                </div>
            </div>
        </div>
    );
}