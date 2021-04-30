function init() {
  const playerTitle = document.querySelector(".playerTitle");
  const rematchButton = document.querySelector(".rematch");
  const items = document.querySelectorAll(".item");
  const gridArray = Array.from(items);
  let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let currentPlayer = "playerX";

  //Looping through all items

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      //player move
      const index = gridArray.indexOf(item);
      if (
        items[index].classList.contains("playerX") ||
        items[index].classList.contains("playerY")
      )
        return;
      items[index].classList.add("playerX");

      //splicing the move from tracking index;
      const spliceNr = tracking.indexOf(index + 1);
      tracking.splice(spliceNr, 1);

      //win check for the player
      if (wincheck("playerX", items)) {
        playerTitle.innerHTML = "Player X Wins";
        document.body.classList.add("over");
        return;
      }

      //check for draw
      if (tracking.length === 0) {
        playerTitle.innerHTML = "You are tough man, it's a draw !!";
        document.body.classList.add("over");
        return;
      }

      //computer move
      const random = Math.floor(Math.random() * tracking.length);
      const computerIndex = tracking[random];
      items[computerIndex - 1].classList.add("playerY");

      //splicing the computer move from tracking list
      tracking.splice(random, 1);

      // win check for computer
      if (wincheck("playerY", items)) {
        playerTitle.innerHTML = "Player Y Wins";
        document.body.classList.add("over");
        return;
      }
    });
  });

  rematchButton.addEventListener("click", (e) => {
    location.reload();
  });
}

init();

function wincheck(playerName, items) {
  function check(pos1, pos2, pos3) {
    if (
      items[pos1].classList.contains(playerName) &&
      items[pos2].classList.contains(playerName) &&
      items[pos3].classList.contains(playerName)
    ) {
      return true;
    }
    return false;
  }

  if (check(0, 3, 6)) return true;
  else if (check(1, 4, 7)) return true;
  else if (check(2, 5, 8)) return true;
  else if (check(0, 1, 2)) return true;
  else if (check(3, 4, 5)) return true;
  else if (check(6, 7, 8)) return true;
  else if (check(0, 4, 8)) return true;
}
