import React from 'react';

import MenuIcon from '../../assets/menu-icon.png';

import './todocard.scss';

export default class ToDoCard extends React.Component {

  menuRef = React.createRef();

  state = {
    menuIsOpen: false
  };
  
  //add an event listener to the screen for every mouse click on first mount.
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  toggleMenu = () => {
    this.setState({menuIsOpen: !this.state.menuIsOpen});
  }

  //closes the menu dropdown when the click is not on the edit/delete element.
  handleClick = event => {
    console.log(this.menuRef.current)
    if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
        this.setState({
            menuIsOpen: false
        });
    }
  };

  render() {

    const {title, status} = this.props.event

    return (
      <article className="card">
        <div className="card__date">
          <span className="card__date-day">{this.props.day}</span>
          <span className="card__date-month">{this.props.month}</span>
        </div>
        <div className="card__details">
          <div className="card__details-text">
            <h2 className="card__details-text-name">{title}</h2>
            <p className="card__details-text-description">{status}</p>
          </div>
          <img className="card__details-menu" src={MenuIcon} alt="" onClick={this.toggleMenu}/>
        </div>
        {this.state.menuIsOpen ? 
          <div className="card__popup" ref={this.menuRef}>
            <p className="card__popup-item" onClick={() => this.props.openModal(this.props.event, this.toggleMenu)}>Edit</p>
            <p className="card__popup-item" onClick={(props) => this.props.deleteEvent(this.props.event.id, this.toggleMenu)}>Delete</p>
          </div>
        :
          null
        }
      </article>
    )
  }
}