
// interface ScrollableListProps {
//   items: string[];
//   selectedItems: string[];
//   onSelect: any;
//   includeAllOption?: boolean;
//   currentAudienceCriteria: any;
// }
interface ScrollableListProps {
  items: string[];
  selectedItems: string[];
  onSelect: (items: string[]) => void;
  includeAllOption?: boolean;
  currentAudienceCriteria: string[];
}

const ScrollableList: React.FC<ScrollableListProps> = ({ items, selectedItems, onSelect, currentAudienceCriteria, includeAllOption = true }) => {
  const handleItemClick = (item: string) => {
    if (item === 'All') {
      const allSelected = selectedItems.length === items.length;
      if (allSelected) {
        onSelect([]);
      } else {
        onSelect([...items]);
      }
    } else {
      if (selectedItems.includes(item)) {
        const updatedItems = selectedItems.filter((i) => i !== item);
        onSelect(updatedItems);
      } else {
        const updatedItems = [...selectedItems.filter((i) => i !== 'All'), item];
        onSelect(updatedItems);
      }
    }
  };

  const isAllSelected = selectedItems.length === items.length && items.length > 0;

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-2 h-80 overflow-y-auto">
      <ul>
        {includeAllOption && (
          <li
            className={`p-2 cursor-pointer ${isAllSelected ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
            onClick={() => handleItemClick('All')}
          >
            All
          </li>
        )}
        {items.map((item) => (
          <li
            key={item}
            className={`p-2 cursor-pointer ${
              selectedItems.includes(item) ? 'bg-blue-100' : 'hover:bg-saitLightPurple'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollableList;