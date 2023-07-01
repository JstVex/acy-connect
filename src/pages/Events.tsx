// import { FC, useEffect, useState } from 'react'
// import { EventModel, UserModel } from '../types/models';
// import ParticipatedEvent from '../components/events/ParticipatedEvent';
// import AllOtherEvents from '../components/events/AllOtherEvents';

// interface EventsProps {
//     props?: string
// }

// const Events: FC<EventsProps> = () => {
//     const [participatedEvents, setParticipatedEvents] = useState<EventModel[]>([]);
//     const [allOtherEvents, setAllOtherEvents] = useState<EventModel[]>([]);
//     const [user, setUser] = useState<UserModel | null>(null);

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem('token')
//                 const response = await fetch('http://localhost:4080/users/me', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (response.ok) {
//                     const data = await response.json();
//                     setUser(data)
//                     setParticipatedEvents(data.events)
//                 }

//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         }

//         const fetchEventsFromAllGroups = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4080/events/user/${user?._id}`);

//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log('all other events', data)
//                     setAllOtherEvents(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching events:', error);
//             }
//         }

//         fetchUser();
//         fetchEventsFromAllGroups();
//     }, [user?._id])

//     if (user === null) {
//         return (
//             <div>
//                 Loading...
//             </div>
//         )
//     }

//     return (
//         <div className='w-full max-h-screen overflow-y-auto p-3'>
//             <h3 className='font-semibold text-lg'>
//                 Participated Events
//             </h3>
//             <ul>
//                 {participatedEvents.map((event) => {
//                     return <ParticipatedEvent key={event._id} event={event} user={user} />
//                 })}
//             </ul>
//             <h3 className='font-semibold text-lg'>
//                 Events happening in groups you have joined
//             </h3>
//             <ul>
//                 {allOtherEvents.map((event) => {
//                     return <AllOtherEvents key={event._id} event={event} user={user} />
//                 })}
//             </ul>
//         </div>
//     )
// }

// export default Events