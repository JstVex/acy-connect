import { FC } from 'react'
import clsx from 'clsx';

interface TabsProps {
    activeTab: string;
    setActiveTab: any;
    firstTitle: string;
    secondTitle: string;
    children: React.ReactNode;
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab, firstTitle, secondTitle, children }) => {

    const handleFirstTabClick = () => {
        setActiveTab(firstTitle);
    };

    const handleSecondTabClick = () => {
        setActiveTab(secondTitle);
    };

    return (
        <div className="flex flex-col mt-2">
            <div className="flex-shrink-0 flex">
                <div className={clsx('font-semibold text-lg border-b border-b-gray-300 h-10 flex-1 flex items-center justify-center select-none hover:text-amber-700', activeTab === firstTitle ? 'text-amber-700  border-b-amber-500 border-b-[1.5px]' : 'text-gray-800')} onClick={handleFirstTabClick}>
                    {firstTitle}
                </div>
                <div className={clsx('h-10 font-semibold border-b border-b-gray-300 flex-1 flex items-center justify-center text-lg select-none hover:text-amber-700', activeTab === secondTitle ? 'text-amber-700 border-b-amber-500 border-b-[1.5px]' : 'text-gray-800')} onClick={handleSecondTabClick}>
                    {secondTitle}
                </div>
            </div>

            <ul className="pt-1">
                {children}
            </ul>
        </div>
    )
}

export default Tabs