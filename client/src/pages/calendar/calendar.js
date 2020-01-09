import React from 'react';

import './calendar.scss'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import calendarPlugins from '@fullcalendar/calendarplugins';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css'

export default class Calendar extends React.Component {
  containerRef = React.createRef();
  calendarParentRef = React.createRef();
  calendarRef = React.createRef();

  componentDidMount () {
    // console.log(this.dragRef.current)
    // console.log(this.calendarRef)

    new Draggable(this.containerRef.current, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });
    // const event = this.calendarRef.querySelector('a')
    console.log(this.calendarRef.current)
    }
  
  componentWillUnmount () {
    
    // console.log(this.calendarRef.current.calendar.state.eventStore.defs)
    const event = this.calendarParentRef.current.querySelectorAll('a')
    // console.log('ecent fynction', this.props.addEvent)
    this.props.addEvent(event)
    }

  render() {
    console.log('this is the props', this.props.events)
    return (
      <div className="parent">
      <div id='external-events' ref={this.containerRef}>
    `    <p>
          <strong>Favourites</strong>
        </p>
        <div class='fc-event'>My Event 1</div>
        <div class='fc-event'>My Event 2</div>
        <div class='fc-event'>My Event 3</div>
        <div class='fc-event'>My Event 4</div>
        <div class='fc-event'>My Event 5</div>
        {/* <p>
          <input type='checkbox' id='drop-remove' />
          <label for='drop-remove'>remove after drop</label>
        </p> */}
      </div>
      {/* <div ref={this.dragRef} className='fc-content' data-event='{ "title": "my event", "duration": "02:00" }'>drag me</div> */}
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
        // drop={function(info) {
        //   info.draggedEl.parentNode.removeChild(info.draggedEl)
        //   } 
        // }
        events={
          this.props.events
        }
        />
      </div>
      </div>
    )
  }
}

