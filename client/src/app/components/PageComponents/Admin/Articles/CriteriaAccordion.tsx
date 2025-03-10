import React, { useState, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface CriteriaAccordionProps {
    criteria: any;
}

const CriteriaAccordion: React.FC<CriteriaAccordionProps> = ({ criteria }) => {
    
    const [expanded, setExpanded] = useState(false);
    const accordionRef = useRef<HTMLDivElement>(null);  // Reference to the accordion element
    const [criteriaLength, setCriteriaLength] = useState(0);

    const formatCriteria = (criteria: any) => {
        const parts = [];

        if (criteria.programs && criteria.programs.length > 0) {
            parts.push(`Programs: ${criteria.programs.join(", ")}`);
        }

        if (criteria.departments && criteria.departments.length > 0) {
            parts.push(`Departments: ${criteria.departments.join(", ")}`);
        }

        if (criteria.intakeSeasons && criteria.intakeSeasons.length > 0) {
            parts.push(`Intake Seasons: ${criteria.intakeSeasons.join(", ")}`);
        }

        if (criteria.intakeYear && criteria.intakeYear.length > 0) {
            parts.push(`Intake Years: ${criteria.intakeYear.join(", ")}`);
        }

        return parts.length > 0 ? parts.join("; ") : "No criteria selected";
    };

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

    // useEffect(() => {
    //     const totalPrograms = criteria.programs ? criteria.programs.length : 0;
    //     const totalDepartments = criteria.departments ? criteria.departments.length : 0;
    //     const totalIntakeSeasons = criteria.intakeSeasons ? criteria.intakeSeasons.length : 0;
    //     const totalIntakeYears = criteria.intakeYear ? criteria.intakeYear.length : 0;
        
    //     const totalLength = totalPrograms + totalDepartments + totalIntakeSeasons + totalIntakeYears;
    //     setCriteriaLength(totalLength);
    // }, [criteria]);

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
                        <p className="text-md">Selected Criteria 
                            {Object.keys(criteria).length > 0 ? <CheckRoundedIcon sx={{ marginLeft: 1.2 }}/> : ""}
                        </p>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordionStyle.details}>
                    <Typography variant="body2" sx={accordionStyle.content}>
                        {formatCriteria(criteria)}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CriteriaAccordion;

const accordionStyle = {
    accordion: {
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '18px !important', 
        border: '1px solid #9ca3af',
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        // maxHeight: '40px !important', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:before': {
            display: 'none', 
            // borderRadius: '18px 18px 18px 18px', // 
        },
        '&.Mui-expanded': {
            borderRadius: '18px !important',
            // minHeight: 'unset !important', // Allow height to adjust dynamically when expanded
            zIndex: 1000,
        },
    },
    summary: {
        borderRadius: '100px', 
        '&.Mui-expanded': {
            borderRadius: '18px', 
            minHeight: 'unset !important'
        },
    },
    details: {
        padding: '16px',
        borderTop: '1px solid #d1d3d8', 
        borderRadius: '18px', 
        backgroundColor: '#f7f7f7',
        border: '1px solid #9ca3af',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontWeight: '400',
        color: '#005795'
    },
    content: {
        color: '#6B7280', 
    },
};