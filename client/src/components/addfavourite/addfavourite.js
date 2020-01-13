import React from 'react';

import CloseIcon from '../../assets/close-icon.png';

import './addfavourite.scss';

export default class AddFavourite extends React.Component {
  render() {
    return(
      <>
        <img className="add-fav__close" src={CloseIcon} alt="" onClick={this.props.closeModal}/>
        <h2 className="add-fav__heading">Add Favourite Event</h2>
        <form className="add-fav__form">
          <div className="add-fav__form-item">
            <label className="add-fav__form-label" htmlFor="fav-title">Title</label>
            <input className="add-fav__form-input" required type="text" id="fav-title" name="favTitle" />
          </div>
          <button className="add-fav__form-button" type="submit">Save</button>
        </form>
      </>
    )
  }
}
