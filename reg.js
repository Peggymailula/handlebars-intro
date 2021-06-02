
var inputTownElement = document.querySelector(".input");
var addBtn = document.querySelector(".addButton");
var resetBtn = document.querySelector(".resetBtn");
var displayTownElement = document.querySelector(".displayTown");
var towns = document.querySelector(".town");
var errorMsg = document.querySelector(".errorMsg");
var successMsgElement = document.querySelector(".success");

var userReg = [];


if(localStorage['registration']) {
    userReg = localStorage.getItem('registration').split(',')
}


var regInstance = registrationFactoryFunction();

// CREATING A FUNCTION THAT WILL DISPLAY REG NUMBERS
function displayRegNumbers(reg) {

    var regNumber = document.createElement("p");

    regNumber.className = 'reg';
    regNumber.innerHTML = reg;

    displayTownElement.insertBefore(regNumber, displayTownElement.firstChild);
    }
userReg.forEach(displayRegNumbers);


function getUserReg(){
    
   reg = inputTownElement.value;

    while (displayTownElement.firstChild) {
        displayTownElement.removeChild(displayTownElement.firstChild);
     }

    var pattern1 = /^((CY|CL|CA|CAA)\s\d ([0-9]){4})$/; 
    var pattern2 = /^((CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/;
    var pattern3 = /^((CY|CL|CA)\-([0-9]){6})$/;
    var pattern4 = /^((CY|CL|CA)\s([0-9]){6})$/;

    console.log("Testing validation format 1:  " +pattern1.test(reg))
    console.log("Testing validation format 2:  " + pattern2.test(reg))
    console.log("Testing validation format 3:  " +pattern3.test(reg))
    console.log("Testing validation format 4:  " +pattern4.test(reg))

    townList = regInstance.caseFormat(reg);

    if (reg == "") {
        errorMsg.classList.add('errors');
        errorMsg.innerHTML =  "Please enter a valid registration.";

                setTimeout(function(){
                    errorMsg.innerHTML = "";
                }, 3000)
            }

    townList.forEach(function(reg){
        if (userReg.includes(reg)){
          errorMsg.classList.add('errors')

            errorMsg.innerHTML ="Duplicate error!";
            
            setTimeout(function(){
                errorMsg.innerHTML = "";
            }, 2000)      
        } else {
            if(regInstance.checkRegNumbers(reg)) {
                        regInstance.regList(reg);
                        successMsgElement.innerHTML = 'Entry succesful!';
                        setTimeout(function(){
                            successMsgElement.innerHTML = "";
                        }, 3000) 
                    }
            
        }


    })
 
    localStorage.setItem('registration', userReg);
 
    inputTownElement.value = "";
    towns.selectedIndex = 0;

    userReg.forEach(displayRegNumbers);
}
addBtn.addEventListener("click", getUserReg)


towns.onchange = function() {

    while (displayTownElement.firstChild) {
        displayTownElement.removeChild(displayTownElement.firstChild);
        }
    
  
    var townFiltered = towns.selectedIndex;

    var regAvailable = towns.options[townFiltered].value;
    var noReg = towns.value;

     var filterResults = regInstance.registrations(regAvailable);
   
     if(regAvailable){
            if (filterResults.length != 0) {
                filterResults.forEach(displayRegNumbers);
                
            }
            else {
                displayTownElement.innerHTML =  "There are no registrations to display for this town";
            
        }
            // console.log(newArray)
            // displayTownElement.innerHTML =  "There are no registrations to display for this town";

        
        // else {
        //     filterResults.forEach(displayRegNumbers);
        // }
            // displayTownElement.innerHTML =  "There are no registrations to display for this town";
        }
     

    // if(regAvailable){
    //     filterResults.forEach(displayRegNumbers);
    //   //  console.log( filterResults.forEach(displayRegNumbers))
    // }
    

    
    if(noReg=='All'){
        while (displayTownElement.firstChild) {
            displayTownElement.removeChild(displayTownElement.firstChild);
        }
      
        userReg.forEach(displayRegNumbers);
    }
}


function reset(){
    successMsgElement.innerHTML = 'Application reset succesful!';
    setTimeout(function(){
        successMsgElement.innerHTML = "";
    }, 3000) 
    displayTownElement.innerHTML = "";
    userReg = [];
    localStorage['registration'] = userReg;
    
}
resetBtn.addEventListener("click", reset)


