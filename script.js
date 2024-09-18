let passWordLength = document.querySelector(".count");
let slider = document.querySelector(".slider");
let genbtn = document.querySelector(".genButton");
let inputBox = document.querySelector(".inputBox");
let lowercaseBox = document.querySelector("#Lowercase");
let uppercaseBox = document.querySelector("#upperCase");
let numberBox = document.querySelector("#Numbers");
let symbolBox = document.querySelector("#Symbols");
let allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
let copyButton = document.querySelector(".inputContainer button");
let copyMsg = document.querySelector(".data-copyMsg");
let indicator = document.querySelector(".indicator");

// initialiation
let password_length_no = 10;
uppercaseBox.checked = true;
let checkCount = 1;



// slider updation
slider.addEventListener('input' , () => {
        passWordLength.innerText = slider.value;
        password_length_no = slider.value;
        const min = slider.min;
        const max = slider.max;
        slider.style.backgroundSize = ( (password_length_no - min)*100/(max - min)) + "% 100%"
})

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*"; 




function getRandomInteger(){
        return allNumbers[Math.floor(Math.random() * 10)];
}
function getRandomUppercase(){
        return upperChars[Math.floor(Math.random() * 26)];
}
function getRandomLowercase(){
        return lowerChars[Math.floor(Math.random() * 26)];
}
function getRandomSymbol(){
        return allSymbols[Math.floor(Math.random() * allSymbols.length)];
}

// counting checkbox checked
function checkCountBox(){
        checkCount = 0;
        allCheckBoxes.forEach((checkBox) =>{
                if(checkBox.checked){
                        checkCount++;
                }
        })

        if(password_length_no < checkCount){
                password_length_no = checkCount;
                passWordLength.innerText = checkCount;
                slider.value = checkCount;

        }
  
}

allCheckBoxes.forEach((checkBox) => {
        checkBox.addEventListener('click',checkCountBox);
})


// for copying msg
async function copyContent(){
        try{
                await navigator.clipboard.writeText(inputBox.value);
                copyMsg.innerText = "copied";
        }
        catch(e){
                copyMsg.innerText = "Failed";
        }

        // to make copy wala msg visible
        copyMsg.classList.add("active");

        setTimeout( () => {
                copyMsg.classList.remove("active");
                copyMsg.innerText = "";
        },1000);
}

copyButton.addEventListener('click', () => {
        if(inputBox.value){
                copyContent();
        }
})


// password generation
genbtn.addEventListener('click', () => {
        if(checkCount <= 0) return;

        if(password_length_no < checkCount){
                password_length_no = checkCount;
                passWordLength.innerText = checkCount;
                slider.value = checkCount;
        }

        passwordGenerator();
        checkStrength();
      
        
})


function passwordGenerator(){
       
        let genPassword = "";

        let funcArr = [];
        if(numberBox.checked){
                funcArr.push(getRandomInteger);
        }
        if(uppercaseBox.checked){
                funcArr.push(getRandomUppercase);
        }
        if(lowercaseBox.checked){
                funcArr.push(getRandomLowercase);
        }
        if(symbolBox.checked){
                funcArr.push(getRandomSymbol);
        }

        // compulsory addition
        for(let i=0;i<funcArr.length;i++){   
                genPassword += funcArr[i]();
        }

        // remaining addition
        for(let i=0;i<password_length_no - funcArr.length;i++){
                let randIndex = Math.floor(Math.random() * funcArr.length);
   
                genPassword += funcArr[randIndex]();
        }
        console.log(genPassword);
        inputBox.value = genPassword;
}

function setIndicator(color){
        indicator.style.backgroundColor = color;
        indicator.style.boxShadow = `0px 0px 15px ${color}`
}

// checking strength of password
function checkStrength(){
        if(uppercaseBox.checked && lowercaseBox.checked && password_length_no >=8){
                setIndicator("#32de84");
        }
        if(uppercaseBox.checked && lowercaseBox.checked && numberBox.checked && symbolBox.checked && password_length_no >=8){
                setIndicator("#E32636");
        }
} 


