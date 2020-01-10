import React from 'react';

import './eventrow.scss';

export default class EventRow extends React.Component {
  render() {
    return (
      <article className="event">
        <span className="event-field event--name">Landing page design</span>
        <span className="event-field event--date">September 21, 2019</span>
        <span className="event-field event--time">12:10 pm</span>
        <span className="event-field event--time">12:20 pm</span>
        <span className="event-field event--status">In progress</span>
      </article>
    )
  }
}