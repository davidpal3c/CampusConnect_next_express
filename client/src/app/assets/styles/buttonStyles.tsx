const createButton = { 
    base: "group flex items-center justify-between py-2 px-4 rounded-full h-9 font-normal text-saitWhite bg-saitWhite border border-saitBlue font-normal group transition delay-150 duration-300 ease-in-out",
    hover: "hover:text-saitWhite hover:border-saitGray hover:bg-saitPurple hover:shadow-2xl",
    active: "active:scale-75"
};

const editButton = {
    base: "group flex items-center justify-between py-2 px-4 rounded-full h-9 font-normal text-saitWhite bg-saitWhite border border-saitPurple font-normal group transition delay-150 duration-300 ease-in-out",
    hover: "hover:text-saitWhite hover:border-saitGray hover:bg-saitPurple hover:shadow-2xl",
    active: "active:scale-75"
};

const deleteButton = {
    base: "group flex items-center justify-between py-2 px-4 rounded-full h-9 font-normal text-saitDarkRed bg-saitWhite border border-saitDarkRed font-normal group transition delay-150 duration-300 ease-in-out",
    hover: "hover:text-saitWhite hover:border-saitGray hover:bg-saitDarkRed hover:shadow-2xl",
    active: "active:scale-75"
};

// Helper function to get full class string
const getButtonClasses = (buttonType: any) => {
    return `${buttonType.base} ${buttonType.hover} ${buttonType.active}`;
};

export { createButton, editButton, deleteButton, getButtonClasses };

