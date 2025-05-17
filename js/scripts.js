function mazeFile(mazeName, mazeMap, highScores) {
    this.mazeName = mazeName;
    this.mazeMap = mazeMap;
    this.highScores = highScores;
}

var mazeList = new Array();

mazeList.push(new mazeFile(
    'Spiral',

    [[1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,0,1],
    [1,0,1,0,1,3,0,1,0,1],
    [1,0,1,0,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,2]],

    [['Gordon','Eli','Barney','Isaac','Otis'],
    [4,5,7,8,9],
    [15,2,2,2,14]]
));

mazeList.push(new mazeFile(
    'ZigZag',

    [[3,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,2]],

    [['Billy','Harry','Jim','Andy','Eric'],
    [3,4,8,9,9],
    [15,32,92,82,99]]
));

titleLoader(mazeList[0].mazeName);
gameBoardLoader(mazeList[0].mazeMap);
highScoresLoader(mazeList[0].highScores);

function titleLoader(title){
    var titleBar = document.getElementById('titleText');
    titleBar.textContent = title;
}

function gameBoardLoader(gameBoard){
    var gbEl = document.getElementById('playgrid');

    while (gbEl.firstElementChild){
        gbEl.removeChild(gbEl.firstElementChild);
    }
    for(var x = 0; x < 10; x++){
        for(var y = 0; y < 10; y++){
            var tempDiv = document.createElement('div');
            gbEl.appendChild(tempDiv);
            if(gameBoard[x][y] == 0){
                tempDiv.setAttribute('class', 'whiteSquare');
            }
            else if(gameBoard[x][y] == 1){
                tempDiv.setAttribute('class', 'blackSquare');
            }
            else if(gameBoard[x][y] == 2){
                tempDiv.setAttribute('class', 'startMaze');
            }
            else{
                tempDiv.setAttribute('class', 'endMaze');
            }
            gbEl.appendChild(tempDiv);
        }
    }
}

function highScoresLoader(scores){
    var scoresList = document.getElementById('highScores');

    while (scoresList.firstElementChild){
        scoresList.removeChild(scoresList.firstElementChild);
    }
    for(var i = 0; i < 5; i++){
        var tempDiv = document.createElement('div');
        var playerInfo;
        tempDiv.setAttribute('class', 'score');
        if(scores[2][i] < 10){
            playerInfo = ('<h2>' + scores[0][i] + '</h2><h3>' + scores[1][i] + ':0' + scores[2][i] + '</h3>' );
        }
        else{
            playerInfo = ('<h2>' + scores[0][i] + '</h2><h3>' + scores[1][i] + ':' + scores[2][i] + '</h3>' );
        }
        // playerInfo = '<h2>test</h2><h3>1:23</h3>'
        tempDiv.innerHTML = playerInfo;
        scoresList.appendChild(tempDiv);
    }
    
}

function mazeLoader(selected) {
    var selectedMaze = selected.target;

    var index = selectedMaze.getAttribute('mapIndex');
    titleLoader(mazeList[index].mazeName);
    gameBoardLoader(mazeList[index].mazeMap);
    highScoresLoader(mazeList[index].highScores);
    statusReset();
}

var timeRun = false;
var timeDisplay = document.getElementById('timeElapsed');

function timer(){
    var millSec = 0;
    var sec = 0;
    var timer = setInterval(function(){
        if(!timeRun){
            clearInterval(timer);
        }
        if(millSec < 99){
            if(millSec < 9){
                millSec++;
                timeDisplay.textContent = sec + ":0" + millSec;
            }else{
                millSec++;
                timeDisplay.textContent = sec + ":" + millSec;
            }

        }
        else{
            millSec = 0;
            sec++;
            timeDisplay.textContent = sec + ":00";
        }
    }, 10)
}

var statusBar = document.getElementById('gameState');
var statusText = document.getElementById('stateText');

statusText.textContent="Ready";

function mazeClick(square) {
    var targetSquare = square.target;

    if (targetSquare.classList.contains('startMaze')) {
        timeRun = true;
        timer();
        statusBar.removeAttribute('class');
        statusBar.setAttribute('class', 'runState');
        statusText.textContent="GO!";
    }
}

function mazeRun(square){
    var targetSquare = square.target;

    if(statusBar.classList.contains('runState')){
        if(targetSquare.classList.contains('blackSquare') ||
            targetSquare.classList.contains('border')){
            statusBar.removeAttribute('class');
            statusBar.setAttribute('class', 'failState');
            statusText.textContent="Fail";
            timeRun = false;
        }
        else if(targetSquare.classList.contains('endMaze')){
            statusBar.removeAttribute('class');
            statusBar.setAttribute('class', 'winState');
            statusText.textContent="Win!";
            timeRun = false;
        }
    }
}

function statusReset(){
        statusText.textContent = 'Ready';
        statusBar.removeAttribute('class');
        statusBar.setAttribute('class', 'waitState');
        timeDisplay.textContent = '0:00';
}

function controlEvent(button){
    var targetButton = button.target;

    if(targetButton.id == 'resetButton' || 'resetText'){
        statusReset();
    }
}

var playgrid = document.getElementById('playgrid');

playgrid.addEventListener('click', mazeClick, false);
playgrid.addEventListener('mousemove', mazeRun, false);
// playgrid.addEventListener('mouseout', mazeFail, false)

var infoPanel = document.getElementById('gameControls');
infoPanel.addEventListener('click', controlEvent, false);

var mazeSelector = document.getElementById('mazeSelector');
mazeSelector.addEventListener('click', mazeLoader, false);