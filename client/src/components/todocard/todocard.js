import React from 'react';

import MenuIcon from '../../assets/menu-icon.png';

import './todocard.scss';

export default class ToDoCard extends React.Component {
  state = {
    menuIsOpen: false
  };
  
  toggleMenu = () => {
    this.setState({menuIsOpen: !this.state.menuIsOpen});
  }
  
  render() {
    return (
      <article className="card">
        <div className="card__date">
          <span className="card__date-day">20</span>
          <span className="card__date-month">December</span>
        </div>
        <div className="card__details">
          <div className="card__details-text">
            <h2 className="card__details-text-name">Code all day everyday</h2>
            <p className="card__details-text-description">Now</p>
          </div>
          <img className="card__details-menu" src={MenuIcon} alt="" onClick={this.toggleMenu}/>
        </div>
        {this.state.menuIsOpen ? 
          <div className="card__popup">
            <p className="card__popup-item">Edit</p>
            <p className="card__popup-item">Delete</p>
          </div>
        :
          null
        }
      </article>
    )
  }
}