import { usePathname } from "next/navigation";

import AdjustIcon from '@mui/icons-material/Adjust';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigatorButton from "./NavigatorButton";

import { getCurrentSeason } from "../../components/PageComponents/Admin/User/IntakePicker";

export default function TopBarNavigator({ userId }: { userId: string }) {

    const currentRoute = usePathname();

    const routeArray: { route: string; routeName: string }[] = [];
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
                routeArray.unshift({ route, routeName }); 
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
                        parent={index > 0 ? routeArray[index - 1].routeName : null}
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

