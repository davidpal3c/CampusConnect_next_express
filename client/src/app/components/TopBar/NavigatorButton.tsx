import { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ArticleIcon from '@mui/icons-material/Article';
import AdjustIcon from '@mui/icons-material/Adjust';

import { toast } from "react-toastify";

type NavigatorButtonProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  parent?: string | null;
};

const pageNames: {
  [key: string]: { label: string; icon: React.ComponentType<{ className?: string }> };
} = {
  user: { label: "Dashboard", icon: HomeIcon },
  events: { label: "Events", icon: EventIcon },
  groups: { label: "Groups", icon: GroupIcon },
  articles: { label: "Articles", icon: ArticleIcon },
};

export default function NavigatorButton(props: NavigatorButtonProps) {
  const [label, setLabel] = useState<React.ReactNode>(props.name);
  const [Icon, setIcon] = useState<React.ComponentType<{ className?: string }> | null>(props.icon);

  useEffect(() => {
    const setup = async () => {
      if (props.name in pageNames) {
        setLabel(pageNames[props.name].label);
        setIcon(pageNames[props.name].icon);
      } else if (props.parent && props.parent in pageNames) {
        const result = await fetchById(props.name, props.parent);
        setLabel(result?.title || result?.name || props.name);
        setIcon(pageNames[props.parent].icon);
      } else {
        setIcon(AdjustIcon); // default generic icon
      }
    };

    setup();
  }, [props.name, props.parent]);

  return (
    <Link
      href={props.href}
      className="flex items-center flex-row text-saitBlack mx-2 mr-4"
    >
      {Icon && <Icon className="size-4 mr-1" />}
      <h1>{label}</h1>
    </Link>
  );
  
}

// TO DO: MOVE TO A COMPONENT FILE
export const fetchById = async (id: string, parent: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${parent}/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
            credentials: "include",
        });

        return await handleApiResponse(response, parent);

    } catch (error) {
        toast.error("Unknown error occurred fetching by ID!");
        return null;
    }
};

export const handleApiResponse = async (response: Response, parent: string) => {
    const data = await response.json();

    if (!response.ok) {
        toast.error(`Error: ${data.message || "Failed to fetch data"}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        return null;
    }

    if (parent == "articles"){
        // If the response contains articles, filter out unpublished ones
        if (Array.isArray(data)) {
            return data.filter(article => article.status === "Published");
        }

        // If it's a single article, check its status
        if (data.status !== "Published") {
            return null;
        }
    }

    return data;
}




