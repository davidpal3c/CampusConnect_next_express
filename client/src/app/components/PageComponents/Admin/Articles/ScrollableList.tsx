
interface ScrollableListProps {
    items: string[];
    selectedItems: string[];
    onSelect: any;
    includeAllOption?: boolean;
    type?: string;
  }
  const ScrollableList: React.FC<ScrollableListProps> = ({ items, selectedItems, onSelect, type, includeAllOption = true }) => {

    
    const handleItemClick = (item: string) => {
      if (item === 'All') {
        if (selectedItems.includes('All')) {            // If "All" is clicked, toggle between selecting all and deselecting all
          onSelect('All');                              // Deselect "All"
        } else {
          onSelect('All');                              // Select "All"
        }
      } else {
        if (selectedItems.includes(item)) {
          const updatedItems = selectedItems.filter((i) => i !== item);                       // Deselect the item
          onSelect(updatedItems.length === 0 ? 'All' : item);                                 // If no items are selected, implicitly select "All"
        } else {
          const updatedItems = [...selectedItems.filter((i) => i !== 'All'), item];           // Select the item and ensure "All" is deselected
          onSelect(item);
        }
      }
    };
  
    const isAllSelected = selectedItems.includes('All') || selectedItems.length === 0;        // Determine if "All" should be highlighted


    return (
      // {type === 'intake-year' ? (
      // ) : ( 
      // )
      // }
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
    