import React from 'react';

import './status.scss';

export default class Status extends React.Component {
  state = {
    status: "Pending"
  }

  changeStatus = (event) => {
    this.setState({
      status: event.target.innerText
    })
  }

  getCards = () => {
    const filteredArray = this.props.events.filter(item => {
      return item.status === this.state.status
    })
    return this.props.getToDoList(filteredArray, 'status')
  }
  
  render() {
    return (
      <section className="status">
        <h1 className="status__heading">Filter events by status</h1>
        <ul className="status__list">
          <li className={`status__list-item ${this.state.status === "Pending" ? `status__list-item--active` : null}`} onClick={this.changeStatus}>Pending</li>
          <li className={`status__list-item ${this.state.status === "In progress" ? `status__list-item--active` : null}`} onClick={this.changeStatus}>In progress</li>
          <li className={`status__list-item ${this.state.status === "Complete" ? `status__list-item--active` : null}`} onClick={this.changeStatus}>Complete</li>
        </ul>
        <div className="status__cards">
          {
            this.getCards()
          }
        </div>
      </section>
    )
  }
}