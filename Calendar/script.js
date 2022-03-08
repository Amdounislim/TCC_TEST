//Dark Mode Toggle
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('body').classList.toggle('light')
}

//Check leap year
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

//Get February Days
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let calendar = document.querySelector('.calendar')

const availabel_week_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


//Switching to month view
const month_picker = document.querySelector('#month-picker')
month_picker.onclick = () => {
    month_list.classList.add('show')
}



// Generate Calendar

generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days')
    calendar_days.innerHTML = ''

    let calendar_header_year = document.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    let currDate = new Date()

    month_picker.innerHTML = month_names[month]
    calendar_header_year.innerHTML = year

    let first_day = new Date(month, year, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        day.setAttribute('id', Math.floor(Math.random() * 1000))

        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.innerHTML = i - first_day.getDay() + 1
            let d = new Date(month, year, day.innerText)
            day.innerHTML += `<span></span>
                                <span></span>
                                <span></span>
                                <span></span>`
            day.onclick = (e) => {

                document.querySelector('#day-select-num').innerHTML = day.innerText
                document.querySelector('#day-select').innerText = availabel_week_days[d.getDay()]
                let timetamp = availabel_week_days[d.getDay()].toUpperCase() + e.target.innerText
                let listEvents = document.querySelector(".events__list")
                listEvents.innerHTML = ""
                if (eventsObj[timetamp]) {
                    eventsObj[timetamp] = eventsObj[timetamp]
                    for (const el of eventsObj[timetamp]) {
                        let li = document.createElement('li')
                        li.innerHTML = el
                        listEvents.appendChild(li)
                    }

                } else {
                    eventsObj[timetamp] = []
                }

            }

            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                document.querySelector('#day-select-num').innerHTML = day.innerText
                document.querySelector('#day-select').innerText = availabel_week_days[d.getDay()]
                day.classList.add('curr-date')
            }
        }

        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(curr_month.value, curr_year.value)
    }
    month_list.appendChild(month)
})

//Previous year
document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}
//Next year
document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}


let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)


//Array of events

var eventsObj = {}
let numberDay_curr = document.querySelector('#day-select-num').innerText
let day_curr = document.querySelector('#day-select').innerText
eventsObj[day_curr + numberDay_curr] = []


// Add Event

document.querySelector(".add-event-day-button").addEventListener("click", (e) => {
    let numberDay = document.querySelector('#day-select-num').innerText
    let day = document.querySelector('#day-select').innerText
    let userEvent = document.querySelector(".add-event-day-field").value
    if (eventsObj[day + numberDay]) {
        eventsObj[day + numberDay].push(userEvent)
    }
    let li = document.createElement('li')
    li.innerHTML = userEvent
    document.querySelector(".events__list").appendChild(li)
    document.querySelector(".add-event-day-field").value = ""

})


