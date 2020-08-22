import React from 'react';
import PropTypes from 'prop-types';
import boardShape from '../../helpers/props/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
  }

  singleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  }

  deleteBoardEvent = (e) => {
    const { board, deleteBoard } = this.props;
    e.preventDefault();
    deleteBoard(board.id);
  }

  render() {
    const { board } = this.props;

    return (
      <div className="card text-center board-card">
        <div className="card-header"><h5>{board.name}</h5></div>
        <div className="card-body">
          <p className="card-title">{board.description}</p>
          <button className="btn btn-secondary" onClick={this.singleBoardEvent}>View Board Details</button>
          <button className="btn btn-danger" onClick={this.deleteBoardEvent}>Delete Board</button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Board;
