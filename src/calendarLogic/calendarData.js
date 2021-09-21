export let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let choosenDate = {};

export function setDate(date) {
    choosenDate = date;
}

export function DaysList({month, year}) {

    const numbersOfMonth = monthDays(month, year);

    return(
        <>
            {
                numbersOfMonth.map((dayDiv) => {
                    return dayDiv
                })
            }
        </>
    )
}

const monthDays = (month, year) => {

    let dates = [];

    for(let i = startDay(month, year); i>0 ;i--){
        let num = getTotalDays(month-1, year)-(i-1);
        let date = {day: num, month: month - 1, year: year};
        dates.push(<div key={num + '-last-days'} className="calendar__date calendar__item calendar__last-days" title = {JSON.stringify(date)}>
            {num} </div>);
    }

    for(let i=1; i<=getTotalDays(month, year); i++){
        let date = {day: i, month: month, year: year};
        if(i===currentDay && month===currentMonth && year === currentYear) {
            dates.push(<div key={i + '-days'} className="calendar__date calendar__item calendar__today" title = {JSON.stringify(date)}>{i}</div>);
        } else if(i===choosenDate.day && month===choosenDate.month && year === choosenDate.year) {
            dates.push(<div key={i + '-days'} className="calendar__date calendar__item calendar__choosen" title = {JSON.stringify(date)}>{i}</div>);
        } else{
            dates.push(<div key={i + '-days'} className="calendar__date calendar__item" title = {JSON.stringify(date)}>{i}</div>);
        }
    }

    for(let i = 0 ; i<lastDay(month, year) ;i++){
        let num = (i+1);
        let date = {day: num, month: month + 1, year: year};
        dates.push(<div key={num + '-first-days'} className="calendar__date calendar__item calendar__last-days" title = {JSON.stringify(date)}>
            {num} </div>);
    }

    return dates;
}

const getTotalDays = (month, year) => {
    if(month === -1) month = 11;

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return  31;

    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;

    } else {

        return isLeap(year) ? 29:28;
    }
}

const isLeap = (year) => {
    return (((year % 100 !==0) && (year % 4 === 0)) || (year % 400 === 0));
}

const startDay = (month, year) => {
    let start = new Date(year, month, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

const lastDay = (month, year) => {
    let last = new Date(year, month, getTotalDays(month, year));
    return ((7 - last.getDay()) === 7) ? 0 : 7 - last.getDay();
}
