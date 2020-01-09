import React from 'react';
import uniqid from 'uniqid';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './components/nav/nav';
import Dashboard from './pages/dashboard/dashboard';
import Calendar from './pages/calendar/calendar';


import './App.css';

class App extends React.Component {

  dragRef = React.createRef()
  containerRef = React.createRef()

  state = {
    events: [
    { title: 'Roys event', start:'2020-01-07T10:30:00', end:"2020-01-10T11:30:00", editable: true, personal: true, id: uniqid()},
    { title: 'The second list', start: '2020-01-14T00:00:00', personal: true, id: uniqid()}
    ]
  }
  

  editEvent = () => {
    alert("It worked")
  }

  addEvent = (event) => {
    // console.log('this is the event', event)'
    const newArray = Array.from(event);
    const newState = this.state.events;
    const newerState = []
    //need to check id's to see if they are the same, if date !== item.fcSeg.eventRange.range.end, then we change it.
    
    newArray.map( (item) => {
      //changing the start date to be pushed back 5 hours behind because the start day given was always 5 hours ahead.
      const date = new Date(item.fcSeg.eventRange.range.start)
      const unix = date.getTime() + 18000000
      console.log('thisis new state', unix)
      // console.log('end time', item.fcSeg.eventRange.range.end)
      //filter out items with same id.

      // k55z85sb
      // const filteredState = newState.filter(obj => {
      //   console.log(item.fcSeg.eventRange.def.publicId)
      //   return obj.id !== item.fcSeg.eventRange.def.publicId
      // })
      // console.log(filteredState)

      //find index of item that matches id.
      
      //check to see if this todo event is not already in state.
      const indexOfItem = newState.findIndex((element) => {
        return element.id === item.fcSeg.eventRange.def.publicId
      })
      console.log('INDEX OF ', indexOfItem)
      if (!item.fcSeg.eventRange.def.publicId) {
        newerState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date)}`, end:item.fcSeg.eventRange.range.end, id: uniqid() })
      }
      else {
        newerState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date, this.state.events[indexOfItem].start)}`, end:item.fcSeg.eventRange.range.end, id: uniqid()})
      }


      // if (!item.fcSeg.eventRange.def.extendedProps.personal) {
      //   newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: unix, personal: true, end: item.fcSeg.eventRange.range.end, id: uniqid()})
      // }
      // else {
      //   const indexOfItem = newState.findIndex((element) => {
      //     return element.id === item.fcSeg.eventRange.def.publicId
      //   })
      //   console.log('index of item', newState[indexOfItem].start)
      //   const newDate = new Date(newState[indexOfItem].start)
      //   const finalDate = this.getDate(newDate, JSON.stringify(newState[indexOfItem].start))
      //   if(newState[indexOfItem].start !== finalDate && newState[indexOfItem].start !== item.fcSeg.eventRange.range.end) {
      //     newState.splice(indexOfItem, 1) 
      //     console.log('thisis the final' , finalDate)
      //     newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: finalDate , personal: true, end:item.fcSeg.eventRange.range.end, id: uniqid()})
      //   }
      // }
    })
    console.log('this is THE NEWER STATE', newerState)
    this.setState({
      events: newerState
    })
  }

  getDate = (newDate, oldDate) => {
    //adding one day to the date given because the node start day bugs and gives it one day earlier.
    //instead of adding one day to the day of this daychanged the date back to unix because when adding 
    //a day on the last day of the month or the first day of the month, it wouldn't stick on the calendar.
    const time = newDate.getTime() + 86400000;
    const addedDay = new Date(time);
    const month = "0" + (addedDay.getMonth() + 1);
    const year = addedDay.getFullYear();
    const day = "0" + addedDay.getDate();

    //if this item already existed and had a time, to keep the same time as it was before I needed to find a way
    //to keep the time without altering it because the new date I would always get from the start in the node was 7pm.
    if (oldDate) {
      const newTimeArray = oldDate.split('T');
      console.log('this is the old date', oldDate)
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + newTimeArray[1];
      return fullDate
    }
    else {
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + "00:00:00";
      return fullDate
    }
  }

  // getDate = (newDate, oldDate) => {
  //   console.log('THIS IS OLD DATe', oldDate)
  //   const newYear = newDate.getFullYear()
  //   const newDay = newDate.getDate() + 1
  //   const newestDay = []
  //   if(newDay < 10) {
  //     newestDay.push(`0` + newDay)
  //   }
  //   else {
  //     newestDay.push(`${newDay}`)
  //   }
  //   const newMonth = "0" + (newDate.getMonth() + 1)
  //   if (oldDate) {
  //     const newTimeArray = oldDate.split('T');
  //     const newFullDate = `${newYear}` + "-" + newMonth + "-" + newestDay[0] + "T" + newTimeArray[1]
  //     // console.log(newFullDate)
  //     return newFullDate
  //   }
  //   else {
  //     const newFullDate = `${newYear}` + "-" + newMonth + "-" + newestDay[0] + "T" + "00:00:00"
  //     // console.log(newFullDate)
  //     return newFullDate
  //   }

  //   // console.log('oldarray', newTimeArray)
  // }


  render() {
    // console.log(this.state.events)
    return (
      <div className="flex">
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/" render={(props) => <Dashboard {...props} events={this.state.events}/>} />
            <Route exact path="/calendar" render={(props) => <Calendar {...props} events={this.state.events} addEvent={this.addEvent}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
