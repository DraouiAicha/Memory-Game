var buttonStart = document.getElementById("btn-start");
buttonStart.addEventListener('click', () => {
var score=document.getElementById("score");
var secs;
var Interval; 
const cards=document.querySelectorAll('.case');
let hasFlippedCard=false;
let lockBoard=false;
let firstCard,secondCard;
var dips1=document.getElementById("timer-display1");
var dips2=document.getElementById("timer-display2");
var easy=document.getElementById("easy");
var medium=document.getElementById("medium");
var hard=document.getElementById("hard");
var help=document.getElementById("help");
easy.addEventListener("click",()=>{
    dips1.style.visibility="visible";
    secs= document.getElementById("compteur1");
    help.style.visibility="visible";
});
help.addEventListener('click',()=>{
    helpic=document.querySelectorAll("[data-name='koala']");
    helpic[0].classList.add("turn");
    helpic[1].classList.add("turn");
})
medium.addEventListener("click",()=>{
    dips1.style.visibility="visible";
    secs= document.getElementById("compteur1");
});
hard.addEventListener("click",()=>{
    dips2.style.visibility="visible";
    secs= document.getElementById("compteur2");
});

clearInterval(Interval);
Interval = setInterval(diminuerCompteur, 1000);  
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
})


