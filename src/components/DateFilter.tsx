import { FC } from 'react'

enum EventFilter {
    ALL = 'All',
    TODAY = 'Today',
    TOMORROW = 'Tomorrow',
    WITHIN_A_WEEK = 'Within a week',
}

interface DateFilterProps {
    selectedDateFilter: EventFilter;
    handleDateFilterChange: (filter: EventFilter) => void;
}

const DateFilter: FC<DateFilterProps> = ({ selectedDateFilter, handleDateFilterChange }) => {
    return (
        <div className='flex items-center my-2'>
            <span className='hidden sm:block mr-3 text-gray-700'>
                Filter by:
            </span>
            <select
                className='text-sm sm:text-md border border-gray-300 rounded px-2 py-1 focus:outline-none mr-4 w-24 sm:w-auto'
                value={selectedDateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value as EventFilter)}
            >
                <option value={EventFilter.ALL}>All</option>
                <option value={EventFilter.TODAY}>Today</option>
                <option value={EventFilter.TOMORROW}>Tomorrow</option>
                <option value={EventFilter.WITHIN_A_WEEK}>Within a week</option>
            </select>
        </div>
    )
}

export default DateFilter