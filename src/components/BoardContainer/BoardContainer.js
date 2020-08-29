import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import smash from '../../helpers/data/smash';
import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
    editBoard: {},
  }

  goGetBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('get boards broke!!', err));
  }

  componentDidMount() {
    this.goGetBoards();
  }

  deleteBoard = (boardId) => {
    smash.deleteBoard(boardId)
      .then(() => { this.goGetBoards(); })
      .catch((err) => console.error(err));
  }

  createBoard = (newBoard) => {
    boardsData.createBoard(newBoard)
      .then(() => {
        this.goGetBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('Create board failed', err));
  }

  editABoard = (boardToEdit) => {
    this.setState({ formOpen: true, editBoard: boardToEdit });
  }

  updateBoard = (boardId, editedBoard) => {
    boardsData.updateBoard(boardId, editedBoard)
      .then(() => {
        this.goGetBoards();
        this.setState({ formOpen: false, editBoard: {} });
      })
      .catch((err) => console.error('Update board failed', err));
  }

  closeForm = () => {
    this.setState({ formOpen: false });
  }

  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;
    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard} editABoard={this.editABoard}/>);

    return (
      <div>
        {!formOpen ? <button className="btn btn-warning" onClick={() => { this.setState({ formOpen: true, editBoard: {} }); }}><i className='far fa-plus-square'></i></button> : '' }
        {formOpen ? <BoardForm createBoard={this.createBoard} boardThatIAmEditing={editBoard} updateBoard={this.updateBoard} closeForm={this.closeForm}/> : '' }
        <h1>My Boards</h1>
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
