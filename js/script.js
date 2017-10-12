// Globala variabler

// Lista med spelets alla ord
var wordList = ['apa', 'katt', 'hund', 'fågel', 'val', 'fisk', 'spindel', 'insekt', 'orm', 'snigel', 'groda', 'padda', 'koala', 'krokodil'];
var selectedWord; // Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImg; //Bild som kommer vid fel svar
var hangmanImgNr; // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn; // Knappen du startar spelet med
var letterButtons; // Knapparna för bokstäverna
var startTime; // Mäter tiden
var playerLife;
var letterGuess;

// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd
// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
    document.querySelector("#startGameBtn").addEventListener('click', startGameBtn);
    //document.querySelector("#letterButtons").addEventListener('click', checkGuess); //Dett behövs inte så länge jag använder OnClick på mina knappar.
    
} // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
function startGameBtn(){
    restartGame();
    getRandomWord();
    generateBoxes();
    document.getElementById("message").innerHTML = selectedWord;
}

// Funktion som slumpar fram ett ord
function getRandomWord(){
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
function generateBoxes(){
    var displayUl = document.querySelector("#letterList");
    for (let i = 0; i < selectedWord.length; i++) {
        var li = document.createElement('li');          //Skapar ett nytt list element
        var input = document.createElement('input');    //Skapar ett nytt input element           
        input.setAttribute("type", "text");             //sätter attributen: type, disable och value
        input.setAttribute("disabled", "disabled");
        input.setAttribute("value", "");
        li.appendChild(input);                          //Lägger input elementet som en child till list elementet
        displayUl.appendChild(li);                      //Skriver ut det nya elementet         
    }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
function checkGuess(letterGuess){
    disableLetter(letterGuess);                                         //Kallar på funktionen som "avaktiverar" bokstaven man gissat på
    var correctGuess = false;                                           //En bool som håller koll på om man gissat rätt
    var childNodes = document.getElementById("letterList").children;    //Hämta listan med boxar.
    for(let i = 0; i < selectedWord.length; i++){                       //Loopar genom ordet för att kolla om den gissade bokstaven finns med i det korrekte ordet.
        if(letterGuess.toLowerCase() == selectedWord[i]){   
            correctGuess = true;                                        
            childNodes[i].firstChild.setAttribute("value", letterGuess); //Skriver ut den gissade bokstaven i rätt box.
        }
    }
    if(correctGuess == false){
        playerLife++;
        createHangman();
    }
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
function disableLetter(letterGuess){
    //TODO: Disable the guessed letter! Om gissningar är på max så aktiveras alla automatiskt eller så sker detta vid start av nytt spel.
    let allLetters = document.getElementsByClassName("btn btn--stripe");
    for(let i = 0; i < allLetters.length; i++){
      if(allLetters[i].innerHTML == letterGuess){
          allLetters[i].disabled = true;
          break; 
      }  
    };
}

function restartGame(){
    playerLife = 0;
    //En funktion som återställer allt.
}
function createHangman(){
    debugger;
    hangmanImg = document.querySelector("#hangman");
    // var img = document.createElement("img");
    // img.src = "images/h[playerLife].png";
    
    hangmanImg.setAttribute("src", "images/h"+playerLife+".png")

}