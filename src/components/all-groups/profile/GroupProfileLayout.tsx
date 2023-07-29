import { FC } from 'react';
import InfoTabs from './InfoTabs';

interface GroupProfileLayoutProps {
    title: string;
    description: string;
    tabRoutes: { path: string; label: string }[];
    children: React.ReactNode
}

const GroupProfileLayout: FC<GroupProfileLayoutProps> = ({ title, description, children, tabRoutes }) => {
    return (
        <div className="w-full max-h-screen overflow-y-auto p-3">
            <div className="flex items-center mb-4">
                <h3 className="text-4xl capitalize font-semibold">
                    {title}
                </h3>

                {/* <Link to={`/ connections / ${ group.owner._id }`} className="ml-auto text-lg text-amber-600">
                        Owned by: <span className="capitalize">{group.owner.name}</span>
                    </Link> */}
                {/* {isMember ? (
                    <div className='ml-auto bg-amber-800 text-white rounded-3xl px-3 py-2 text-xs sm:text-sm' onClick={handleGroupLeave}>
                        Leave group
                    </div>
                ) : (
                    <button className="ml-auto bg-amber-800 text-white rounded-3xl px-3 py-2 text-xs sm:text-sm" onClick={handleJoinGroup}>
                        Join group
                    </button>
                )} */}

            </div>
            <p className="text-xl font-light my-3">
                {description}
            </p>
            <InfoTabs tabRoutes={tabRoutes} />
            {children}
        </div>
    );
};

export default GroupProfileLayout;
