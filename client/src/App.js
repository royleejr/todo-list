import React from 'react';
import uniqid from 'uniqid';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './components/nav/nav';
import Dashboard from './pages/dashboard/dashboard';
import Calendar from './pages/calendar/calendar';


import './App.css';
import { compensateScroll } from '@fullcalendar/core';

class App extends React.Component {

  dragRef = React.createRef()
  containerRef = React.createRef()

  state = {
    events: [
    { title: 'Roys event', start:'2020-01-07T10:30:00', end:"2020-01-10T11:30:00", editable: true, personal: true, id: uniqid()},
    { title: 'The third list', start: '2020-01-14T03:00:00', end:"2020-01-11T11:30:00", personal: true, id: uniqid()},
    // { title: 'The fourth list', start: '2020-01-03T12:00:00', end:"2020-01-06T24:00:00", personal: true, id: uniqid()},
    { title: 'The fifth list', start: '2020-01-25T08:00:00', end:"2020-01-10T24:00:00", personal: true, id: uniqid()},
    { title: 'The sixth list', start: '2020-01-31T23:00:00', end:"2020-02-07T11:30:00", personal: true, id: uniqid()}
    ]
  }
  

  editEvent = () => {
    alert("It worked")
  }

  addEvent = (event) => {
    // console.log('this is the event', event)'
    const newArray = Array.from(event);
    // let newerState = []
    
    var newState = this.state.events;
    // console.log('THIS IS THE NEW ARRAY', event)

    const uidMap = {}
    let finalArray = []
    const newerArray = []
    
    console.log('this is the final array', finalArray)
    newArray.map(item => {
      if (uidMap[item.fcSeg.eventRange.def.publicId]) {
        uidMap[item.fcSeg.eventRange.def.publicId].push(item)
      }
      else {
        uidMap[item.fcSeg.eventRange.def.publicId] = []
        uidMap[item.fcSeg.eventRange.def.publicId].push(item)
      }
    })
    console.log('this is the UID MAP', uidMap)
    const correctArray = Object.values(uidMap)
    console.log(Object.keys(uidMap))
    Object.keys(uidMap).map(item => {
      if (item === "") {
        uidMap[""].map(object => {
          finalArray.push({title: object.fcSeg.eventRange.def.title, start: object.fcSeg.eventRange.range.start, end: object.fcSeg.eventRange.range.end, id: 'none' })
        })
      }
      else if (uidMap[item].length === 2) {
        finalArray.push({title: `${uidMap[item][0].fcSeg.eventRange.def.title}`, start: uidMap[item][0].fcSeg.eventRange.range.start, end: uidMap[item][1].fcSeg.eventRange.range.end, id: uidMap[item][0].fcSeg.eventRange.def.publicId})
      }
      else {
        finalArray.push({title: `${uidMap[item][0].fcSeg.eventRange.def.title}`, start: uidMap[item][0].fcSeg.eventRange.range.start, end: uidMap[item][0].fcSeg.eventRange.range.end, id: uidMap[item][0].fcSeg.eventRange.def.publicId})
      }
    })

    // correctArray.map(item => {
    //   if (item.length == 2) {
    //     if (item[0].fcSeg.eventRange.def.publicId) {
    //       finalArray.push({title: item[0].fcSeg.eventRange.def.title, start: item[0].fcSeg.eventRange.range.start, end: item[1].fcSeg.eventRange.range.end, id: item[0].fcSeg.eventRange.def.publicId })
    //     }
    //     else {
    //       finalArray.push({title: item[0].fcSeg.eventRange.def.title, start: item[0].fcSeg.eventRange.range.start, end: item[1].fcSeg.eventRange.range.end, id: 'none' })
    //     }
    //   }
    //   else {
    //     if (item[0].fcSeg.eventRange.def.publicId) {
    //       finalArray.push({title: `${item[0].fcSeg.eventRange.def.title}`, start: item[0].fcSeg.eventRange.range.start, end: item[0].fcSeg.eventRange.range.end, id: item[0].fcSeg.eventRange.def.publicId})
    //     }
    //     else {
    //       finalArray.push({title: `${item[0].fcSeg.eventRange.def.title}`, start: item[0].fcSeg.eventRange.range.start, end: item[0].fcSeg.eventRange.range.end, id: 'none'})
    //     }
    //   }
    // })

    console.log('this is the final array', finalArray)

    // finalArray.map(item => {
    //   if (item.id === 'none') {
    //     finalArray.push({title: `${item.title}`, start: `${this.getDate(startDate)}`, end:item.fcSeg.eventRange.range.end, id: uniqid() })
    //   }
    //   const indexOfItem = newState.findIndex((element) => {
    //     return element.id === item.id
    //   })
    // })

    // console.log('THIS IS THE UID OBJECT', newerArray)

    // newArray.map(object => {
    //   const filteredArray = newArray.filter(node => {
    //     return node.fcSeg.eventRange.def.publicId  === object.fcSeg.eventRange.def.publicId
    //   })

    //   const correctArray = newArray.filter(node => {
    //     return node.fcSeg.eventRange.def.publicId  !== object.fcSeg.eventRange.def.publicId
    //   })
    //   if (filteredArray.length === 2) {
    //     const filteredStart = filteredArray[0].fcSeg.eventRange.range.start;
    //     const filteredEnd = filteredArray[1].fcSeg.eventRange.range.end;
    //     newer.push({title: filteredArray[0].fcSeg.eventRange.def.title, start: filteredStart, end: filteredEnd, id: filteredArray[0].fcSeg.eventRange.def.publicId});
    //   }
    //   else {
    //     return newArray
    //   }
    // })
    
    //need to check id's to see if they are the same, if date !== item.fcSeg.eventRange.range.end, then we change it.
    
    finalArray.map( (item, index) => {

      if (item.fcSeg) {
        const date = new Date(item.fcSeg.eventRange.range.start)

        const indexOfItem = newState.findIndex((element) => {
          return element.id === item.fcSeg.eventRange.def.publicId
        })
        
        if (!item.fcSeg.eventRange.def.publicId ) {
          newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date)}`, end:item.fcSeg.eventRange.range.end, id: uniqid() })
        }
        else {
          // const newerState = newState.filter(obj => {
          //   return obj.id === item.fcSeg.eventRange.def.publicId
          // })
          // console.log(newerState)
          const oldTime = newState[indexOfItem].start;
          newState.splice(indexOfItem, 1);
          newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date, newState[indexOfItem].start)}`, end:item.fcSeg.eventRange.range.end, id: uniqid()});
        }
      }
      else {
        const startDate = new Date(item.start);
        // const endDate = new Date(item.end);
        console.log('THIS IS THE ITEM COMING IN', item)
        if (item.id === 'none') {
          newState.push({title: `${item.title}`, start: `${this.getDate(startDate)}`, end: `${this.getEndDate(item.end)}`, id: uniqid() })
        }
        else {
          // console.log('THIS IS THE INDEX WERE ON', index)
          const indexOfItem = newState.findIndex((element) => {
            // console.log('ELEMENT ID', element.id)
            // console.log('ITEM IDDD', item.id)
            return element.id === item.id
          })
          // console.log('THIS IS THE INDEZX', indexOfItem)
          const oldStartTime = newState[indexOfItem].start;
          const oldEndTime = newState[indexOfItem].end;
          // console.log('this is the End date', item.end)
          newState.splice(indexOfItem, 1);
          newState.push({title: `${item.title}`, start: `${this.getDate(startDate, oldStartTime)}`, end: `${this.getEndDate(item.end, oldEndTime)}`, id: item.id});
          console.log('tHis is the new state at the end', newState)
        }
      }


      //changing the start date to be pushed back 5 hours behind because the start day given was always 5 hours ahead.
      // const date = new Date(item.fcSeg.eventRange.range.start)
      // const unix = date.getTime() + 18000000
      // // console.log('end time', item.fcSeg.eventRange.range.end)
      // //filter out items with same id.
      
      // // k55z85sb
      // // const filteredState = newState.filter(obj => {
      //   //   console.log(item.fcSeg.eventRange.def.publicId)
      //   //   return obj.id !== item.fcSeg.eventRange.def.publicId
      //   // })
      //   // console.log(filteredState)

      
      
      //   //find index of item that matches id.
        
      //   //check to see if this todo event is not already in state.

      // const indexOfItem = newState.findIndex((element) => {
      //   return element.id === item.fcSeg.eventRange.def.publicId
      // })
      // console.log('THIS SIS THE INDEX', indexOfItem)
      // // const index = newState.findIndex((element) => {
      // //   return element.id === item.fcSeg.eventRange.def.publicId
      // // })

      // //!item.fcSeg.eventRange.def.publicId
      // if (!item.fcSeg.eventRange.def.publicId ) {
      //   newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date)}`, end:item.fcSeg.eventRange.range.end, id: uniqid() })
      // }
      // else {
      //   // const newerState = newState.filter(obj => {
      //   //   return obj.id === item.fcSeg.eventRange.def.publicId
      //   // })
      //   // console.log(newerState)
      //   const oldTime = newState[indexOfItem].start;
      //   newState.splice(indexOfItem, 1);
      //   newState.push({title: `${item.fcSeg.eventRange.def.title}`, start: `${this.getDate(date, newState[indexOfItem].start)}`, end:item.fcSeg.eventRange.range.end, id: uniqid()});
      // }




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
    console.log('this is THE NEWER STATE', newState)
    this.setState({
      events: newState
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

    console.log('THIS IT THE OLDDATE', oldDate)

    //if this item already existed and had a time, to keep the same time as it was before I needed to find a way
    //to keep the time without altering it because the new date I would always get from the start in the node was 7pm.
    if (oldDate) {
      const newTimeArray = oldDate.split('T');
      // console.log('this is the old date', oldDate)
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + newTimeArray[1];
      return fullDate
    }
    else {
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + "00:00:00";
      return fullDate
    }
  }

  getEndDate = (newDate, oldDate) => {
    const month = "0" + (newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    const day = "0" + newDate.getDate();

    if (oldDate) {
      const newTimeArray = oldDate.split('T');
      // console.log('this is the old date', oldDate)
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + newTimeArray[1];
      return fullDate
    }
    else {
      const fullDate = `${year}` + "-" + month.substr(-2) + "-" + day.substr(-2) + "T" + "24:00:00";
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
