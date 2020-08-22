import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../helpers/data/authData';
import boardsData from '../../helpers/data/boardsData';
import smash from '../../helpers/data/smash';
import Board from '../Board/Board';

class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
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
      .then(() => {
        this.goGetBoards();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { boards } = this.state;
    const { setSingleBoard } = this.props;
    const boardCard = boards.map((board) => <Board key={board.id} board={board} setSingleBoard={setSingleBoard} deleteBoard={this.deleteBoard}/>);

    return (
      <div>
        <h1>My Boards</h1>
        <div className="card-columns">
          {boardCard}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
