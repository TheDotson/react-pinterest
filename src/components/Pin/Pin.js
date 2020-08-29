import React from 'react';
import PropTypes from 'prop-types';
import pinShape from '../../helpers/props/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, deletePin } = this.props;
    deletePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { editAPin, pin } = this.props;
    editAPin(pin);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="card border-0 pins">
        <img className="card-img pin-image" src={pin.imageUrl} alt={pin.title} />
        <div className="card-img-overlay">
          <button className="btn btn-danger" onClick={this.deletePinEvent}>Delete Pin</button>
          <button className="btn btn-warning" onClick={this.editPinEvent}>Edit Pin</button>
          <h5 className="card-title">{pin.title}</h5>
        </div>
      </div>
    );
  }
}

export default Pin;
