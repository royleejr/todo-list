import React from 'react';
import Modal from 'react-modal';

import './calendar.scss'

import AddFavourite from '../../components/addfavourite/addfavourite';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css'

import PlusIcon from '../../assets/plus-icon.svg';

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

export default class Calendar extends React.Component {
  containerRef = React.createRef();
  calendarParentRef = React.createRef();
  calendarRef = React.createRef();

  state = {
    modalIsOpen: false,
    favourites: [
      {title: "Walk the dog"},
      {title: "Take out garbage"},
      {title: "Make lunch"},
      {title: "Clean the house"},
      {title: "Meet my friends"}
    ]
  }

  componentDidMount () {
    new Draggable(this.containerRef.current, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
    }
  
  componentWillUnmount () {
    //once going away from the calendar page, add all the favourite events that was dragged in
    //to the events state.
    const event = this.calendarParentRef.current.querySelectorAll('a')
    this.props.addEvent(event)
  }

  addFavourite = (event) => {
    event.preventDefault()

    const newEvent = [{title: event.target.favTitle.value}]
    const newFavourite = [...this.state.favourites, ...newEvent]

    this.setState({
      favourites: newFavourite
    })
    //close modal after submission
    this.closeModal()
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Favourite Event"
          >
          <AddFavourite closeModal={this.closeModal} addFavourite={this.addFavourite}/>
        </Modal>
        <div className="calendar">
          <div id='external-events' ref={this.containerRef}>
            <img className="calendar__external-plus" src={PlusIcon} alt="" onClick={this.openModal} />
            <p className="calendar__external-heading">Favourites</p>
            {
              this.state.favourites.map((item, index) => {
                return <div className='fc-event' key={item.title + index}>{item.title}</div>
              })
            }
          </div>
          <div id="calendar" ref={this.calendarParentRef}>
            <FullCalendar 
            ref={this.calendarRef}
            defaultView="dayGridMonth" 
            plugins={[ interactionPlugin, dayGridPlugin]} 
            droppable={true}
            header={{
              left:'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
              }}
            editable={true}
            events={
              this.props.events
            }
            />
          </div>
        </div>
      </>
    )
  }
}
