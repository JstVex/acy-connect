import { useCallback, useEffect, useState } from 'react'
import { EventModel, UserModel } from '../types/models';
import ParticipatedEvent from '../components/events/ParticipatedEvent';
import AllOtherEvents from '../components/events/AllOtherEvents';
import Tabs from '../components/Tabs';
import SearchBar from '../components/all-groups/SearchBar';
import { addDays, isAfter, isBefore, isToday, isTomorrow, parseISO } from 'date-fns';
import DateFilter from '../components/DateFilter';
import MajorEvents from '../components/events/MajorEvents';

enum EventFilter {
    ALL = 'All',
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    WITHIN_A_WEEK = 'Within a week',
}

const Events = () => {
    const [participatedEvents, setParticipatedEvents] = useState<EventModel[]>([]);
    const [allOtherEvents, setAllOtherEvents] = useState<EventModel[]>([]);
    const [user, setUser] = useState<UserModel | null>(null);

    const [filteredParticipatedEvents, setFilteredParticipatedEvents] = useState<EventModel[]>(participatedEvents);
    const [filteredAllOtherEvents, setFilteredAllOtherEvents] = useState<EventModel[]>(allOtherEvents);
    const [searchValue, setSearchValue] = useState('');

    const [selectedDateFilter, setSelectedDateFilter] = useState<EventFilter>(EventFilter.ALL);

    const [totalFilterForParticipatedEvents, setTotalFilterForParticipatedEvents] = useState<EventModel[]>(filteredParticipatedEvents);
    const [totalFilterForAllOtherEvents, setTotalFilterForAllOtherEvents] = useState<EventModel[]>(filteredAllOtherEvents);

    const [activeTab, setActiveTab] = useState("Participated Events");

    const filterEventsByDate = (events: EventModel[], filter: EventFilter): EventModel[] => {
        const today = new Date();
        const withinAWeek = addDays(today, 7);

        switch (filter) {
            case EventFilter.ALL:
                return events;
            case EventFilter.TODAY:
                return events.filter((event) => isToday(parseISO(event.date)));
            case EventFilter.TOMORROW:
                return events.filter((event) => isTomorrow(parseISO(event.date)));
            case EventFilter.WITHIN_A_WEEK:
                return events.filter((event) => {
                    const eventDate = parseISO(event.date);
                    return isToday(eventDate) || (isAfter(eventDate, today) && isBefore(eventDate, withinAWeek));
                });
            default:
                return events;
        }
    };

    const handleDateFilterChange = useCallback((selectedFilter: EventFilter) => {
        setSelectedDateFilter(selectedFilter);

        // Apply the selected date filter on the already filtered events
        const filteredParticipated = filterEventsByDate(participatedEvents, selectedFilter);
        setFilteredParticipatedEvents(filteredParticipated);

        const filteredAllOther = filterEventsByDate(allOtherEvents, selectedFilter);
        setFilteredAllOtherEvents(filteredAllOther);
    }, [participatedEvents, allOtherEvents]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data)
                    setParticipatedEvents(data.events);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        const fetchEventsFromAllGroups = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/user/${user?._id}`);

                if (response.ok) {
                    const data = await response.json();
                    setAllOtherEvents(data);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }

        fetchUser();
        fetchEventsFromAllGroups();

    }, [user?._id, selectedDateFilter])

    if (user === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className='w-full max-h-screen overflow-y-auto p-3'>
            {/* <MajorEvents /> */}
            <div className='flex gap-x-2 sm:gap-x-5 items-center'>
                <SearchBar setFiltered={setTotalFilterForParticipatedEvents} filterField={filteredParticipatedEvents} setFiltered2={setTotalFilterForAllOtherEvents} filterField2={filteredAllOtherEvents} setSearchValue={setSearchValue} filterBy={'event title'} placeholder={'Search Events'} />
                <DateFilter selectedDateFilter={selectedDateFilter} handleDateFilterChange={handleDateFilterChange} />
            </div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} firstTitle='Participated Events' secondTitle='Other events' >
                {activeTab === "Participated Events" ? (
                    <>
                        {searchValue.trim() !== '' && totalFilterForParticipatedEvents.length === 0 && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event with the title you are searching for.
                            </p>
                        )}

                        {searchValue.trim() === '' && filteredParticipatedEvents.length === 0 && selectedDateFilter === 'Today' && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event happening today.
                            </p>
                        )}
                        {searchValue.trim() === '' && filteredParticipatedEvents.length === 0 && selectedDateFilter === 'Tomorrow' && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event happening tomorrow.
                            </p>
                        )}
                        {searchValue.trim() === '' && filteredParticipatedEvents.length === 0 && selectedDateFilter === 'Within a week' && (
                            <p className='mt-3 my-10 font-light'>
                                There are no events happening within this week.
                            </p>
                        )}
                        {
                            participatedEvents.length === 0 && searchValue.trim() === '' && selectedDateFilter === 'All' && (
                                <div className='mt-3 my-10 font-light'>
                                    You haven't participated in any events yet.
                                </div>
                            )
                        }
                        <ul>
                            {(searchValue.trim() === '' ? filteredParticipatedEvents : totalFilterForParticipatedEvents).map(event => {
                                return <ParticipatedEvent key={event._id} event={event} user={user} />
                            })}
                        </ul>
                    </>
                ) : (
                    <>
                        {searchValue.trim() !== '' && totalFilterForAllOtherEvents.length === 0 && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event with the title you are searching for.
                            </p>
                        )}

                        {searchValue.trim() === '' && filteredAllOtherEvents.length === 0 && selectedDateFilter === 'Today' && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event happening today.
                            </p>
                        )}
                        {searchValue.trim() === '' && filteredAllOtherEvents.length === 0 && selectedDateFilter === 'Tomorrow' && (
                            <p className='mt-3 my-10 font-light'>
                                There is no event happening tomorrow.
                            </p>
                        )}
                        {searchValue.trim() === '' && filteredAllOtherEvents.length === 0 && selectedDateFilter === 'Within a week' && (
                            <p className='mt-3 my-10 font-light'>
                                There are no events happening within this week.
                            </p>
                        )}
                        {
                            allOtherEvents.length === 0 && searchValue.trim() === '' && selectedDateFilter === 'All' && (
                                <div className='mt-3 my-10 font-light'>
                                    There is no other events yet in groups you have joined.
                                </div>
                            )
                        }
                        <ul>
                            {(searchValue.trim() === '' ? filteredAllOtherEvents : totalFilterForAllOtherEvents).map(event => {
                                return <AllOtherEvents key={event._id} event={event} user={user} />
                            })}
                        </ul>
                    </>
                )}
            </Tabs>
        </div>
    )
}

export default Events