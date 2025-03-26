interface PageHeaderProps {
    filter?: React.ReactElement | null;
}

export default function PageHeader({ filter = null }: PageHeaderProps) {
    return (
        <div className="m-4">
            <header className="flex flex-col items-center justify-between border-b-2 border-saitBlack pb-3 lg:flex-row md:space-y-3 xs:space-y-3">
                {/* <h1 className="text-2xl font-bold mr-16">{title}</h1> */}
                {filter && (
                    <div className="flex items-center p-2">
                        {filter}
                    </div>
                )}
            </header>
        </div>
    );
}
