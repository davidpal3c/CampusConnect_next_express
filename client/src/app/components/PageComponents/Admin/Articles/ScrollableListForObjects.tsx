import React from 'react';
export interface Item {        
  program_id?: string; 
  department_id?: string; 
  name: string;
  [key: string]: any;                                           // allow any key to be used
}

// interface ScrollableListForObjectsProps {
//   items: Item[];                                                // array of objects passed to the component
//   selectedItems: Item[];                                        // array of selected objects
//   onSelect: (items: Item[]) => void;                            // handler for selection
//   includeAllOption?: boolean;                                   // Whether to include the "All" option
//   idObjKey: string;                                               // Key to use for comparing objects  
//   currentAudienceCriteria: any;                                 // current audience criteria
// }
interface ScrollableListForObjectsProps {
  items: Item[];
  selectedItems: Item[];
  onSelect: (items: Item[]) => void;
  includeAllOption?: boolean;
  idObjKey: string;
  currentAudienceCriteria: Item[];
}

const ScrollableListForObjects: React.FC<ScrollableListForObjectsProps> = ({
  items,
  selectedItems,
  onSelect,
  includeAllOption = true,
  idObjKey,
  currentAudienceCriteria
}) => {
  const handleItemClick = (item: 'All' | Item) => {
    if (item === 'All') {
      if (selectedItems.length === items.length) {
        onSelect([]);
      } else {
        onSelect([...items]);
      }
    } else {
      const isSelected = selectedItems.some((selected) => selected[idObjKey] === item[idObjKey]);
      if (isSelected) {
        const updatedItems = selectedItems.filter((selected) => selected[idObjKey] !== item[idObjKey]);
        onSelect(updatedItems);
      } else {
        onSelect([...selectedItems, item]);
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