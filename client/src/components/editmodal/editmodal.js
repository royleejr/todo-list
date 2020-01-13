import React from 'react';

import CloseIcon from '../../assets/close-icon.png';

import './editmodal.scss';

export default class EditModal extends React.Component {
  
  getDate = (when) => {
    const startDate = this.props.singularEvent.start.split('T');
    const endDate = this.props.singularEvent.end.split('T');
    
    if (when === "start") {
      return startDate[0];
    }
    else if (when === 'startTime') {
      return startDate[1];
    }
    else if (when === "end") {
      return  endDate[0]
    }
    else {
      return endDate[1]
    }
  }



  render() {
    return(
      <>
        <img className="edit-modal__close" src={CloseIcon} alt="" onClick={this.props.closeModal}/>
        <h2 className="edit-modal__heading">Add Event</h2>
        <form className="edit-modal__form" onSubmit={(props) => this.props.addNewEvent(props, this.props.singularEvent)}>
          <div className="edit-modal__form-item" id="full">
            <label className="edit-modal__form-label" htmlFor="title">Title</label>
            <input className="edit-modal__form-input" defaultValue={this.props.singularEvent.title ? this.props.singularEvent.title : null} required type="text" id="title" name="title" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="start-date">Start Date</label>
            <input className="edit-modal__form-input"  defaultValue={this.props.singularEvent.title ? this.getDate("start") : null} type="date" id="start-date" required name="startDate" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="start-time">Start Time</label>
            <input className="edit-modal__form-input"  defaultValue={this.props.singularEvent.title ? this.getDate("startTime") : null} type="time" id="start-time" required name="startTime" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="end-date">End Date</label>
            <input className="edit-modal__form-input" defaultValue={this.props.singularEvent.title ? this.getDate("end") : null} type="date" id="end-date" required name="endDate"/>
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="end-time">End Time</label>
            <input className="edit-modal__form-input"  defaultValue={this.props.singularEvent.title ? this.getDate("endTime") : null} type="time" id="end-time" required name="endTime" />
          </div>
          <div>
            <span className="edit-modal__form-label">Status</span>
            <input type="radio" id="pending" name="status" value="Pending" defaultChecked={this.props.singularEvent.status === "Pending" ? true : false}/>
            <label className="edit-modal__form-radio" htmlFor="pending" >Pending</label>
            <input type="radio" id="in-progress" name="status" value="In Progress" defaultChecked={this.props.singularEvent.status === "In progress" ? true : false}/>
            <label className="edit-modal__form-radio" htmlFor="in-progress">In progress</label>
            <input type="radio" id="complete" name="status" value="Complete" defaultChecked={this.props.singularEvent.status === "Complete" ? true : false}/>
            <label className="edit-modal__form-radio" htmlFor="complete">Complete</label>
          </div>
          <button className="edit-modal__form-button" type="submit">Save</button>
        </form>
      </>
    )
  }
}
