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

function revealCard(nr){
    alert(nr);
}