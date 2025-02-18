interface PageHeaderProps {
    title: string;
    filter?: React.ReactElement | null;
}

export default function UserPageHeader({ title, filter = null }: PageHeaderProps) {
    return (
        <div className="m-4">
            <header className="flex items-center justify-start border-b-2 border-saitBlack pb-6">
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
