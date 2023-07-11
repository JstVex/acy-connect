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
    events?: EventModel[]
    notifications?: {
        _id: string;
        type: string;
        content: string;
        sender: string;
        recipient: string;
        group?: string;
        event?: string;
        status: 'unread' | 'read' | 'approved' | 'declined';
        createdAt: Date;
    }[]
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
    events: EventModel[];
}

export interface ConnectionModel {
    _id: string;
    user: string;
    connections: UserModel[];
}

export interface EventModel {
    _id: string;
    title: string;
    description?: string;
    date: string;
    time?: string;
    group: string;
    participants: UserModel[];
}