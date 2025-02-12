import Link from 'next/link';


import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <IconButton aria-label="delete" onClick={onClick}>
            <DeleteIcon className="text-saitDarkRed" />
        </IconButton>
    );
}

export function ViewButton ({href }: { href: string }) {
    return (
        <Link href={href} passHref>
            <IconButton aria-label="view">
                <VisibilityIcon className="text-saitLighterBlue"/>
            </IconButton>
        </Link>
    );
}