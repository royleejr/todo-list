import React from 'react';
import EventRow from '../../components/eventrow/eventrow';

import './dashboard.scss';


export default class Dashboard extends React.Component {

  state = {
    filteredEvents: this.props.events
  };

  //to make sure the filtered events are up to date with state in app.
  componentDidUpdate (prevState) {
    if (this.props.events !== prevState.events) {
      this.setState({
        filteredEvents: this.props.events
      })
    }
  }

  getToday = () => {
    const today = new Date()
    const todayArray = []
    this.props.events.map(item => {
      const startDay = new Date(item.start)
      const endDay = new Date(item.end)

      if (today >= startDay && today <= endDay) {
        todayArray.push(item)
      }
      return todayArray
    })
    return this.props.getToDoList(todayArray)
  }

  search = (event) => {

  const filteredEvents = this.props.events.filter(item => {
    return  item.title.toLowerCase().includes(event.target.value.toLowerCase())
  })

    if(event.target.value === "") {
      this.setState({
        filteredEvents: this.props.events
      })
    }
    else {
      this.setState({
        filteredEvents: filteredEvents
      })
    }
    
  }

  renderRows = (array) => {
    return array.map(item => {
      return <EventRow event={item} key={item.id}/>
    })
  } 

  
  render() {
    return (
      <section className="dashboard">
        <button className="dashboard__open-button" onClick={this.props.openModal}>+ Add Event</button>
        <section className="dashboard__section">
          <h1 className="dashboard__section-heading">Today's To-Do List</h1>
          <div className="dashboard__section-container">
            {
              this.getToday()
            }
          </div>
        </section>

        <section className="dashboard__section">
          <input className="dashboard__section-search" type="text" name="search" placeholder="Search event name" onChange={this.search}/>
          <h1 className="dashboard__section-heading">Events</h1>
          <div className="dashboard__section-table">
            <article className="event event--heading">
              <span className="event-field event--name">Event Name</span>
              <span className="event-field event--date">Start Date</span>
              <span className="event-field event--time">Start Time</span>
              <span className="event-field event--date">End Date</span>
              <span className="event-field event--time">End Time</span>
              <span className="event-field event--status">Status</span>
            </article>
            {
              this.state.filteredEvents ? 
              //sorting the filtered data by earliest start time first.
              this.state.filteredEvents.sort((a, b) => {
                return new Date(a.start) - new Date(b.start)
              }).map(item => {
                return <EventRow event={item} key={item.id}/>
              })
              : null
            }
          </div>
        </section>
      </section>
    )
  }
}