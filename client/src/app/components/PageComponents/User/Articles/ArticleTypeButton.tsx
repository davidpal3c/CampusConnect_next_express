import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SchoolIcon from '@mui/icons-material/School';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import { ArticleType } from "@/app/pages/user/props";

const ICON_MAP: Record<ArticleType["name"], React.ComponentType<{ className?: string }>> = {
  "All Articles": LibraryBooksIcon,
  "Pre-Arrival": FlightLandIcon,
  "News": NewspaperIcon,
  "General Information": HomeIcon,
  "Campus Information": SchoolIcon
};

type ArticleTypeButtonProps = {
    articleType: ArticleType;
    type: string; // Represents the currently selected type (e.g., "News", "Pre-Arrival")
    setType: React.Dispatch<React.SetStateAction<string>>; // Function to update the selected type
  };

export default function ArticleTypeButton({ articleType, type, setType }: ArticleTypeButtonProps) {
  const Icon = ICON_MAP[articleType.name] || InfoIcon; // Default icon for unknown types

  return (
    <button
      key={articleType.type_id}
      onClick={() => setType(articleType.name)}
      className={`flex items-center gap-2 ${
        articleType.name === type ? "bg-saitLightBlue text-saitWhite" : "bg-white text-saitLightBlue"
      } text-saitLightBlue border-saitLightBlue border-[1px] px-4 py-2 rounded-md shadow-md`}
    >
      <Icon className="size-5" /> 
      {articleType.name}
    </button>
  );
}
