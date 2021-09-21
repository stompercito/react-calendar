import {monthNames, DaysList, setDate} from './calendarLogic/calendarData'
import { useState } from 'react';
import './App.css';

function App() {

  let currentDate = new Date();

  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());

  const [dateChoosen, setDateChoosen] = useState({});

  setDate(dateChoosen);

  const prevHandler = () => {
    setMonth(state => {
      if(state !== 0){
        return state - 1;
      }else{
        setYear(year - 1);
        return 11;
      }
    });
  }

  const nextHandler = () => {
    setMonth(state => {
      if(state !== 11){
        return state + 1;
      }else if (state === 11){
        setYear(year + 1);
        return 0;
      }
    });
  }

  const selectDataHandler = (event) => {
    let dateObj = JSON.parse(event.target.title);
    console.log(dateObj);

    setDateChoosen(dateObj);
  }

  return (
    <>
      <h1 className="title">Calendario Interactivo</h1>

      <div className="calendar">
        <div className="calendar__info">
            <div className="calendar__prev" id="prev-month" onClick={prevHandler}>&#9664;</div>
            <div className="calendar__month" id="month">{monthNames[month]}</div>
            <div className="calendar__year" id="year">{year.toString()}</div>
            <div className="calendar__next" id="next-month" onClick={nextHandler}>&#9654;</div>
        </div>

        <div className="calendar__week">
            <div className="calendar__day calendar__item">Mon</div>
            <div className="calendar__day calendar__item">Tue</div>
            <div className="calendar__day calendar__item">Wed</div>
            <div className="calendar__day calendar__item">Thu</div>
            <div className="calendar__day calendar__item">Fri</div>
            <div className="calendar__day calendar__item">Sat</div>
            <div className="calendar__day calendar__item">Sun</div>
        </div>

        <div className="calendar__dates" id="dates" onClick={selectDataHandler}>
        <DaysList month={month} year={year}/>
        </div>
      </div>
    </>
  );
}

export default App;
