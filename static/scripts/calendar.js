document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.querySelector('.calendar-container');
    const calendarGrid = calendarContainer.querySelector('.calendar-grid');
    const calendarCurrentDate = calendarContainer.querySelector('.calendar-current-date');
    const calendarPrev = calendarContainer.querySelector('.calendar-prev');
    const calendarNext = calendarContainer.querySelector('.calendar-next');

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        calendarCurrentDate.textContent = `${year} 年 ${month + 1} 月`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();

        const calendarDays = calendarGrid.querySelectorAll('.calendar-grid-day');

        calendarDays.forEach((day, index) => {
            day.innerHTML = '';
            day.classList.remove('has-event', 'is-today', 'is-empty');

            const dayOfMonth = index - firstDayOfWeek + 1;
            if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
                const dayNumber = document.createElement('div');
                dayNumber.classList.add('calendar-grid-day-number');
                dayNumber.textContent = dayOfMonth;
                day.appendChild(dayNumber);

                const events = getEvents(year, month + 1, dayOfMonth);
                if (events.length > 0) {
                    day.classList.add('has-event');
                    events.forEach(event => {
                        const eventElement = document.createElement('div');
                        eventElement.classList.add('calendar-event');
                        eventElement.textContent = event.name;
                        day.appendChild(eventElement);
                    });
                }

                if (isToday(year, month, dayOfMonth)) {
                    day.classList.add('is-today');
                }
            } else {
                day.classList.add('is-empty');
            }
        });
    }

    function getEvents(year, month, day) {
        return calendar.events.filter(event => 
            event.date.year === year &&
            event.date.month === month &&
            event.date.day === day
        );
    }

    function hasEvent(year, month, day) {
        return calendar.events.some(event => 
            event.date.year === year &&
            event.date.month === month &&
            event.date.day === day
        );
    }

    function isToday(year, month, day) {
        const today = new Date();
        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        );
    }

    calendarPrev.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    calendarNext.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});