import React from 'react';

import './editmodal.scss';

export default class EditModal extends React.Component {
  render() {
    return(
      <>
        <h2 ref={subtitle => this.subtitle = subtitle}>Edit Event</h2>
        <button onClick={this.props.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          {/* <input /> */}
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </>
    )
  }
}
