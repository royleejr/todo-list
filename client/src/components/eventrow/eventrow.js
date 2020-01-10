import React from 'react';

import './eventrow.scss';

export default class EventRow extends React.Component {

  getDate = (date) => {
    //get just the date from the start time

    const dateArray = date.split('T');
    console.log(dateArray[0])
    const newDate = new Date(date)
    const day = (newDate.getDate() + 1)
    var options = {weekday: "long", year: "numeric", month: "short", day: "numeric"};
    return newDate.toLocaleDateString("en-US", options)
    // return dateArray[0]
  }

  getStartTime = (date) => {
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

  getEndTime = (date) => {
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

  render() {
    const {title, start, end, status} = this.props.event
    return (
      <article className="event">
        <span className="event-field event--name">{title}</span>
        <span className="event-field event--date">{this.getDate(end)}</span>
        <span className="event-field event--time">{this.getStartTime(start)}</span>
        <span className="event-field event--time">{this.getEndTime(end)}</span>
        <span className="event-field event--status">{status}</span>
      </article>
    )
  }
}