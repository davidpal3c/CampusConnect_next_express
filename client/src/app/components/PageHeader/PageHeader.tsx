interface PageHeaderProps {
    title: string;
    filter?: React.ReactElement | null;
    subfilter?: React.ReactElement | null;
}

export default function UserPageHeader({ title, filter = null }: PageHeaderProps) {
    return (
        <div className="m-4">
            <header className="flex items-center justify-center border-b-2 border-saitBlack pb-2">
                <h1 className="text-2xl font-bold mr-16">{title}</h1>
                {filter && (
                    <div className="flex items-center p-2">
                        {filter}
                    </div>
                )}
            </header>
        </div>
    );
}
