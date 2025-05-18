function mazeFile(mazeName, mazeMap, highScores) {
    this.mazeName = mazeName;
    this.mazeMap = mazeMap;
    this.highScores = highScores;
}

var mazeList = new Array();
var currentMaze = 0;

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

    [['Mike','Bill','Peter','Michael','---'],
    [4,5,7,8,99],
    [15,2,2,2,99]]
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

mazeList.push(new mazeFile(
    'Wiggly',

    [[0,0,0,0,0,0,0,0,0,3],
    [0,1,1,1,1,1,1,1,1,1],
    [0,0,1,0,0,0,1,0,0,0],
    [1,0,0,0,1,0,0,0,1,0],
    [1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,0,0,0,1,0,0],
    [0,1,0,0,0,1,0,0,0,1],
    [0,1,1,1,1,1,1,1,1,1],
    [0,1,0,0,0,1,0,0,0,1],
    [0,0,0,1,0,0,0,1,0,2]],

    [['Ray','Frank','Roy','Jimmy','Bunk'],
    [5,6,6,8,11],
    [90,74,92,6,14]]
));

mazeList.push(new mazeFile(
    'Meander',

    [[0,0,0,1,1,0,0,0,0,3],
    [0,1,0,0,0,0,1,1,1,1],
    [0,0,1,0,1,1,1,0,0,0],
    [1,0,0,1,1,0,0,0,1,0],
    [1,1,0,1,0,0,1,1,1,0],
    [1,0,0,1,0,1,0,0,0,0],
    [0,0,1,1,0,1,0,1,1,1],
    [0,1,1,1,0,1,0,0,0,1],
    [0,0,0,1,0,1,1,1,0,1],
    [1,1,0,0,0,1,1,1,0,2]],

    [['Robert','Ian','Greg','Michael','Peter'],
    [5,6,7,9,9],
    [45,15,1,65,87]]
));

mazeList.push(new mazeFile(
    'Snake',

    [[0,0,0,0,1,1,3,0,0,1],
    [0,1,1,0,0,0,1,1,0,1],
    [0,0,0,1,1,0,1,1,0,0],
    [1,1,0,1,1,0,0,0,1,0],
    [1,1,0,0,0,1,1,0,1,0],
    [1,1,1,1,0,1,1,0,0,0],
    [0,0,2,1,0,0,0,1,1,1],
    [0,1,1,1,1,1,0,0,0,0],
    [0,1,0,0,0,0,1,1,1,0],
    [0,0,0,1,1,0,0,0,0,0]],

    [['George','Bernie','William','Eddie','Maceo'],
    [3,4,5,6,8],
    [98,15,91,58,7]]
));

titleLoader(mazeList[0].mazeName);
gameBoardLoader(mazeList[0].mazeMap);
highScoresLoader(mazeList[0].highScores);

function mazeSelectorLoader(){
    var mazeSelectorElement = document.getElementById('mazeSelector');

    while(mazeSelectorElement.firstElementChild){
        mazeSelectorElement.removeChild(mazeSelectorElement.firstElementChild);
    }

    for(var i = 0; i < mazeList.length; i++){
        var tempMazeOption = document.createElement('div');
        var tempMazeOverlay = document.createElement('div');
        var tempTitle = document.createElement('h2');
        var tempMiniMaze = document.createElement('div');
        
        tempMazeOverlay.setAttribute('class', 'overlayButton');
        tempMazeOverlay.setAttribute('mapIndex', i);
        tempMazeOption.appendChild(tempMazeOverlay);

        tempTitle.setAttribute('class', 'mazeOptionTitle');
        tempTitle.textContent = mazeList[i].mazeName;
        tempMazeOption.appendChild(tempTitle);

        tempMiniMaze.setAttribute('class', 'miniMaze');
        for(var x = 0; x < 10; x++){
            for(var y = 0; y < 10; y++){
                var tempSquare = document.createElement('div');
                if(mazeList[i].mazeMap[x][y] == 0){
                    tempSquare.setAttribute('class', 'whiteSquare');
                }
                else if(mazeList[i].mazeMap[x][y] == 1){
                    tempSquare.setAttribute('class', 'blackSquare');
                }
                else if(mazeList[i].mazeMap[x][y] == 2){
                    tempSquare.setAttribute('class', 'startMaze');
                }
                else{
                    tempSquare.setAttribute('class', 'endMaze');
                }
                tempMiniMaze.appendChild(tempSquare);
            }
        }
        tempMazeOption.appendChild(tempMiniMaze);

        tempMazeOption.setAttribute('class', 'mazeOption');
        mazeSelectorElement.appendChild(tempMazeOption);
    }
}

mazeSelectorLoader();

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
    currentMaze = index;
    titleLoader(mazeList[index].mazeName);
    gameBoardLoader(mazeList[index].mazeMap);
    highScoresLoader(mazeList[index].highScores);
    statusReset();
}

var timeRun = false;
var timeDisplay = document.getElementById('timeElapsed');

var millSec = 0;
var sec = 0;

function timer(){
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
        statusReset();
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
            checkScore();
        }
    }
}

function setVisibility(elementTarget, displayType){
    var targetElement = document.getElementById(elementTarget);
    targetElement.style.display = displayType;
}

function checkScore() {
    if(((sec *100) +  millSec) < ((mazeList[currentMaze].highScores[1][4] * 100) + mazeList[currentMaze].highScores[2][4])){
        setVisibility('highScores', 'none');
        setVisibility('saveScore', 'grid');
        var inputForName = document.getElementById('playerName');
        inputForName.value = '';
    }
}

function saveScore(){
    var nameField = document.getElementById('playerName');
    var nameInput = document.getElementById('playerName').value;
    if(nameInput == ''){
        nameInput = '---';
        for(var i = 3; i >= 0; i--){
            if(((sec *100) +  millSec) > ((mazeList[currentMaze].highScores[1][i] * 100) + mazeList[currentMaze].highScores[2][i])){
                mazeList[currentMaze].highScores[0].splice(i + 1, 0, nameInput);
                mazeList[currentMaze].highScores[1].splice(i + 1, 0, sec);
                mazeList[currentMaze].highScores[2].splice(i + 1, 0, millSec);

                mazeList[currentMaze].highScores[0].pop();
                mazeList[currentMaze].highScores[1].pop();
                mazeList[currentMaze].highScores[2].pop();
                highScoresLoader(mazeList[currentMaze].highScores);
                statusReset();
                break;
            }
            else if(i == 0){
                mazeList[currentMaze].highScores[0].splice(i, 0, nameInput);
                mazeList[currentMaze].highScores[1].splice(i, 0, sec);
                mazeList[currentMaze].highScores[2].splice(i, 0, millSec);

                mazeList[currentMaze].highScores[0].pop();
                mazeList[currentMaze].highScores[1].pop();
                mazeList[currentMaze].highScores[2].pop();
                highScoresLoader(mazeList[currentMaze].highScores);
                statusReset();
            }
        }
    }
    else{
        for(var i = 3; i >= 0; i--){
            if(((sec *100) +  millSec) > ((mazeList[currentMaze].highScores[1][i] * 100) + mazeList[currentMaze].highScores[2][i])){
                mazeList[currentMaze].highScores[0].splice(i + 1, 0, nameInput);
                mazeList[currentMaze].highScores[1].splice(i + 1, 0, sec);
                mazeList[currentMaze].highScores[2].splice(i + 1, 0, millSec);

                mazeList[currentMaze].highScores[0].pop();
                mazeList[currentMaze].highScores[1].pop();
                mazeList[currentMaze].highScores[2].pop();
                highScoresLoader(mazeList[currentMaze].highScores);
                statusReset();
                break;
            }
            else if(i == 0){
                mazeList[currentMaze].highScores[0].splice(i, 0, nameInput);
                mazeList[currentMaze].highScores[1].splice(i, 0, sec);
                mazeList[currentMaze].highScores[2].splice(i, 0, millSec);

                mazeList[currentMaze].highScores[0].pop();
                mazeList[currentMaze].highScores[1].pop();
                mazeList[currentMaze].highScores[2].pop();
                highScoresLoader(mazeList[currentMaze].highScores);
                statusReset();
            }
        }
    }
    setVisibility('highScores', 'grid');
    setVisibility('saveScore', 'none');
}

function cancelSave(){
    statusReset();
}

function statusReset(){
        statusText.textContent = 'Ready';
        statusBar.removeAttribute('class');
        statusBar.setAttribute('class', 'waitState');
        timeDisplay.textContent = '0:00';
        sec = 0;
        millSec = 0;
        setVisibility('highScores', 'grid');
        setVisibility('saveScore', 'none');
}

function hideInfo(){
    var infoBox = document.getElementById('infoDisplay');
    infoBox.style.display = 'none';
}

function controlEvent(button){
    var targetButton = button.target;

    if(targetButton.id == 'resetButton' || 
        targetButton.id == 'resetText'){
        statusReset();
    }
    if(targetButton.id == 'infoText' || targetButton.id == 'info'){
        var infoBox = document.getElementById('infoDisplay');
        infoBox.style.display = 'block';
    }
}
function checkInput(key){
    if(key.key == 'Enter'){
        saveScore();
    }
}

var playgrid = document.getElementById('playgrid');

playgrid.addEventListener('click', mazeClick, false);
playgrid.addEventListener('mousemove', mazeRun, false);

var infoPanel = document.getElementById('gameControls');
infoPanel.addEventListener('click', controlEvent, false);

var mazeSelector = document.getElementById('mazeSelector');
mazeSelector.addEventListener('click', mazeLoader, false);

var infoDismiss = document.getElementById('infoDismiss');
infoDismiss.addEventListener('click', hideInfo, false);

var cancelButton = document.getElementById('cancelSaveButton');
cancelButton.addEventListener('click', cancelSave, false);

var saveButton = document.getElementById('saveScoreButton');
saveButton.addEventListener('click', saveScore, false);

var nameInput = document.getElementById('playerName');
nameInput.addEventListener('keypress', checkInput, false);