export interface UserModel {
    _id: string
    name: string
    email: string
    password: string
    image: string
    facebookLink: string
    hoobies: string
    activeDay: string
}

export interface GroupModel {
    _id: string;
    title: string;
    description: string;
    owner: string;
    time: string;
    date: string;
    place: string;
    groupLink: string;
    members: string[];
    events: string[];
}