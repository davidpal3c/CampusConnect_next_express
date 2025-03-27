import { usePathname } from "next/navigation";
import Link from "next/link";

import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import AdjustIcon from '@mui/icons-material/Adjust';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { getCurrentSeason } from "../../components/PageComponents/Admin/User/IntakePicker";


type NavigatorButtonProps = {
    href: string;
    icon: React.ComponentType<{
        className?: string;
      }>;
    name: React.ReactNode;
};

export default function TopBarNavigator({ userId }: { userId: string }) {

    const currentRoute = usePathname();

    const routeArray = [];
    let lastDash = currentRoute.length; 
    let route = "";
    let routeName = "";

    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    // Destructuring the current route
    for (let i = currentRoute.length - 1; i >= 0; i--) {
        if (currentRoute[i] === '/') {
            routeName = currentRoute.slice(i + 1, lastDash); 
            route = currentRoute.slice(0, lastDash); 
            lastDash = i;

            if (routeName) {
                routeArray.unshift({ route, routeName }); // Use unshift() for correct order
            }
        }
    }

    return (
        <div className="flex flex-row text-sm bg-white p-4 border-b-2">
            {routeArray.map((route, index) => (
                <div key={index} className="flex items-center">
                    <NavigatorButton 
                        href={route.route} 
                        icon={AdjustIcon} 
                        name={route.routeName} 
                    />
                    
                    {/* Add NavigateNextIcon if it's NOT the last item */}
                    {index < routeArray.length - 1 && (
                        <NavigateNextIcon className="text-saitBlack mx-2" />
                    )}
                </div>
            ))}
            <div className="flex flex-row items-center text-sm bg-white ml-auto">
                <p className="font-semibold mr-2">{currentSeason} {currentYear}</p> 
                <p className="border-l-2 px-4">Student ID: {userId}</p>
            </div>
        </div>
    );
}

function NavigatorButton(props: NavigatorButtonProps) {

    let name = props.name;
    let Icon = props.icon;

    switch (props.name) {
        case "user":
            name = "Dashboard";
            Icon = HomeIcon;
            break;
        case "events":
            name = "Events";
            Icon = EventIcon;            
            break;
        case "groups":
            name = "Groups";
            Icon = GroupIcon;
            break;
        case "articles":
            name = "Articles";
            Icon = ArticleIcon;
            break;
        default:
            break;
    }


    return (
        <Link 
            href={props.href} 
            className="flex items-center flex-row text-saitBlack mx-2 mr-4"
        >
            <Icon className="size-4 mr-1" />
            <h1>{name}</h1>
        </Link>
    );
}
