const items = ["#d60d0d", "#0d76d6", "#11b456", "#42df1f", "#df1f9d", "#e3da0e", "#d60d0d", "#0d76d6", "#11b456", "#42df1f", "#df1f9d", "#e3da0e"];

const i0 = document.getElementById('i0');
const i1 = document.getElementById('i1');
const i2 = document.getElementById('i2');
const i3 = document.getElementById('i3');
const i4 = document.getElementById('i4');
const i5 = document.getElementById('i5');
const i6 = document.getElementById('i6');
const i7 = document.getElementById('i7');
const i8 = document.getElementById('i8');
const i9 = document.getElementById('i9');
const i10 = document.getElementById('i10');
const i11 = document.getElementById('i11');

i0.addEventListener('click', function() { revealCard(0); });
i1.addEventListener('click', function() { revealCard(1); });
i2.addEventListener('click', function() { revealCard(2); });
i3.addEventListener('click', function() { revealCard(3); });
i4.addEventListener('click', function() { revealCard(4); });
i5.addEventListener('click', function() { revealCard(5); });
i6.addEventListener('click', function() { revealCard(6); });
i7.addEventListener('click', function() { revealCard(7); });
i8.addEventListener('click', function() { revealCard(8); });
i9.addEventListener('click', function() { revealCard(9); });
i10.addEventListener('click', function() { revealCard(10); });
i11.addEventListener('click', function() { revealCard(11); });

let oneVisible = false;
let turnCounter = 0;
let firsItem;
let lock = false;
let pairsLeft = 6;

function revealCard(nr){
    
    let opacityValue = $('#i' + nr).css('opacity');

    if(opacityValue != 0 && lock == false)
    {
        lock = true;
        //color for background-color atribute
        let color = items[nr];

        $('#i' + nr).css('background-color', color);
        $('#i' + nr).addClass('game-item-active');

        if(oneVisible == false) 
        {
            //first card
            oneVisible = true;
            firsItem = nr;
            lock = false;

        } 
        else
        {
            //second card
            turnCounter++;
            $('.counter').html('Turn counter: ' + turnCounter);

            oneVisible = false;
            let secondItem = nr;

            if(items[firsItem] == items[secondItem])
            {
                //hit
                setTimeout(function() { hidePair(firsItem, secondItem) }, 750);
            } 
            else 
            {
                //mishit
                setTimeout(function() { restorePair(firsItem, secondItem) }, 1000);

            }
        }
    }
    
}

function hidePair(nr1, nr2) {
    $('#i'+nr1).css('opacity', '0');
    $('#i'+nr1).css('cursor', 'default');

    $('#i'+nr2).css('opacity', '0');
    $('#i'+nr2).css('cursor', 'default');
    lock = false;

    pairsLeft--;

    if(pairsLeft == 0){
        $('.container').css('display', 'block');
        $('.container').html('<h1 class="win-info">You did it in </br> ' + turnCounter + '</br> turns</h1></br><button class="play-again">Play again</button>');
        $('.play-again').css('display', 'block');
        $('.play-again').on('click', function() {
            document.location.reload();
        });

        $('.counter').css('display', 'none');
    }

}

function restorePair(firsItem, secondItem) {
    $('#i' + firsItem).css('background-color', '#ffffff');
    $('#i' + firsItem).removeClass('game-item-active');

    $('#i' + secondItem).css('background-color', '#ffffff');
    $('#i' + secondItem).removeClass('game-item-active');
    lock = false;

}