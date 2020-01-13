import React from 'react';
import Modal from 'react-modal';
import uniqid from 'uniqid';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './components/nav/nav';
import Dashboard from './pages/dashboard/dashboard';
import Calendar from './pages/calendar/calendar';
import Status from './pages/status/status';
import ToDoCard from './components/todocard/todocard';
import EditModal from './components/editmodal/editmodal';

import './App.css';

Modal.setAppElement('body')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends React.Component {

  dragRef = React.createRef()
  containerRef = React.createRef()

  state = {
    events: [
    { title: "Ski Trip", start:'2020-01-07T10:30:00', end:"2020-01-10T11:30:00", status: 'Complete', id: uniqid()},
    { title: 'Day at the spa', start:'2020-01-11T10:30:00', end:"2020-01-11T23:00:00", status: 'In progress', id: uniqid()},
    { title: 'Read the book Design Thinking', start:'2020-01-12T10:30:00', end:"2020-01-17T20:30:00", status: 'In progress', id: uniqid()},
    { title: 'Hackathon', start: '2020-01-15T12:00:00', end:"2020-01-22T24:00:00", status: 'Pending', id: uniqid()},
    { title: 'Clean my room', start: '2020-01-20T03:00:00', end:"2020-01-23T23:00:00", status: 'Pending', id: uniqid()},
    { title: 'Meet Johnathon', start: '2020-01-25T08:00:00', end:"2020-01-10T24:00:00", status: 'In progress', id: uniqid()},
    { title: 'Create my portfolio site', start: '2020-01-31T23:00:00', end:"2020-02-07T11:30:00", status: 'In progress', id: uniqid()}
    ],
    modalIsOpen: false,
    singularEvent: null
  }

  componentDidMount () {
    alert('Due to time constraints, the site was built for the exact screen dimensions of 1680 x 950. Please view the site at these dimensions.')
  }

  addNewEvent = (event, edit) => {

    event.preventDefault();

    //find which radio button was checked
    var checked;
    const newArray = Array.from(event.target.status);
    newArray.map(item => {
      if (item.checked) {
        checked = item.value
      }
      return checked
    })

    const title = event.target.title.value;
    const startDate = `${event.target.startDate.value}T${event.target.startTime.value}`
    const endDate = `${event.target.endDate.value}T${event.target.endTime.value}`

    if (edit.id) {
      const filteredState = this.state.events.filter(item => {
        return item.id !== edit.id
      })
      const newEvent = [{ title: `${title}`, start: startDate, end: endDate, status: `${checked}`, id: edit.id}]
      const newState =[...filteredState, ...newEvent]

      this.setState({
        events: newState
      })
    }

    else {
      const newEvent = [{ title: `${title}`, start: startDate, end: endDate, status: `${checked}`, id: uniqid()}]
      const newState = [...this.state.events, ...newEvent ]

      this.setState({
        events: newState
      })
    }


    this.closeModal()
  }


  addEvent = (event) => {

    const newArray = Array.from(event);
    var newState = this.state.events;
    const uidMap = {};
    let finalArray = [];
    
    //creating an object to store each item as a key and the item as a value in an array.
    //I do this because if an event in the calendar is longer than one line then it stores as more than 1 event.
    newArray.map(item => {
      if (uidMap[item.fcSeg.eventRange.def.publicId]) {
        uidMap[item.fcSeg.eventRange.def.publicId].push(item)
      }
      else {
        uidMap[item.fcSeg.eventRange.def.publicId] = []
        uidMap[item.fcSeg.eventRange.def.publicId].push(item)
      }
      return uidMap
    })

    Object.keys(uidMap).map(item => {
      if (item === "") {
        //this is for the events that we add straight from favourites that don't have an id yet.
        uidMap[""].map(object => {
          finalArray.push({title: object.fcSeg.eventRange.def.title, start: object.fcSeg.eventRange.range.start, end: object.fcSeg.eventRange.range.end, status: "Pending",  id: 'none' })
          return object
        })
      }
      else if (uidMap[item].length >= 2) {
        //For ones that have the same key, I know its the same event, so I take the start date of the first index
        //and the end date of the last index and combine them back into one event.
        finalArray.push({title: `${uidMap[item][0].fcSeg.eventRange.def.title}`, start: uidMap[item][0].fcSeg.eventRange.range.start, end: uidMap[item][uidMap[item].length - 1].fcSeg.eventRange.range.end, status: uidMap[item][0].fcSeg.eventRange.def.extendedProps.status, id: uidMap[item][0].fcSeg.eventRange.def.publicId})
      }
      else {
        finalArray.push({title: `${uidMap[item][0].fcSeg.eventRange.def.title}`, start: uidMap[item][0].fcSeg.eventRange.range.start, end: uidMap[item][0].fcSeg.eventRange.range.end, status: uidMap[item][0].fcSeg.eventRange.def.extendedProps.status, id: uidMap[item][0].fcSeg.eventRange.def.publicId})
      }
      return finalArray
    })

    finalArray.map( (item, index) => {
      const startDate = new Date(item.start);
      if (item.id === 'none') {
        newState.push({title: `${item.title}`, start: `${this.getDate(startDate)}`, end: `${this.getEndDate(item.end)}`, status: item.status, id: uniqid() })
      }
      else {
        const indexOfItem = newState.findIndex((element) => {
          return element.id === item.id
        })
        const oldStartTime = newState[indexOfItem].start;
        const oldEndTime = newState[indexOfItem].end;
        newState.splice(indexOfItem, 1);
        newState.push({title: `${item.title}`, start: `${this.getDate(startDate, oldStartTime)}`, end: `${this.getEndDate(item.end, oldEndTime)}`, status: item.status, id: item.id});
      }
      return item
    })

    this.setState({
      events: newState
    })
  }

  deleteEvent = (id, toggleMenu) => {
    const oldState = this.state.events;
    const newState = oldState.filter(item => {
      return item.id !== id 
    })

    this.setState({
      events: newState
    })

    if (toggleMenu) {
      toggleMenu()
    }
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
      const fullDate = `${year}-${month.substr(-2)}-${day.substr(-2)}T${newTimeArray[1]}`;
      return fullDate
    }
    else {
      const fullDate = `${year}-${month.substr(-2)}-${day.substr(-2)}T00:00:00`;
      return fullDate
    }
  }

  getEndDate = (newDate, oldDate) => {
    
    const month = "0" + (newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    const day = "0" + newDate.getDate();

    if (oldDate) {
      const newTimeArray = oldDate.split('T');
      const fullDate = `${year}-${month.substr(-2)}-${day.substr(-2)}T${newTimeArray[1]}`;
      return fullDate
    }
    else {
      const fullDate = `${year}-${month.substr(-2)}-${day.substr(-2)}T23:59:00`;
      return fullDate
    }
  }


  //put this function in app because I need the function in both status page and dashboard page.
  getToDoList = (array, status) => {

    if (status) {
      //for rendering ToDoCard in the status page. We want the date to be the end date of the event.
      return array.map(item => {
        const day = new Date(item.end)
        const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
        const todaysDate = day.toLocaleDateString("en-US", options)
        //getting todays day and the long version of the month to pass down as props to properly display in todocard.
        //get just the month name
        const todayMonth = todaysDate.split(' ')[1]
        //get the day without the comma
        const todayDay = todaysDate.split(' ')[2].split(',')[0]
        return <ToDoCard event={item} key={item.id} day={todayDay} month={todayMonth} deleteEvent={this.deleteEvent} openModal={this.openModal} closeModal={this.closeModal}/>
      })
    }
    else {
      //for rendering ToDoCard in the dashboard page. We want the date to be todays date.
      const day = new Date()
      const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
      const todaysDate = day.toLocaleDateString("en-US", options)
      return array.map(item => {
        //getting todays day and the long version of the month to pass down as props to properly display in todocard.
        //get just the month name
        const todayMonth = todaysDate.split(' ')[1]
        //get the day without the comma
        const todayDay = todaysDate.split(' ')[2].split(',')[0]
        return <ToDoCard event={item} key={item.id} day={todayDay} month={todayMonth} deleteEvent={this.deleteEvent} openModal={this.openModal} closeModal={this.closeModal}/>
      })
    }
  }
  
  openModal = (item, toggleMenu) => {
    this.setState({
      modalIsOpen: true,
      singularEvent: item
    });

    //to close edit/delete dropdown. Also added if statement because the AddEvent 
    //uses this function as well but doens't need the toggle function
    if (toggleMenu) {
      toggleMenu()
    }
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }



  render() {
    return (
      <div className="flex">
        <BrowserRouter>
          <Nav />
          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add/Edit Event"
          >
            <EditModal closeModal={this.closeModal} addNewEvent={(props) => this.addNewEvent(props, this.state.singularEvent)} singularEvent={this.state.singularEvent}/>
          </Modal>
          <Switch>
            <Route exact path="/" render={(props) => <Dashboard {...props} events={this.state.events} addNewEvent={this.addNewEvent} getToDoList={this.getToDoList} openModal={this.openModal}/>} />
            <Route exact path="/calendar" render={(props) => <Calendar {...props} events={this.state.events} addEvent={this.addEvent}/>} />
            <Route exact path="/status" render={(props) => <Status {...props} events={this.state.events} getToDoList={this.getToDoList}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
