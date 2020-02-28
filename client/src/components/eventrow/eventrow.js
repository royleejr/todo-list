import React from 'react';

import './eventrow.scss';

export default class EventRow extends React.Component {

  getDate = (date) => {
    //get just the date from the start time
    const newDate = new Date(date)
    var options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return newDate.toLocaleDateString("en-US", options)
  }

  getTime = (date) => {
    if (date) {
      //get just the time from the date
      const dateArray = date.split('T');
      //change 24 hour time to 12 hour time
      if (dateArray[1].substring(0,2) > 12) {
        const first = dateArray[1].substring(0,2) - 12;
        return `${first}:${dateArray[1].substring(3,5)}pm`
      }
      else {
        return `${dateArray[1].substring(0,5)}am`
      }
    }
  }

  render() {
    const {title, start, end, status} = this.props.event
    return (
      <article className="event">
        <span className="event-field event--name">{title}</span>
        <span className="event-field event--date">{this.getDate(start)}</span>
        <span className="event-field event--time">{this.getTime(start)}</span>
        <span className="event-field event--date">{this.getDate(end)}</span>
        <span className="event-field event--time">{this.getTime(end)}</span>
        <span className="event-field event--status">{status}</span>
      </article>
    )
  }
}