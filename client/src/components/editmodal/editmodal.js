import React from 'react';

import CloseIcon from '../../assets/close-icon.png';

import './editmodal.scss';

export default class EditModal extends React.Component {
  render() {
    return(
      <>
        <img className="edit-modal__close" src={CloseIcon} alt="" onClick={this.props.closeModal}/>
        <h2 className="edit-modal__heading">Add Event</h2>
        <form className="edit-modal__form" onSubmit={(props) => this.props.addNewEvent(props)}>
          <div className="edit-modal__form-item" id="full">
            <label className="edit-modal__form-label" htmlFor="title">Title</label>
            <input className="edit-modal__form-input" type="text" id="title" name="title" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="date">Start Date</label>
            <input className="edit-modal__form-input" type="date" id="date" name="startDate" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="start-time">Start Time</label>
            <input className="edit-modal__form-input"  type="time" id="start-time" name="startTime" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="date">End Date</label>
            <input className="edit-modal__form-input" type="date" id="date" name="endDate" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" htmlFor="end-time">End Time</label>
            <input className="edit-modal__form-input"  type="time" id="end-time" name="endTime" />
          </div>
          <div>
            <span className="edit-modal__form-label">Status</span>
            <input type="radio" id="pending" name="status" value="Pending"/>
            <label className="edit-modal__form-radio" htmlFor="pending" >Pending</label>
            <input type="radio" id="in-progress" name="status" value="In Progress"/>
            <label className="edit-modal__form-radio" htmlFor="in-progress">In Progress</label>
            <input type="radio" id="complete" name="status" value="Complete"/>
            <label className="edit-modal__form-radio" htmlFor="complete">Complete</label>
          </div>
          <button className="edit-modal__form-button" type="submit">Save</button>
        </form>
      </>
    )
  }
}
