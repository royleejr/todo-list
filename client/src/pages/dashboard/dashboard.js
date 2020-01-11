import React from 'react';
import Modal from 'react-modal';
import './dashboard.scss';


import EditModal from '../../components/editmodal/editmodal';
import EventRow from '../../components/eventrow/eventrow';
import ToDoCard from '../../components/todocard/todocard';

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

export default class Dashboard extends React.Component {

  state = {
      modalIsOpen: false
    };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  closeModal = () => {
    this.setState({modalIsOpen: false});
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
    })

    //getting todays day and the long version of the month to pass down as props to properly display in todocard.
    const todayDay = today.getDate()
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    const todaysDate = today.toLocaleDateString("en-US", options)
    const todayMonth = todaysDate.split(' ')[1]

    return todayArray.map(item => {
      return <ToDoCard event={item} key={item.id} day={todayDay} month={todayMonth}/>
    })
  }
  
  render() {
    return (
      <section className="dashboard">
        <button className="dashboard__open-button" onClick={this.openModal}>+ Add Event</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditModal closeModal={this.closeModal} addNewEvent={(props) => this.props.addNewEvent(props)}/>
        </Modal>

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