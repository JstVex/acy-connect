import { FC } from 'react'
import { Link } from 'react-router-dom';

interface InfoTabsProps {
    tabRoutes: { path: string; label: string }[];
}

const InfoTabs: FC<InfoTabsProps> = ({ tabRoutes }) => {
    return (
        <nav>
            <ul className="flex gap-x-4">
                {tabRoutes.map((tab) => (
                    <li key={tab.path}>
                        <Link to={tab.path}>
                            {tab.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default InfoTabs