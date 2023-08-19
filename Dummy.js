let sideData = document.querySelector(".data");
let rangeSlider = document.getElementById("myRange");
let checkboxes = document.querySelectorAll(".check");
let passwordData = document.querySelector(".data-container");
let copyData = document.querySelector(".copyContentMessage");

let UppperCase = document.getElementById("upperCase");
let LowerCase = document.getElementById("LowerCase");
let symbolCheck = document.getElementById("symbol");
let numberCheck = document.getElementById("number");
let generateButton = document.getElementsByClassName("generateBtn");
let symbols = "~`!#@$%^&*()_+[{]}|:;/.,";



let passLength = 10;
let password = "";
let checkBoxCount = 0;
handleSlider();


function handleSlider() {

    rangeSlider.value = passLength;
    sideData.innerText = passLength;
}

function getRandomInteger(min , max) {

    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomNumber() {

    return getRandomInteger(0 , passLength);
}

function getRandomSmallCharacter() {

    return String.fromCharCode(getRandomInteger(97 , 126));
}

function getRandomAlphaCharacter() {

    return String.fromCharCode(getRandomInteger(65 , 90 ))
}

function getRandomSymbol() {

    return symbols.charAt(getRandomInteger(0 , symbols.length));
}



rangeSlider.addEventListener('input',(e) => {

    passLength = e.target.value;
    handleSlider();

})

function hadleCheckBoxListener() {

    checkBoxCount = 0;
    checkboxes.forEach((box) => {

        if(box.checked)
          checkBoxCount++;
    })
}

console.log("checkbox count is ",checkBoxCount)

if(passLength < checkBoxCount) {

    passLength = checkBoxCount;
    handleSlider();
}


checkboxes.forEach((box) => {

    box.addEventListener("change", hadleCheckBoxListener);
})



generateButton[0].addEventListener("click",() => {

    if(checkBoxCount <= 0) return;

    if(passLength < checkBoxCount) {
        passLength = checkBoxCount;
        handleSlider();
    }

    password = "";


    //shuffle password function

    function shufflePassword(array) {

        //fisher yates method
        for(let i = array.length - 1; i > 0 ; i--){

            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        let str = "";
        array.forEach((el) => (str += el))
        return str;

    }
  

    let funcArr = [];

    if(UppperCase.checked)
        funcArr.push(getRandomAlphaCharacter);
    
    if(LowerCase.checked) {
        funcArr.push(getRandomSmallCharacter);
    }    

    if(numberCheck.checked) {
        funcArr.push(getRandomNumber);
    }

    if(symbolCheck.checked) {

        funcArr.push(getRandomSymbol);
    }


    for(let i=0; i<funcArr.length; i++) {

        password += funcArr[i]();
    }

    console.log("addition is done")
    //compulsory addition

    for(let i=0; i<passLength - funcArr.length; i++) {

        let randIndex = getRandomInteger(0 ,funcArr.length );
        password += funcArr[randIndex]();
    }

    //shuffle the password

    password = shufflePassword(Array.from(password));

    //showed the password

    passwordData.value = password;


});

async function copyContent() {

    try{

        await navigator.clipboard.writeText(passwordData.value);
        copyData.innerText = "copied"
    }catch(e) {

        copyData.innerText = "";
        
    } 

 
}



if(password)
    copyContent();