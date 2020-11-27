const inputBtns=document.querySelectorAll("button");
const clearBtn=document.getElementById("clear-btn"); 
const calculatorDisplay=document.querySelector("h1");


let firstValue=0;
let operatorValue="";
let awaitingNextValue=false;



function sentItemsDisplay(number){
    //replace current display when a operator is pressed
   if(awaitingNextValue){
       calculatorDisplay.innerText=number;
       awaitingNextValue=false;
   }else{
      const displayValue=calculatorDisplay.innerText;
      calculatorDisplay.innerText= displayValue==="0" ? number : displayValue+number;
   }
}

function addDecimal(){
    //if operator is pressed dont add decimal 
    if(awaitingNextValue) return;  // the lines will get executed if the condition is false(if there is no awaiting vaule)
   // if no decimal, add one
    if(!calculatorDisplay.innerText.includes(".")) {
     calculatorDisplay.innerText=`${calculatorDisplay.innerText}.`;
 } 
}


//👇 create a calculation object to store and access function for each operators

const calculation={
    "/": (firstNumber,secondNumber) => firstNumber/secondNumber,

    "*": (firstNumber,secondNumber) => firstNumber*secondNumber,

    "+": (firstNumber,secondNumber) => firstNumber+secondNumber,

    "-": (firstNumber,secondNumber) => firstNumber-secondNumber,

    "=": (firstNumber,secondNumber) => secondNumber,
}


function useOperator(operator){
    // calculatorDisplay.innerText is a string we must change it to number
    const currentValue=Number(calculatorDisplay.innerText);

    //to prevent multiple operators
    if(operatorValue && awaitingNextValue) {
       operatorValue = operator;
       return;//omit the remaining
    }

    //assign first value if no value
    if(!firstValue) {
      firstValue=currentValue;
    }
    else{
        console.log(firstValue+operatorValue+currentValue)
        const calculate=calculation[operatorValue](firstValue, currentValue);
        calculatorDisplay.innerText=calculate;
        firstValue=calculate;
    }
    //ready to store next value
    awaitingNextValue=true;
    operatorValue = operator;
}

//add eventlisenters for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
 if(inputBtn.classList.contains("number")){
 inputBtn.addEventListener("click",()=>sentItemsDisplay(inputBtn.value))
 } else if(inputBtn.classList.contains("operator")){
    inputBtn.addEventListener("click",()=>useOperator(inputBtn.value))
  } else if(inputBtn.classList.contains("decimal")){
    inputBtn.addEventListener("click",addDecimal)
   }
});


//reset the display and values when the clear button is pressed


function clearAll(){
    firstValue=0;
    operatorValue="";
    awaitingNextValue=false;
    calculatorDisplay.innerText='0';
}




//event listener for clear
clearBtn.addEventListener("click", clearAll);
