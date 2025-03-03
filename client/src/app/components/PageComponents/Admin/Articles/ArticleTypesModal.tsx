import React, { useEffect, useState } from 'react';
import ArticleTypeCard from './ArticleTypeCard';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { toast } from "react-toastify";
import ActionButton from '@/app/components/Buttons/ActionButton';
import { useArticleTypes } from '@/app/_utils/articleTypes-context';
import { set, useForm } from "react-hook-form";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from "@mui/material";
import { Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from 'http';

type ArticleTypesModalProps = {
    openArticleTypesModal: boolean;
    setOpenArticleTypesModal: any;
    articlesData: any;
    fetchArticleData: any;
};

export default function ArticleTypesModal({ openArticleTypesModal, setOpenArticleTypesModal, articlesData, fetchArticleData }: ArticleTypesModalProps) {
    const { articleTypesData, fetchArticleTypes } = useArticleTypes();
    const [articleTypesDataFull, setArticleTypesDataFull] = useState([]);

    const [articleTypesCount, setArticleTypesCount] = useState<any[]>([]);
    const [isAddTypePanelVisible, setAddTypePanelVisible] = useState<boolean>(false);

    const handleArticleTypesModalClose = () => {
        setOpenArticleTypesModal(false);
    };

    const handleAddTypePanelOpen = () => setAddTypePanelVisible(true);
    const handleAddTypePanelClose = () => {
        setAddTypePanelVisible(false);
        reset();
    };

    const getArticleCountsByType = (articlesData: any, articleTypesData: any) => {
        // initializes an object with article type names as keys
        // and 0 as the initial count
        // object: { "type1": 0, "type2": 0, ... }
        const counts = articleTypesData.reduce((acc, type) => {
            acc[type.name] = 0;
            return acc;
        }, {});

        // updates the counts object with the count of each article type
        // in the articlesData array
        articlesData.forEach((article: any) => {
            const typeName = article.type?.name;
            if (typeName && counts.hasOwnProperty(typeName)) {
                counts[typeName]++;
            }
        });

        return counts;

        // return articlesData.reduce((acc, article) => {
        //     const typeName = article.type.name;
        //     acc[typeName] = (acc[typeName] || 0) + 1;
        //     return acc;
        // }, {});
    };

    useEffect(() => {
        if (articlesData && articleTypesData) {
            // calculate counts for each article type
            const result = getArticleCountsByType(articlesData, articleTypesData);
            const resultArray = Object.entries(result).map(([typeName, count]) => ({ typeName, count }));

            // map article types data to include count
            const mappedData = articleTypesData.map((type: any) => {
                const result = {
                    id: type.type_id,
                    name: type.name,
                    count: 0,
                    isDefault: type.isDefault || false,
                };

                // find count for this type
                const typeCount = resultArray.find((item) => item.typeName === type.name);
                if (typeCount) {
                    result.count = typeCount.count;
                }

                return result;
            });

            setArticleTypesCount(resultArray);
            setArticleTypesDataFull(mappedData);
            // console.log("Article Types Data Full:", mappedData);
        }
    }, [articlesData, articleTypesData]);


    // useEffect(() => {
    //     if (articlesData && articleTypesData) {
    //         const result = getArticleCountsByType(articlesData, articleTypesData);
    //         const resultArray = Object.entries(result).map(([typeName, count]) => ({ typeName, count }));
            
    //         // console.log("articles count by type array:", resultArray);
    //         setArticleTypesCount(resultArray);
    //         getArticleTypeDataFull();
    //     }
    // }, [articlesData, articleTypesData]);


    // const getArticleTypeDataFull = () => {        
    //     const mappedData = articleTypesData.map((type: any) => {
    //         const result = {
    //           id: type.type_id,
    //           name: type.name,
    //           count: 0,
    //           isDefault: type.isDefault || false, 
    //         };
        
    //         articleTypesCount.forEach((articleTypeCount) => {
    //           if (type.name === articleTypeCount.typeName) {
    //             result.count = articleTypeCount.count;
    //           }
    //         });
        
    //         return result;
    //       });
        
    //       setArticleTypesDataFull(mappedData);
    //       console.log("Article Types Data Full:", mappedData);
        
    //       return mappedData; 
    // };


    const { register, handleSubmit, formState: { errors, touchedFields, isSubmitted }, reset } = useForm({
        defaultValues: {
            addArticleType: "",
        },
        mode: "onSubmit"
    });

    const handleAddArticleType = async (data: string) => {
        // console.log("Form Data:", data.addArticleType?.trim());
        const newArticleType = data.addArticleType.trim();

        try { 
            if (!data.addArticleType) {
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/types`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ typeName: newArticleType }),
                credentials: "include", 
            });

            const responseData = await response.json();

            if(!response.ok) {
                console.error("Error adding article type:", responseData.message);
                toast.error("Error adding article type");
                return;
            }

            toast.success("Article type added successfully");
            await fetchArticleTypes();
            // setArticleTypesCount((prev) => [...prev, { typeName: newArticleType, count: 0 }]);
            // console.log("ARticle types count:", articleTypesCount);
        } catch(error) {
            console.error("Error adding article type:", error);
            toast.error("Error adding article type");
        } finally {
            handleAddTypePanelClose();
        }
    };

    return (
        <div>
            <Modal
                open={openArticleTypesModal}
                onClose={handleArticleTypesModalClose}
                aria-labelledby="article-types-modal"
                aria-describedby="article-types-description"
                id="article-types-modal"
                BackdropProps={{
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
                }}
            >
                <Box sx={modalStyle}>
                    <div className="flex flex-col items-center justify-center p-6 my-2 w-auto">
                        <div className="flex flex-row items-center justify-between w-full">
                            <div></div>
                            <div>
                                <h1 className="text-xl font-bold">Article Types</h1>
                            </div>
                            <Tooltip title="Close" arrow>
                                <IconButton onClick={handleArticleTypesModalClose}>
                                    <CloseRoundedIcon sx={{ fontSize: 25 }} />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full mt-4 bg-saitWhite">

                            <div className="grid grid-cols-3 gap-4 bg-saitLightBlue shadow-md border border-transparent p-4 rounded-lg w-full">
                                <div className="flex items-center justify-center">
                                    <h1 className="text-lg font-semibold text-saitWhite">Type</h1>
                                </div>
                                <div className="flex items-center justify-center">
                                    <h1 className="text-lg font-semibold text-saitWhite">Article Count</h1>
                                </div>
                                <div className="flex items-center justify-center">
                                    <h1 className="text-lg font-semibold text-saitWhite">Actions</h1>
                                </div>
                            </div>

                            {/* Table Body */}
                            {articleTypesDataFull && articleTypesDataFull.map((articleType: any, index: number) => (
                                <ArticleTypeCard key={index} articleType={articleType} fetchArticleData={fetchArticleData} />
                            ))}
                            
                            <div className="flex flex-row items-center justify-between w-full h-12 mt-5 overflow-hidden relative">
                                <div className="flex flex-row items-center justify-start w-full">           
                                    <div>
                                        {isAddTypePanelVisible ? (
                                            <button onClick={handleAddTypePanelClose} className={customButton}>
                                                Cancel
                                                <CloseRoundedIcon sx={{
                                                    fontSize: '1.4rem', 
                                                    marginRight: '-0.3rem', 
                                                    marginLeft: '0.25rem',
                                                    transition: 'color 300ms ease-in', // Combines transition-colors, duration-300, and ease-in
                                                    transitionDelay: '75ms', 
                                                    '&:hover': {
                                                        color: '#f7f7f7', 
                                                    },
                                                }} />
                                            </button>
                                        ) : (
                                            <Tooltip title="Add New Type" arrow>
                                                <div>
                                                    <ActionButton
                                                        title="Add"
                                                        onClick={handleAddTypePanelOpen}
                                                        hoverBgColor="bg-saitPurple"
                                                        borderColor="border-saitPurple"
                                                        textColor="text-saitPurple"
                                                        icon={<AddRoundedIcon sx={{ fontSize: 23 }} />}
                                                    />
                                                </div>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isAddTypePanelVisible && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute right-0 flex flex-row items-center w-full space-x-4"
                                            style={{ width: "calc(100% - 9.8rem)" }}
                                        >
                                            <form
                                                onSubmit={handleSubmit((data) => handleAddArticleType(data))}
                                                className="flex flex-row items-center w-full space-x-4"
                                            >
                                                <input
                                                    id="addArticleType"
                                                    type="text"
                                                    placeholder="Add New Type"
                                                    className="p-2 px-3 font-light border border-gray-300 rounded-xl w-48 xs:w-56 md:w-64 lg:w-80 focus:outline-none focus:ring-1 focus:ring-saitBlue focus:border-transparent"
                                                    {...register("addArticleType", {
                                                        validate: (value) => {
                                                            if (!value) {
                                                                return "This field is required";
                                                            }
                                                            if (!/^[A-Za-z\- @]+$/.test(value)) {
                                                                return "Only letters and symbols like '-', '@' are allowed";
                                                            }
                                                            return true;
                                                        },
                                                    })}
                                                />
                                                <Tooltip title="Add New Type" arrow>
                                                    <div>
                                                        <ActionButton
                                                            title="Submit"
                                                            type="submit"
                                                            hoverBgColor="bg-saitBlue"
                                                            borderColor="border-saitBlue"
                                                            textColor="text-saitBlue"
                                                        />
                                                    </div>
                                                </Tooltip>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Error Message */}
                            {errors.addArticleType && (touchedFields.addArticleType || isSubmitted) && (
                                <span className="text-saitRed text-sm">
                                    {errors.addArticleType.message}
                                </span>
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        'xs': 400,
        'sm': 550,
        'md': 620,
        'lg': 800,
        'xl': 900,
    },
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 4,
    boxShadow: 2,
    backgroundColor: "#f7f7f7",
};


const customButton = "group text-saitDarkRed border border-saitDarkRed bg-saitWhite font-normal h-9 flex flex-row items-center justify-center h-9 py-2 px-4 rounded-full hover:bg-saitDarkRed hover:text-white hover:shadow-2xl active:scale-75 transition delay-150 transition-colors transition-transform duration-300 ease-in-out";
