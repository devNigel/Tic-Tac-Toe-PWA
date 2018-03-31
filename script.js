const alertBox = document.getElementById("updateNotification");
const updateButton = document.getElementById("updateButton");

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            //check if page was loaded via service worker
            if (!navigator.serviceWorker.controller) {
                return;
            }

            // if updated service worker is waiting
            if (registration.waiting) {
                console.log("sw waiting")
                updateReady(registration.waiting);
            }
            //if service worker is installing
            if (registration.installing) {
                //track installing
                console.log("sw installing")
                trackInstalling(registration.installing);
                return;
            }

            //listen for service worker update
            registration.addEventListener('updatefound', function () {
                console.log("updatefound")
                trackInstalling(registration.installing);
            })

            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function trackInstalling(worker) {
    worker.addEventListener('statechange', function () {
        if (worker.state == 'installed') {
            updateReady(worker);
        }
    })
}

function updateReady(worker) {
    alertBox.style.display = "block";
    updateButton.addEventListener('click', function () {
        worker.postMessage({ action: 'skipWaiting' });

    });
}


navigator.serviceWorker.addEventListener("controllerchange", function () {
    window.location.reload();
})

// 0 - mode not selected 
// 1 - single player
// 2 - multiplayer
var mode = 0;
var player1 = ''; //user
var player2 = ''; // 2nd player or computer
var currentPlayer = '';
var clicks = 0;
var winner;
var resultString = '';
var gameEnded = false;

//init
function init_game() {
    $(".game-init").show();
    $(".mode-select").show();
    $(".icon-select").hide();
    $(".game-board").hide();
    $(".game-result").show();

    document.getElementById('cell1').innerHTML = "&nbsp;";
    document.getElementById('cell3').innerHTML = "&nbsp;";
    document.getElementById('cell7').innerHTML = "&nbsp;";
    document.getElementById('cell9').innerHTML = "&nbsp;";
}

function restart_game() {

    mode = 0;
    player1 = ''; //user
    player2 = ''; // 2nd player or computer
    currentPlayer = '';
    clicks = 0;
    winner = '';
    resultString = '';
    gameEnded = false;
    $(".game-result").html("");
    document.getElementById('cell1').innerHTML = "";
    $("#cell1").css("pointer-events", "auto");
    document.getElementById('cell2').innerHTML = "";
    $("#cell2").css("pointer-events", "auto");
    document.getElementById('cell3').innerHTML = "";
    $("#cell3").css("pointer-events", "auto");
    document.getElementById('cell4').innerHTML = "";
    $("#cell4").css("pointer-events", "auto");
    document.getElementById('cell5').innerHTML = "";
    $("#cell5").css("pointer-events", "auto");
    document.getElementById('cell6').innerHTML = "";
    $("#cell6").css("pointer-events", "auto");
    document.getElementById('cell7').innerHTML = "";
    $("#cell7").css("pointer-events", "auto");
    document.getElementById('cell8').innerHTML = "";
    $("#cell8").css("pointer-events", "auto");
    document.getElementById('cell9').innerHTML = "";
    $("#cell9").css("pointer-events", "auto");
    $('#cell1').css('background-color', '#fff');
    $('#cell2').css('background-color', '#fff');
    $('#cell3').css('background-color', '#fff');
    $('#cell4').css('background-color', '#fff');
    $('#cell5').css('background-color', '#fff');
    $('#cell6').css('background-color', '#fff');
    $('#cell7').css('background-color', '#fff');
    $('#cell8').css('background-color', '#fff');
    $('#cell9').css('background-color', '#fff');
    init_game();
}

function game_icon_select() {
    $(".mode-select").hide();
    $(".icon-select").show();

}

function game_start() {
    $(".icon-select").hide();
    $(".game-init").hide();
    $(".game-board").show();
}

function game_result() {
    $(".icon-select").hide();
    $(".game-init").hide();
    $(".game-board").show();
    $(".game-result").show();
    $("#cell1").css("pointer-events", "none");
    $("#cell2").css("pointer-events", "none");
    $("#cell3").css("pointer-events", "none");
    $("#cell4").css("pointer-events", "none");
    $("#cell5").css("pointer-events", "none");
    $("#cell6").css("pointer-events", "none");
    $("#cell7").css("pointer-events", "none");
    $("#cell8").css("pointer-events", "none");
    $("#cell9").css("pointer-events", "none");
}

$("#mode1").click(function () {
    mode = 1; //singleplayer
    game_icon_select();
});
$("#mode2").click(function () {
    mode = 2;
    game_icon_select();
});

$("#icon-o").click(function () {
    player1 = "O";
    player2 = "X";
    currentPlayer = player1;
    game_start();
});
$("#icon-x").click(function () {
    player1 = "X";
    player2 = "O";
    currentPlayer = player1;
    game_start();
});

function currentPlayerToggle() {


    currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;

    if (gameEnded === false) {

        $('.game-result').html(currentPlayer + " 's turn");
    }
    if (mode == 1 && currentPlayer == player2 && gameEnded === false) {

        setTimeout(
            function () {
                computerPlay();
            }, 500);



    }

}

$('.cell').click(function () {
    document.getElementById(this.id).innerHTML = currentPlayer;
    $('#' + this.id).css("pointer-events", "none");

    clicks++;

    if (clicks >= 5) {

        winCheck();
    }
    //alert(clicks);
    isGameEnd();
    currentPlayerToggle();

});

function computerPlay() {

    switch (true) {
        case $('#cell5').html() !== player1 && $('#cell5').html() !== player2:
            $('#cell5').html(player2);
            $("#cell5").css("pointer-events", "none");

            break;

        case $('#cell9').html() !== player1 && $('#cell9').html() !== player2:
            $('#cell9').html(player2);
            $("#cell9").css("pointer-events", "none");
            break;

        case $('#cell1').html() !== player1 && $('#cell1').html() !== player2:

            $('#cell1').html(player2);
            $("#cell1").css("pointer-events", "none");
            break;
        case $('#cell2').html() !== player1 && $('#cell2').html() !== player2:
            $('#cell2').html(player2);
            $("#cell2").css("pointer-events", "none");
            break;
        case $('#cell3').html() !== player1 && $('#cell3').html() !== player2:
            $('#cell3').html(player2);
            $("#cell3").css("pointer-events", "none");
            break;
        case $('#cell4').html() !== player1 && $('#cell4').html() !== player2:
            $('#cell4').html(player2);
            $("#cell4").css("pointer-events", "none");
            break;

        case $('#cell6').html() !== player1 && $('#cell6').html() !== player2:
            $('#cell6').html(player2);
            $("#cell6").css("pointer-events", "none");
            break;

        case $('#cell7').html() !== player1 && $('#cell7').html() !== player2:
            $('#cell7').html(player2);
            $("#cell7").css("pointer-events", "none");
            break;
        case $('#cell8').html() !== player1 && $('#cell8').html() !== player2:
            $('#cell8').html(player2);
            $("#cell8").css("pointer-events", "none");
            break;

    }
    clicks++;

    currentPlayerToggle();

    if (clicks >= 5) {

        winCheck();
    }
    //alert(clicks);
    isGameEnd();

}

function winCheck() {

    switch (true) {
        case $('#cell1').html() === $('#cell2').html() && $('#cell2').html() === $('#cell3').html():
            $('#cell1').css('background-color', '#f12b2b');
            $('#cell2').css('background-color', '#f12b2b');
            $('#cell3').css('background-color', '#f12b2b');
            player1 == $('#cell1').html() ? winner = "Player 1" : winner = "Player 2";

            gameEnded = true;
            break;
        case $('#cell4').html() === $('#cell5').html() && $('#cell5').html() === $('#cell6').html():
            $('#cell4').css('background-color', '#f12b2b');
            $('#cell5').css('background-color', '#f12b2b');
            $('#cell6').css('background-color', '#f12b2b');
            player1 == $('#cell4').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        case $('#cell7').html() === $('#cell8').html() && $('#cell8').html() === $('#cell9').html():
            $('#cell7').css('background-color', '#f12b2b');
            $('#cell8').css('background-color', '#f12b2b');
            $('#cell9').css('background-color', '#f12b2b');
            player1 == $('#cell7').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        case $('#cell1').html() === $('#cell4').html() && $('#cell4').html() === $('#cell7').html():
            $('#cell1').css('background-color', '#f12b2b');
            $('#cell4').css('background-color', '#f12b2b');
            $('#cell7').css('background-color', '#f12b2b');
            player1 == $('#cell1').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        case $('#cell2').html() === $('#cell5').html() && $('#cell5').html() === $('#cell8').html():
            $('#cell2').css('background-color', '#f12b2b');
            $('#cell5').css('background-color', '#f12b2b');
            $('#cell8').css('background-color', '#f12b2b');
            player1 == $('#cell2').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;

        case $('#cell3').html() === $('#cell6').html() && $('#cell6').html() === $('#cell9').html():
            $('#cell3').css('background-color', '#f12b2b');
            $('#cell6').css('background-color', '#f12b2b');
            $('#cell9').css('background-color', '#f12b2b');
            player1 == $('#cell3').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        case $('#cell1').html() === $('#cell5').html() && $('#cell5').html() === $('#cell9').html():
            $('#cell1').css('background-color', '#f12b2b');
            $('#cell5').css('background-color', '#f12b2b');
            $('#cell9').css('background-color', '#f12b2b');
            player1 == $('#cell1').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        case $('#cell3').html() === $('#cell5').html() && $('#cell5').html() === $('#cell7').html():
            $('#cell3').css('background-color', '#f12b2b');
            $('#cell5').css('background-color', '#f12b2b');
            $('#cell7').css('background-color', '#f12b2b');
            player1 == $('#cell3').html() ? winner = "Player 1" : winner = "Player 2";
            gameEnded = true;
            break;
        default:
            if (clicks == 9)
                gameEnded = true;
            winner = "draw";

    }
}

function isGameEnd() {
    if (gameEnded == true) {

        game_result();
        if (winner == "draw") {
            resultString = "Game ended in draw!";

        } else if (winner == "Player 1" || winner == "Player 2") {
            if (mode == 1) {
                winner == "Player 1" ? winner = "You" : winner = "Computer";
            }

            resultString = winner + " won!";
        }


        $('.game-result').html(resultString);

    }


}