
interface ScrollableListProps {
  items: string[];
  selectedItems: string[];
  onSelect: any;
  includeAllOption?: boolean;
  type?: string;
  currentAudienceCriteria: any;
}
const ScrollableList: React.FC<ScrollableListProps> = ({ items, selectedItems, onSelect, type, currentAudienceCriteria, includeAllOption = true }) => {

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
        const updatedItems = selectedItems.filter((i) => i !== item);                       // Deselect the item
        onSelect(updatedItems);                                                             // If no items are selected, implicitly select "All"
      } else {
        const updatedItems = [...selectedItems.filter((i) => i !== 'All'), item];           // Select the item and ensure "All" is deselected
        onSelect(updatedItems);
      }
    }
  };

  const isAllSelected = selectedItems.length === items.length && items.length > 0;          // Determine if "All" should be highlighted

  
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-2 h-80 overflow-y-auto">
      <ul>
        {/* "All" Option */}
        {includeAllOption && (
          <li
            className={`p-2 cursor-pointer ${
              isAllSelected ? 'bg-blue-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => handleItemClick('All')}
          >
            All
          </li>
        )}

        {/* List Items */}
        {items.map((item) => (
          <li
            key={item}
            className={`p-2 cursor-pointer ${
              selectedItems.includes(item) || currentAudienceCriteria?.includes(item) ? 'bg-blue-100' : 'hover:bg-saitLightPurple'
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