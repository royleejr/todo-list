import React from 'react';

import './dashboard.scss';


import EditModal from '../../components/editmodal/editmodal';
import EventRow from '../../components/eventrow/eventrow';

export default class Dashboard extends React.Component {

  // state = {
  //     modalIsOpen: false
  //   };

  

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  
  getToday = () => {
    const today = new Date()
    

    const todayArray = []
    this.props.events.map(item => {
      const startDay = new Date(item.start)
      const endDay = new Date(item.end)

      if (today >= startDay && today <= endDay) {
        todayArray.push(item)
      }
    })

    return this.props.getToDoList(todayArray)
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
            {/* <ToDoCard />
            <ToDoCard />
            <ToDoCard />
            <ToDoCard /> */}
          </div>
        </section>

        <section className="dashboard__section">
          <h1 className="dashboard__section-heading">Events</h1>
          <div className="dashboard__section-table">
            <article className="event event--heading">
              <span className="event-field event--name">Project</span>
              <span className="event-field event--date">Date</span>
              <span className="event-field event--time">Start Time</span>
              <span className="event-field event--time">End Time</span>
              <span className="event-field event--status">Status</span>
            </article>
            {
              this.props.events.map(item => {
                return <EventRow event={item} key={item.id}/>
              })
            }
            {/* <EventRow />
            <EventRow />
            <EventRow />
            <EventRow />
            <EventRow />
            <EventRow /> */}
          </div>
        </section>

        {/* {
          this.props.events.map(item => {
            return <p>{item.title}</p>
          })
        } */}
      </section>
    )
  }
}