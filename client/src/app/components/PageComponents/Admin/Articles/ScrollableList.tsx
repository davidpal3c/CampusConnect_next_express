
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
  

// interface Item {
//   [key: string]: any;
//   name: string;
// }
// interface ScrollableListProps {
//   items: Item[] | string[];
//   selectedItems: Item[] | string[];
//   onSelect: (item: Item | 'All') => void;
//   includeAllOption?: boolean;
//   idKey?: string;
// }


// const ScrollableList: React.FC<ScrollableListProps> = ({ items, selectedItems, onSelect, includeAllOption = true, idKey = 'id' }) => {

//   const handleItemClick = (item: Item | 'All') => {
//     if (item === 'All') {
//       if (selectedItems.length === items.length) {
//         onSelect('All'); 
//       } else {
//         onSelect('All'); 
//       }

//     } else {
//       const isSelected = selectedItems.some((selected) => selected[idKey] === item[idKey]);
//       if (isSelected) {
//         const updatedItems = selectedItems.filter((selected) => selected[idKey] !== item[idKey]);
//         onSelect(updatedItems.length === 0 ? 'All' : item);
//       } else {
//         const updatedItems = [...selectedItems.filter((selected) => selected[idKey] !== 'All'), item];
//         onSelect(item);
//       }
//     }
//   };

//   // const handleItemClick = (item: Item | 'All') => {
//   //   if (item === 'All') {
//   //     if (selectedItems.length === items.length) {                                              // Toggle "All" selection
//   //       onSelect('All');                                                                        // Deselect all
//   //     } else {
//   //       onSelect('All');                                                                        // Select all
//   //     }
//   //   } else {
//   //     const isSelected = selectedItems.some((selected) => selected.id === item.id);             // Toggle specific item selection
//   //     if (isSelected) {
//   //       const updatedItems = selectedItems.filter((selected) => selected.id !== item.id);       // Deselect the item
//   //       onSelect(updatedItems.length === 0 ? 'All' : item);
//   //     } else {
//   //       const updatedItems = [...selectedItems.filter((selected) => selected.id !== 'All'), item];    // Select the item and ensure "All" is deselected
//   //       onSelect(item);
//   //     }
//   //   }
//   // };

//   const isAllSelected = selectedItems.length === items.length;       // Determine if "All" should be highlighted by checking if all items are selected


//   return (
//     <div className="bg-white border border-gray-300 rounded-lg p-2 h-80 overflow-y-auto">
//       <ul>
//         {/* "All" Option */}
//         {includeAllOption && (
//           <li
//             className={`p-2 cursor-pointer ${
//               isAllSelected ? 'bg-blue-200' : 'hover:bg-gray-100'
//             }`}
//             onClick={() => handleItemClick('All')}
//           >
//             All
//           </li>
//         )}

//         {/* List Items */}
//         {items.map((item) => (
//           <li
//             key={item.id}
//             className={`p-2 cursor-pointer ${
//               selectedItems.some((selected) => selected.id === item.id)
//               ? 'bg-blue-100' 
//               : 'hover:bg-saitLightPurple'
//             }`}
//             onClick={() => handleItemClick(item)}
//           >
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScrollableList;





// import React from 'react';

// interface ScrollableListProps {
//   items: string[] | { [key: string]: any }[]; // Allow both string and object arrays
//   selectedItems: string[] | { [key: string]: any }[]; // Allow both string and object arrays
//   onSelect: (item: string | 'All' | { [key: string]: any }) => void; // Handle string, 'All', or object
//   includeAllOption?: boolean;
//   idObjKey?: string; // Key for the ID field in object-based items (e.g., 'program_id', 'department_id')
// }

// const ScrollableList: React.FC<ScrollableListProps> = ({
//   items,
//   selectedItems,
//   onSelect,
//   idObjKey,
//   includeAllOption = true,
// }) => {
//   const handleItemClick = (item: string | { [key: string]: any } | 'All') => {
//     if (item === 'All') {
//       // Toggle "All" selection
//       if (selectedItems.length === items.length) {
//         onSelect('All'); // Deselect all
//       } else {
//         onSelect('All'); // Select all
//       }
//     } else {
//       // Handle selection based on whether items are objects or strings
//       if (idObjKey && typeof item === 'object') {
//         // Object-based items
//         const isSelected = selectedItems.some(
//           (selected) => typeof selected === 'object' && selected[idObjKey] === item[idObjKey]
//         );
  
//         if (isSelected) {
//           // Deselect the item
//           const updatedItems = selectedItems.filter(
//             (selected) => typeof selected === 'object' && selected[idObjKey] !== item[idObjKey]
//           );
//           onSelect(updatedItems.length === 0 ? 'All' : item);
//         } else {
//           // Select the item and ensure "All" is deselected
//           const updatedItems = [
//             ...selectedItems.filter((selected) => typeof selected === 'object' && selected[idObjKey] !== 'All'),
//             item,
//           ];
//           onSelect(item);
//         }
//       } else if (typeof item === 'string') {
//         // String-based items
//         const isSelected = (selectedItems as string[]).includes(item);
  
//         if (isSelected) {
//           // Deselect the item
//           const updatedItems = (selectedItems as string[]).filter((i) => i !== item);
//           onSelect(updatedItems.length === 0 ? 'All' : item);
//         } else {
//           // Select the item and ensure "All" is deselected
//           const updatedItems = [...(selectedItems as string[]).filter((i) => i !== 'All'), item];
//           onSelect(item);
//         }
//       }
//     }
//   };

//   const isAllSelected = selectedItems.length === items.length;

//   return (
//     <div className="bg-white border border-gray-300 rounded-lg p-2 h-80 overflow-y-auto">
//       <ul>
//         {/* "All" Option */}
//         {includeAllOption && (
//           <li
//             className={`p-2 cursor-pointer ${
//               isAllSelected ? 'bg-blue-200' : 'hover:bg-gray-100'
//             }`}
//             onClick={() => handleItemClick('All')}
//           >
//             All
//           </li>
//         )}

//         {/* List Items */}
//         {items.map((item, index) => (
//           <li
//             key={idObjKey && typeof item === 'object' ? item[idObjKey] : item} // Use ID for objects, item itself for strings
//             className={`p-2 cursor-pointer ${
//               idObjKey && typeof item === 'object'
//                 ? selectedItems.some((selected) => typeof selected === 'object' && selected[idObjKey] === item[idObjKey])
//                 : selectedItems.includes(item)
//                   ? 'bg-blue-100'
//                   : 'hover:bg-saitLightPurple'
//             }`}
//             onClick={() => handleItemClick(item)}
//           >
//             {idObjKey && typeof item === 'object' ? item.name : item} {/* Display name for objects, item itself for strings */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ScrollableList;