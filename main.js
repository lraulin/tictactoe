$(document).ready(function() {
  //Default player's turn to X
  var turn = "X";
  //Array to test for victory
  var turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  //Defaulit computer's turn
  var computersTurn = "O";
  //Keeps track of whether or not game has been won
  var gameOn = false;
  //Keeps track of number of turns taken
  var count = 0;

  function playerTurn(turn, id) {
    var spotTaken = $("#"+id).text();
    if (spotTaken==="#") {
      count++;
      turns[id] = turn;
      $("#"+id).text(turn);
      console.log(turn);
      console.log(turns);
      console.log(gameOn);
      winCondition(turns, turn);
      if(gameOn===false) {
        console.log("Go computer!");
        computerTurn();
        winCondition(turns, computersTurn);
      }
    }
  }

  function computerTurn() {
    var taken = false;
    while (taken === false && count !== 5) {
      //Generate computer's random turns
      var computersMove = (Math.random()*10).toFixed();
      console.log( computersMove);
      var move = $("#" + computersMove).text();
      console.log(move);
      if (move === "#") {
        $("#" + computersMove).text(computersTurn);
        taken = true;
        turns[computersMove] = computersTurn;
      }
    }
  }

  function reset() {
    turns = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    $(".tic").text("#");
  }
  function winCondition(turnArray, currentTurn) {
    if (
      /*horizontal*/
      (turnArray[0] === currentTurn && turnArray[1] === currentTurn && turnArray[2] === currentTurn) ||
      (turnArray[3] === currentTurn && turnArray[4] === currentTurn && turnArray[5] === currentTurn) ||
      (turnArray[6] === currentTurn && turnArray[7] === currentTurn && turnArray[8] === currentTurn) ||
      /*vertical*/
      (turnArray[0] === currentTurn && turnArray[3] === currentTurn && turnArray[6] === currentTurn) ||
      (turnArray[1] === currentTurn && turnArray[4] === currentTurn && turnArray[7] === currentTurn) ||
      (turnArray[2] === currentTurn && turnArray[5] === currentTurn && turnArray[8] === currentTurn) ||
      /*diagonal*/
      (turnArray[0] === currentTurn && turnArray[4] === currentTurn && turnArray[8] === currentTurn) ||
      (turnArray[6] === currentTurn && turnArray[4] === currentTurn && turnArray[2] === currentTurn)) {
      gameOn = true;
      alert("Player " + currentTurn + " wins!");
      reset();
    }
  }

  //Change player
  $("#turnO").click(function() {
    reset();
    turn = "O";
    computersTurn = "X";
    $("#turnO").removeClass("btn-primary");
    $("#turnO").addClass("btn-success active");
    $("#turnX").removeClass("btn-success active");
    $("#turnX").addClass("btn-primary");
  });

  $("#turnX").click(function() {
    reset();
    turn = "X";
    computersTurn = "O";
    $("#turnX").removeClass("btn-primary");
    $("#turnX").addClass("btn-success active");
    $("#turnO").removeClass("btn-success active");
    $("#turnO").addClass("btn-primary");
  });

  $(".tic").click(function() {
    var slot = $(this).attr("id");
    playerTurn(turn, slot);
  });
});
