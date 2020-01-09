import React from 'react';
import Modal from 'react-modal';
import './dashboard.scss';


import EditModal from '../../components/editmodal/editmodal';

Modal.setAppElement('body')

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Dashboard extends React.Component {

  state = {
      modalIsOpen: false
    };

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    return (
      <section className="dashboard">
        <button className="dashboard__open-button" onClick={this.openModal}>+Add Project</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditModal closeModal={this.closeModal}/>
        </Modal>
        {
          this.props.events.map(item => {
            return <p>{item.title}</p>
          })
        }
      </section>
    )
  }
}