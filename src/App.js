import React, { useState } from 'react';

function App() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'To do',
      items: [
        { id: 1, title: 'task ~ no. 1 part 1' },
        { id: 2, title: 'task ~ no. 1 part 2' },
        { id: 3, title: 'task ~ no. 1 part 3' },
      ],
    },
    {
      id: 2,
      title: 'In process',
      items: [
        { id: 1, title: 'task ~ no. 2 part 1' },
        { id: 2, title: 'task ~ no. 2 part 2' },
        { id: 3, title: 'task ~ no. 2 part 3' },
      ],
    },
    {
      id: 3,
      title: 'Done',
      items: [
        { id: 1, title: 'task ~ no. 3 part 1' },
        { id: 2, title: 'task ~ no. 3 part 2' },
        { id: 3, title: 'task ~ no. 3 part 3' },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function addNewTask(e) {
    const taskText = prompt('What do you want to add?');
    console.log(boards[0].items.length);
    let newObj = {
      id: boards[0].items.length,
      title: taskText,
    };
    boards[0].items.push(newObj);
    setBoards(boards.map((b) => b));
  }

  function removeTask(e, board, item) {
    e.preventDefault();
    setBoards(
      boards.map((b) => {
        if (b === board) {
          b.items.splice(b.items.indexOf(item), 1);
        }
        return b;
      })
    );
  }

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }

  function dragStartHandler(e, board, item) {
    e.target.style.backgroundColor = 'lightpink';
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundColor = '#fcfcf9';
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.boxShadow = 'none';
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    if (currentIndex !== dropIndex) {
      board.items.splice(dropIndex, 0, currentItem);
    } else {
      board.items.splice(dropIndex + 1, 0, currentItem);
    }
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    e.target.style.boxShadow = 'none';
    e.target.style.backgroundColor = '#fcfcf9';
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  return (
    <div className="container">
      <div className="App">
        {boards.map((board) => (
          <div
            className="board"
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item) => (
              <div
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                onContextMenu={(e) => removeTask(e, board, item)}
                draggable={true}
                className="item"
              >
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="addButton" onClick={(e) => addNewTask(e)}>
        add&nbsp;new&nbsp;task
      </button>
      <span>rmb&nbsp;item&nbsp;to&nbsp;remove&nbsp;it</span>
    </div>
  );
}

export default App;
