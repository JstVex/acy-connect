export interface UserModel {
    _id: string
    name: string
    email: string
    password?: string
    image?: string
    bio?: string
    facebookLink?: string
    hobbies?: string
    activeDay?: string
    groups?: GroupModel[]
    connections: any[]
}

export interface AuthUserModel {
    _id: string;
    name?: string;
    email: string;
}

export interface GroupModel {
    _id: string;
    title: string;
    description: string;
    owner: any;
    time: string;
    date: string;
    place: string;
    groupLink: string;
    members: UserModel[];
    events: string[];
}

export interface ConnectionModel {
    _id: string;
    user: string;
    connections: UserModel[];
}