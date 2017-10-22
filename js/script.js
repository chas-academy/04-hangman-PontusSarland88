// Globala variabler

// Lista med spelets alla ord
var wordList = ['apa', 'katt', 'hund', 'fågel', 'val', 'fisk', 'spindel', 'insekt', 'orm', 'snigel', 'groda', 'padda', 'koala', 'krokodil'];
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var startTime; // Mäter tiden
var letterGuess;
var correctGuessCounter; //Räknar antalet rätta gissningar
var minutesLabel;
var secondsLabel;
var buttonColor = "#666";
var totalSeconds;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    disableButtons();
    document.querySelector("#startGameBtn").addEventListener('click', startGameBtn);
} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGameBtn(){
    restartGame();
    getRandomWord();
    generateBoxes();
    createHangman();
    startTime = setInterval(startTimer, 1000);
}

// Funktion som slumpar fram ett ord
function getRandomWord(){
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
function generateBoxes(){
    letterBoxes = document.querySelector("#letterList");
    removeLetterBoxes();    
    for (let i = 0; i < selectedWord.length; i++) {
        var li = document.createElement('li');          //Skapar ett nytt list element
        var input = document.createElement('input');    //Skapar ett nytt input element           
        input.setAttribute("type", "text");             //sätter attributen: type, disable och value
        input.setAttribute("disabled", "disabled");
        input.setAttribute("value", "");
        li.appendChild(input);                          //Lägger input elementet som en child till list elementet
        letterBoxes.appendChild(li);                      //Skriver ut det nya elementet         
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function checkGuess(letterGuess){
    var correctGuess = false;                                           //En bool som håller koll på om man gissat rätt
    var childNodes = document.getElementById("letterList").children;    //Hämta listan där boxarna skall vara.
    for(let i = 0; i < selectedWord.length; i++){                       //Loopar genom ordet för att kolla om den gissade bokstaven finns med i det korrekte ordet.
        if(letterGuess.toLowerCase() == selectedWord[i]){   
            correctGuess = true;
            correctGuessCounter++;                                      
            childNodes[i].firstChild.setAttribute("value", letterGuess); //Skriver ut den gissade bokstaven i rätt box.
            disableLetter(letterGuess, "lightgreen");
        }
    }
    
    if(correctGuess == false){
        hangmanImgNr++;
        createHangman();
        disableLetter(letterGuess, buttonColor); //Kallar på funktionen som "avaktiverar" bokstaven man gissat på
    }
    if(hangmanImgNr == 6 ){
        msgElem = "Game over! Du förlorade, det rätta ordet var: " + selectedWord.toUpperCase();
        gameOver();
    }
    if(correctGuessCounter == selectedWord.length){
        msgElem = "Grattis du vann, bra jobbat!";
        gameOver();
    }
}

// Funktionen ropas vid vinst eller förlust, meddelar spelaren om denne vunnit eller förlorat.
function gameOver(){
    disableButtons();
    setTimeout(function(){ window.alert(msgElem); }, 500); 
}
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function disableLetter(letterGuess, buttonColor){
    let allLetters = document.getElementsByClassName("btn btn--stripe");
    for(let i = 0; i < allLetters.length; i++){
      if(allLetters[i].innerHTML == letterGuess){
          allLetters[i].disabled = true;
          allLetters[i].style.backgroundColor = buttonColor;
          break; 
      }  
    };
}

function restartGame(){
    hangmanImgNr = 0;
    correctGuessCounter = 0;
    resetLetterButtons();
    totalSeconds = 0;
    clearInterval(startTime); 
}
//Gör alla bokstäver icke klickbara
function disableButtons(){
    let allLetters = document.getElementsByClassName("btn btn--stripe");
    for (let i = 1; i < allLetters.length; i++) {
        allLetters[i].disabled = true;
    }
}

//Gör så att alla knappar blir klickbara igen.
function resetLetterButtons(){
    let allLetters = document.getElementsByClassName("btn btn--stripe");
    for(let i = 0; i < allLetters.length; i++){
        if(allLetters[i].disabled == true){
            allLetters[i].disabled = false;
            allLetters[i].removeAttribute("style");
        }
    }    
}

//Tar bort alla boxar.
function removeLetterBoxes(){
    var letterBoxesToRemove = letterBoxes.querySelectorAll("li");
    if (letterBoxesToRemove.length > 0 || null) {
        for(let i = 0; i < letterBoxesToRemove.length; i++){
            let nodeToRemove = letterBoxesToRemove[i];
            letterBoxes.removeChild(nodeToRemove);
        }    
    }
}
//Skriver ut hangmanbilderna beroende på hur många fel man svarat.
function createHangman(){
    hangmanImg = document.querySelector("#hangman");    //hämtar img sektionen där hangman bilderna skall vara
    hangmanImg.setAttribute("src", "images/h"+hangmanImgNr+".png")
}

function startTimer(){
    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");
    if(hangmanImgNr != 6 && correctGuessCounter != selectedWord.length){
        ++totalSeconds;
        secondsLabel.innerHTML = setTimer(totalSeconds%60);
        minutesLabel.innerHTML = setTimer(parseInt(totalSeconds/60));
    }    
}
function setTimer(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}
