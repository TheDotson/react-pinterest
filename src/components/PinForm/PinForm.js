import React from 'react';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  state = {
    title: '',
    link: '',
    imageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { editPin } = this.props;
    if (editPin.title) {
      this.setState({
        title: editPin.title,
        link: editPin.link,
        imageUrl: editPin.imageUrl,
        isEditing: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const previousPin = prevProps.editPin;
    const incomingPin = this.props.editPin;

    if (previousPin.title !== incomingPin.title) {
      this.setState({
        title: incomingPin.title || '',
        link: incomingPin.link || '',
        imagUrl: incomingPin.imagUrl || '',
        // eslint-disable-next-line no-unneeded-ternary
        isEditing: incomingPin.title ? true : false,
      });
    }
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeLinkEvent = (e) => {
    e.preventDefault();
    this.setState({ link: e.target.value });
  }

  changeImageEvent = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { title, link, imageUrl } = this.state;
    const { createPin, boardId } = this.props;

    const newPin = {
      boardId,
      title,
      link,
      imageUrl,
      uid: authData.getUid(),
    };
    createPin(newPin);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { title, link, imageUrl } = this.state;
    const { updatePin, editPin, boardId } = this.props;

    const editedPin = {
      title,
      link,
      imageUrl,
      uid: authData.getUid(),
      boardId,
    };
    updatePin(editPin.id, editedPin);
  }

  closeFormEvent = (e) => {
    e.preventDefault();
    this.props.closeForm();
  }

  render() {
    const {
      title,
      link,
      imageUrl,
      isEditing,
    } = this.state;

    return (
      <form className="col-6 offset-3">
        <button className="btn btn-danger mt-2" onClick={this.closeFormEvent}>CLOSE FORM</button>
        <div className="form-group">
          <label htmlFor="pinTitle">Pin Title</label>
          <input
            type="text"
            className="form-control"
            id="pinTitle"
            placeholder="Enter Pin Name"
            value={title}
            onChange={this.changeTitleEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinLink">Pin Link</label>
          <input
            type="text"
            className="form-control"
            id="pinLink"
            placeholder="Website"
            value={link}
            onChange={this.changeLinkEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pinImage">Pin Image</label>
          <input
            type="text"
            className="form-control"
            id="pinImage"
            placeholder="Image URL"
            value={imageUrl}
            onChange={this.changeImageEvent}
          />
        </div>
        {
          isEditing
            ? <button className="btn btn-dark" onClick={this.editPinEvent}>Edit Pin</button>
            : <button className="btn btn-dark" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
