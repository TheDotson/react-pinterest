import boardData from './boardsData';
import pinData from './pinsData';

const deleteBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.deleteBoard(boardId)
    .then(() => {
      pinData.getPinsByBoardId(boardId).then((boardPins) => {
        boardPins.forEach((pin) => {
          pinData.deletePin(pin.id);
        });
        resolve();
      });
    })
    .catch((err) => reject(err));
});

export default { deleteBoard };
