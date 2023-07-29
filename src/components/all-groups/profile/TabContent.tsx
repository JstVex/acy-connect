import { FC } from 'react'
import GroupProfileLayout from './GroupProfileLayout';

interface TabContentProps {
    title: string;
    description: string;
    tabRoutes: { path: string; label: string }[];
    label: string;
}

const TabContent: FC<TabContentProps> = ({ title, description, tabRoutes, label }) => {
    return (
        // <GroupProfileLayout title={title} description={description} tabRoutes={tabRoutes}>
        //     {/* {(() => {
        //         switch (label) {
        //             case 'About':
        //                 return <div>
        //                     about
        //                 </div>;
        //             case 'Members':
        //                 return (
        //                     <h1 className=' text-xl'>
        //                         Members
        //                     </h1>
        //                 );
        //             // Add more cases for other tabs
        //             default:
        //                 return null;
        //         }
        //     })()} */}
        //     <div>
        //         Hi
        //     </div>
        // </GroupProfileLayout>
        <div>
            Hi
        </div>

    )

}

export default TabContent