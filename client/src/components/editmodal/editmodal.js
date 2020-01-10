import React from 'react';

import CloseIcon from '../../assets/close-icon.png';

import './editmodal.scss';

export default class EditModal extends React.Component {
  render() {
    return(
      <>
        <img className="edit-modal__close" src={CloseIcon} alt="" onClick={this.props.closeModal}/>
        <h2 className="edit-modal__heading">Add Event</h2>
        <form className="edit-modal__form">
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" for="title">Title</label>
            <input className="edit-modal__form-input" type="text" id="title" name="title" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" for="date">Date</label>
            <input className="edit-modal__form-input" type="date" id="date" name="date" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" for="start-time">Start Time</label>
            <input className="edit-modal__form-input"  type="time" id="start-time" name="start-time" />
          </div>
          <div className="edit-modal__form-item">
            <label className="edit-modal__form-label" for="end-time">End Time</label>
            <input className="edit-modal__form-input"  type="time" id="end-time" name="end-time" />
          </div>
          <div>
            <span className="edit-modal__form-label">Status</span>
            <input type="radio" id="pending" name="status" />
            <label className="edit-modal__form-radio" for="pending">Pending</label>
            <input type="radio" id="in-progress" name="status" />
            <label className="edit-modal__form-radio" for="in-progress">In Progress</label>
            <input type="radio" id="complete" name="status" />
            <label className="edit-modal__form-radio" for="complete">Complete</label>
          </div>
          <button className="edit-modal__form-button" type="submit">Save</button>
        </form>
      </>
    )
  }
}
