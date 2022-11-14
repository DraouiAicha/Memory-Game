var score=document.getElementById("score");
var secs = document.getElementById("compteur");
var buttonStart = document.getElementById("btn-start");
var Interval; 

const cards=document.querySelectorAll('.case');
let hasFlippedCard=false;
let lockBoard=false;
let firstCard,secondCard;

buttonStart.addEventListener('click', () => {
    clearInterval(Interval);
    Interval = setInterval(diminuerCompteur, 1000);  
});
function diminuerCompteur(){
    var compteur = Number(secs.textContent);
    if (compteur > 1) 
    {
        secs.textContent = compteur - 1;
    } 
    else 
    {
        alert("you lose");
    }
}



function flipCard()
{
    if(lockBoard) return;
    if(this===firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard)
    {
        //first click
        hasFlippedCard=true;
        firstCard=this;
    }
    else
    {
        //second click
        secondCard=this;
        checkForMatch();
    } 
}
function checkForMatch()
{
    let isMatch=firstCard.dataset.name===secondCard.dataset.name;
    if(isMatch)
    {
        disableCards();
        var countScore=Number(score.textContent);
        score.textContent=countScore+1;
        if(score.textContent==6)
        {
            alert("Winner winner chicken dinner");
        }
    }
    else
    {
        unflipCards();
    }
}
function disableCards()
{
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard()
}
function unflipCards()
{
    lockBoard=true;
    setTimeout(()=>
    {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },800);
}
function resetBoard()
{
    [hasFlippedCard,lockBoard]=[false, false];
    [firstCard,secondCard]=[null,null];
}
(function shuffle()
{
    cards.forEach(card=>
        {
            let randomPos=Math.floor(Math.random()*12);
            card.style.order=randomPos;
        })
})();

cards.forEach(card => card.addEventListener('click',flipCard));

