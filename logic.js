function startGame() {
  gameField = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  activePlayer = 0;
  renderBoard(gameField);
}

function click(row, column) {
  // ставим в поле крестик или нолик в зависимости от игрока, который ходит
  gameField[row][column] = players[activePlayer];
  renderBoard(gameField);
  // если произошла чья-то победа, то показать, кто выиграл
  if (checkWin()) {
    showWinner(activePlayer);
  } else {
    // передача хода следующему игроку, если никто не выиграл
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }
  }
}

function checkWin() {
  // проверка победы по горизонтали и вертикали
  let horizontal, vertical;
  for (let i = 0; i < gameField.length; i++) {
    horizontal = 1;
    vertical = 1;
    for (let j = 0; j < gameField.length - 1; j++) {
      // проверяем, попарно элементы в строках, что они одинаковы (xx или oo)
      // также смотрим, чтобы элемент не был пустой клеткой
      if (gameField[i][j] === gameField[i][j + 1] && gameField[i][j] != "") {
        horizontal += 1;
      }
      // проверяем, попарно элементы в столбцах, что они одинаковы
      // чтобы не создавать 2 цикла для строк и столбцов, меняем индексы местами
      if (gameField[j][i] === gameField[j + 1][i] && gameField[j][i] != "") {
        vertical += 1;
      }
    }
    // если нашлась строка или столбец с одинаковыми элементами, то засчитать победу
    if (horizontal === gameField.length || vertical === gameField.length) {
      return true;
    }
  }

  // проверка победы по диагоналям
  let diagonal_1 = 1; // главная диагональ (\)
  let diagonal_2 = 1; // побочная диагональ (/)
  for (let i = 0, j = gameField.length - 1; i < gameField.length - 1; i++, j--) {
    // проверка победы по главной диагонали (\)
    if (gameField[i][i] === gameField[i + 1][i + 1] && gameField[i][i] != "") {
      diagonal_1 += 1;
    }
    // проверка победы по побочной диагонали (/)
    if (gameField[i][j] === gameField[i + 1][j - 1] && gameField[i][j] != "") {
      diagonal_2 += 1
    }
  }
  // если какая-то из диагоналей полностью заполнена x или o, засчитать победу
  if (diagonal_1 === gameField.length || diagonal_2 === gameField.length) {
    return true;
  }

  // если ни одно из условий для победы не сработало, возвращаем ложь
  return false;
}

let players = ['x', 'o'];
let activePlayer;
let gameField;
