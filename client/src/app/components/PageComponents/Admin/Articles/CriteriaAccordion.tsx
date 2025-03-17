import React, { useState, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { maxHeaderSize } from 'http';
interface CriteriaAccordionProps {
    criteria: any;
}

const CriteriaAccordion: React.FC<CriteriaAccordionProps> = ({ criteria }) => {
    
    const [expanded, setExpanded] = useState(false);
    const accordionRef = useRef<HTMLDivElement>(null);  
    
    const [totalCriteria, setTotalCriteria] = useState<number>(0);

    const countCriteria= (criteria: any) => {
        const totalSelectedItems =
        (criteria?.departments?.length || 0) +
        (criteria?.programs?.length || 0) +
        (criteria?.intakeSeasons?.length || 0) +
        (criteria?.intakeYear?.length || 0);

        setTotalCriteria(totalSelectedItems);
    }    

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);


    useEffect(() => {
        countCriteria(criteria);
    }, [criteria]);


    return (
        // set criteria length in TITLE if it is not empty 
        <div ref={accordionRef}>
            <Accordion 
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={accordionStyle.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="criteria-content"
                    id="criteria-header"
                    sx={accordionStyle.summary}
                >
                    <Typography variant="subtitle1" sx={accordionStyle.title}>
                        <div className="flex flex-row">
                            <p className="text-md">
                                {Object.keys(criteria).length > 0 ? `Selected Criteria (${totalCriteria})` : "Selected Criteria"}
                            </p>
                            {Object.keys(criteria).length > 0 &&
                                <CheckRoundedIcon sx={{ marginLeft: 1.2 }}/>
                            }
                        </div>
                    </Typography>
                </AccordionSummary>
                {criteria && Object.keys(criteria).length > 0 ? (   
                    // <div className="bg-white p-2 border-gray-400 border rounded-md">
                    <div>
                        {criteria.departments && criteria.departments.length > 0 && (
                            <AccordionDetails sx={accordionStyle.details}>
                            <Typography variant="body2" component="div" sx={accordionStyle.content}>
                                <span className="font-semibold">Departments:</span> 
                                {criteria.departments.map((d: any) => 
                                    <div key={d.department_id}>* {d.name}</div>
                                )}
                            </Typography>
                        </AccordionDetails>  
                        )}
                        {criteria.programs && criteria.programs.length > 0 && (
                            <AccordionDetails sx={accordionStyle.details}>
                                <Typography variant="body2" component="div" sx={accordionStyle.content}>
                                    <span className="font-semibold">Programs:</span> 
                                    {criteria.programs.map((p: any) => 
                                        <div key={p.program_id}>* {p.name}</div>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        )}
                        {criteria.intakeSeasons && criteria.intakeSeasons.length > 0 && (
                            <AccordionDetails sx={accordionStyle.details}>
                                <Typography variant="body2" component="div" sx={accordionStyle.content}>
                                    <span className="font-semibold">Intake Seasons:</span> {criteria.intakeSeasons.join(", ")}
                                </Typography>
                            </AccordionDetails>
                        )}
                        {criteria.intakeYear && criteria.intakeYear.length > 0 && (
                            <AccordionDetails sx={accordionStyle.details}>
                                <Typography variant="body2" component="div" sx={accordionStyle.content}>
                                    <span className="font-semibold">Intake Years:</span> {criteria.intakeYear.join(", ")}
                                </Typography>
                            </AccordionDetails>
                        )}

                    </div>
                ) : (
                    <AccordionDetails sx={accordionStyle.details}>
                        <Typography variant="body2" sx={accordionStyle.content}>
                            No criteria selected
                        </Typography>
                    </AccordionDetails>
                )}
            </Accordion>
        </div>
    );
};

export default CriteriaAccordion;

const accordionStyle = {
    accordion: {
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px !important', 
        border: '1px solid #9ca3af',
        backgroundColor: '#fffff',
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        // height: '41px',
        // maxHeight: '40px !important', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:before': {
            display: 'none', 
            // borderRadius: '18px 18px 18px 18px', // 
        },
        '&.Mui-expanded': {
            borderRadius: '12px !important',
            // minHeight: 'unset !important', // Allow height to adjust dynamically when expanded
            zIndex: 1000,
        },
    },
    summary: {
        borderRadius: '100px', 
        '&.Mui-expanded': {
            borderRadius: '12px', 
            minHeight: 'unset !important'
        },
    },
    details: {
        padding: '16px',
        borderTop: '1px solid #d1d3d8', 
        borderRadius: '12px', 
        backgroundColor: '#f7f7f7',
        border: '1px solid #9ca3af',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        marginRight: '12px',
        marginLeft: '12px',
        '&:last-child': {
            marginBottom: '12px',
        }
    },
    title: {
        fontWeight: '400',
        color: '#005795'
    },
    content: {
        color: '#6B7280', 
    },
};