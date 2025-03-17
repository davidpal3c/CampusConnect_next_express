import React from 'react';

export interface Item {        
  program_id?: string; 
  department_id?: string; 
  name: string;
  [key: string]: any;                                           // allow any key to be used
}

interface ScrollableListForObjectsProps {
  items: Item[];                                                // array of objects passed to the component
  selectedItems: Item[];                                        // array of selected objects
  onSelect: (items: Item[]) => void;                            // handler for selection
  includeAllOption?: boolean;                                   // Whether to include the "All" option
  idObjKey: string;                                               // Key to use for comparing objects  
}

const ScrollableListForObjects: React.FC<ScrollableListForObjectsProps> = ({
  items,
  selectedItems,
  onSelect,
  includeAllOption = true,
  idObjKey,
}) => {
  const handleItemClick = (item: 'All' | Item) => {         
    if (item === 'All') {                                   // toggle "All" selection
      if (selectedItems.length === items.length) {
        onSelect([]); 
      } else {
        onSelect([...items]); 
      }
    } else {
      const isSelected = selectedItems.some((selected) => selected[idObjKey] === item[idObjKey]);                 // check if the item is already selected
  
      if (isSelected) {
        const updatedItems = selectedItems.filter((selected) => selected[idObjKey] !== item[idObjKey]);           // If the item is already selected, remove it from the selectedItems array
        onSelect(updatedItems);
      } else {
        // const updatedItems = [...selectedItems.filter((selected) => selected[idObjKey] !== 'All'), item];      // If the item is not selected, add it to the selectedItems array
        onSelect([...selectedItems, item]);           // if not selected, add it to the selectedItems array. This is because the "All" option is not included in the selectedItems array
      }
    }
  };

  const isAllSelected = selectedItems.length === items.length && items.length > 0;

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
        {items.map((item, index) => (
          <li
            key={`${item[idObjKey]}-${item.name}-${index}`} 
            className={`p-2 cursor-pointer ${
              selectedItems.some((selected) => selected[idObjKey] === item[idObjKey])
                ? 'bg-blue-100'
                : 'hover:bg-saitLightPurple'
            }`}
            onClick={() => handleItemClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollableListForObjects;