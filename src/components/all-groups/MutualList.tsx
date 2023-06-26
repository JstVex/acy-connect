import { FC } from 'react'
import { UserModel } from '../../types/models'
import { Link } from 'react-router-dom'

interface MutualListProps {
    member: UserModel
}

const MutualList: FC<MutualListProps> = ({ member }) => {
    return (
        <li>
            <Link to={`/connections/${member._id}`}>
                {member.name}
            </Link>
        </li>
    )
}

export default MutualList