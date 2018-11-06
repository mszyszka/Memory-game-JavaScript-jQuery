
//Lets create array with 12 colors(colors[])
//Lets create empty array for random placed colors(colorsRandomly[])
//From colors[] take element with random index(randomIndex) that is betwen 0 and actual colors.length
//From colors[] delete elment with random index(randomIndex)
//To the empty array(colorsRandomly[]) add element from colors[] that have index randomIndex
//Repeat proces while colorsRandomly[] length != 12 or == 12


//Muszę poinformować kod, że jeśli inedex firstColor == indexowi secondColor(została naciśnięta dwa razy ta sama karta) to
//nie uruchamiamy funkcji revealCard tylko czekamy na naciśnięcie kolejnej kart

const colorsRandomly = {
    colors: []
}
// let colorsRandomly = [];

function setColorsRandomly() {

    let colors = ["#d60d0d", "#0d76d6", "#11b456", "#42df1f", "#df1f9d", "#e3da0e", "#d60d0d", "#0d76d6", "#11b456", "#42df1f", "#df1f9d", "#e3da0e"];

    while(colorsRandomly.colors.length != 12){
    
    //actual length of colors.array
    let colorsLength = colors.length;

    let randomIndex = Math.floor((Math.random()*colorsLength));
    // console.log(randomIndex);

    //Save item with randomIndex index from colors array
    let itemFromColors = colors[randomIndex];
    // console.log(colors);

    //To colorsRandomly array add item from colors array that have randomIndex index
    colorsRandomly.colors.push(itemFromColors);

    //From colors array remove element with randomIndex
    //so it can't be drawn out again
    colors.splice(randomIndex,1);

    }
}

setColorsRandomly();

// const i0 = document.getElementById('i0');
// const i1 = document.getElementById('i1');
// const i2 = document.getElementById('i2');
// const i3 = document.getElementById('i3');
// const i4 = document.getElementById('i4');
// const i5 = document.getElementById('i5');
// const i6 = document.getElementById('i6');
// const i7 = document.getElementById('i7');
// const i8 = document.getElementById('i8');
// const i9 = document.getElementById('i9');
// const i10 = document.getElementById('i10');
// const i11 = document.getElementById('i11');

// i0.addEventListener('click', function() { revealCard(0); });
// i1.addEventListener('click', function() { revealCard(1); });
// i2.addEventListener('click', function() { revealCard(2); });
// i3.addEventListener('click', function() { revealCard(3); });
// i4.addEventListener('click', function() { revealCard(4); });
// i5.addEventListener('click', function() { revealCard(5); });
// i6.addEventListener('click', function() { revealCard(6); });
// i7.addEventListener('click', function() { revealCard(7); });
// i8.addEventListener('click', function() { revealCard(8); });
// i9.addEventListener('click', function() { revealCard(9); });
// i10.addEventListener('click', function() { revealCard(10); });
// i11.addEventListener('click', function() { revealCard(11); });

function getGameItemElements() {
    //Take elements with game-item class
    const gameItems = document.getElementsByClassName('game-item');
    // console.log(gameItems);

    //add to them addEventListener that onclick triger revealCard(i)
    for(let i = 0; i < gameItems.length; i++) {
        gameItems[i].addEventListener('click', function() { revealCard(i); });
    }
} 

getGameItemElements();


//Object with variables/properties that are needed by revealCard(), hidePair() and restorePair()
const variables = {
    //if no card is expose variables.oneVisible = false;
    oneVisible: false,
    //We need to save number of turns
    turnCounter: 0,
    firstColor: 0,
    //We are using lock to manipulete revealCard() execution
    lock: false,
    pairsLeft: 6,
    secondColor: 0
}

function revealCard(nr){
    
    //save opacity value from pointed card
    let opacityValue = $('#i' + nr).css('opacity');

    if(opacityValue != 0 && variables.lock == false)
    {
        variables.lock = true;
        //color for background-color atribute
        let color = colorsRandomly.colors[nr];

        $('#i' + nr).css('background-color', color);
        $('#i' + nr).addClass('game-item-active');

        //check if the exposed card is the first one that was exposed
        //if variables.oneVisible = false, card is first exposed card
        if(variables.oneVisible == false) 
        {
            //FIRST CARD
            //we want set oneVisible to true to inform program that one card is already exposed
            variables.oneVisible = true;
            variables.firstColor = nr;

            variables.lock = false;

        } 
        else
        {
            //SECOND CARD
            //update turn counter becouse user exposed 2 cards that mean 1 turn
            variables.turnCounter++;
            $('.counter').html('Turn counter: ' + variables.turnCounter);

            //change variables.oneVisible to fals becouse now 2 cards are exposed
            variables.oneVisible = false;
            
            variables.secondColor = nr;

            if(colorsRandomly.colors[variables.firstColor] == colorsRandomly.colors[variables.secondColor] 
            //firstColor index in colors[] can't be same as secondColor index in colors[], if it is, that mean user clicked twice on the same card
            //with'out this condition, code will execute hit scenario when user clicked twice on the same card
            && colorsRandomly.colors.indexOf(variables.firstColor) != colorsRandomly.colors.indexOf(variables.firstColor)) 
            {
                //hit
                setTimeout(function() { hidePair(variables.firstColor, variables.secondColor) }, 750);
            } 
            else 
            {
                //mishit
                setTimeout(function() { restorePair(variables.firstColor, variables.secondColor) }, 1000);

            }
        }
    }
    
}

function hidePair(nr1, nr2) {
    $('#i'+nr1).css('opacity', '0');
    $('#i'+nr1).css('cursor', 'default');

    $('#i'+nr2).css('opacity', '0');
    $('#i'+nr2).css('cursor', 'default');
    variables.lock = false;

    variables.pairsLeft--;

    if(variables.pairsLeft == 0){
        $('.container').css('display', 'block');
        $('.container').html('<h1 class="win-info">You did it in </br> ' + variables.turnCounter + '</br> turns</h1></br><button class="play-again">Play again</button>');
        $('.play-again').css('display', 'block');
        $('.play-again').on('click', function() {
            document.location.reload();
        });

        $('.counter').css('display', 'none');
    }

}


//I was trying to pass object property as argument to restorePair()
//but I can't do this so I'm writing it to this variables.
let variablesFirstColor = variables.firstColor;
let variablesSecondColor = variables.secondColor;


function restorePair(variablesFirstColor, variablesSecondColor) {
    $('#i' + variablesFirstColor).css('background-color', '#ffffff');
    $('#i' + variablesFirstColor).removeClass('game-item-active');

    $('#i' + variablesSecondColor).css('background-color', '#ffffff');
    $('#i' + variablesSecondColor).removeClass('game-item-active');
    variables.lock = false;

}

