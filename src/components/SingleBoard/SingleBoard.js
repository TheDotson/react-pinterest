import React from 'react';
import PropTypes from 'prop-types';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
    formOpen: false,
    editPin: {},
  }

  goGetYoPins = () => {
    const { boardId } = this.props;

    pinsData.getPinsByBoardId(boardId)
      .then((pins) => this.setState({ pins }))
      .catch((err) => console.error('get pins failed', err));
  };

  componentDidMount() {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((response) => this.setState({ board: response.data }))
      .catch((err) => console.error('get single board failed', err));

    this.goGetYoPins();
  }

  deletePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => { this.goGetYoPins(); })
      .catch((err) => console.error('delete pin failed', err));
  };

  createPin = (newPin) => {
    pinsData.createPin(newPin)
      .then(() => {
        this.goGetYoPins();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create pin failed', err));
  }

  editAPin = (pinToEdit) => {
    this.setState({ formOpen: true, editPin: pinToEdit });
  }

  updatePin = (pinId, editedPin) => {
    pinsData.updatePin(pinId, editedPin)
      .then(() => {
        this.goGetYoPins();
        this.setState({ formOpen: false, editPin: {} });
      })
      .catch((err) => console.error('Update pin failed', err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;
    const { setSingleBoard, boardId } = this.props;
    const pinCards = pins.map((pin) => <Pin key={pin.id} pin={pin} setSingleBoard={setSingleBoard} deletePin={this.deletePin} editAPin={this.editAPin}/>);

    return (
      <div>
        <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: !formOpen }); }}><i className="far fa-plus-square"></i></button>
        { formOpen ? <PinForm boardId={boardId} createPin={this.createPin} editPin={editPin} updatePin={this.updatePin} closeForm={this.closeForm}/> : '' }
        <h4>{board.name}</h4>
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>X</button>
        <div className="card-columns">
          {pinCards}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
