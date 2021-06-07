var inputTownElements = document.querySelector(".inputs");
var addBtns = document.querySelector(".addButtons");
var resetBtns = document.querySelector(".resetBtns");
var displayTownElements = document.querySelector(".displayTowns");
var townss = document.querySelector(".towns");
var errorMsgs = document.querySelector(".errorMsgs");
var successMsgs = document.querySelector(".successm");

var userRegs = [];


if(localStorage['registrationD']) {
    userRegs = localStorage.getItem('registrationD').split(',')
}


var regInstances = registrationFactoryFunction();

// CREATING A FUNCTION THAT WILL DISPLAY REG NUMBERS
function displayRegNumbers(regs) {

    var regNumbers = document.createElement("p");

    regNumbers.className = 'regs';
    regNumbers.innerHTML = regs;

    displayTownElements.insertBefore(regNumbers, displayTownElements.firstChild);
    }
userRegs.forEach(displayRegNumbers);

function getUserRegs(){
    
   regs = inputTownElements.value;

    while (displayTownElements.firstChild) {
        displayTownElements.removeChild(displayTownElements.firstChild);
     }

    var pattern1 = /^((CY|CL|CA|CAA)\s\d ([0-9]){4})$/; 
    var pattern2 = /^((CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/;
    var pattern3 = /^((CY|CL|CA)\-([0-9]){6})$/;
    var pattern4 = /^((CY|CL|CA)\s([0-9]){6})$/;

    console.log("Testing validation format 1:  " +pattern1.test(regs))
    console.log("Testing validation format 2:  " + pattern2.test(regs))
    console.log("Testing validation format 3:  " +pattern3.test(regs))
    console.log("Testing validation format 4:  " +pattern4.test(regs))

    townLists = regInstances.caseFormat(regs);

    if (regs == "") {
        errorMsgs.classList.add('errors');
        errorMsgs.innerHTML =  "Please enter a valid registration.";

                setTimeout(function(){
                    errorMsgs.innerHTML = "";
                }, 3000)
            }

    townLists.forEach(function(regs){
        if (userRegs.includes(regs)){
          errorMsgs.classList.add('errors')

            errorMsgs.innerHTML ="Duplicate error!";
            
            setTimeout(function(){
                errorMsgs.innerHTML = "";
            }, 2000)      
        } else {
            if(regInstances.checkRegNumbers(regs)) {
                regInstances.regList(regs);
                        successMsgs.innerHTML = 'Entry succesful!';
                        setTimeout(function(){
                            successMsgs.innerHTML = "";
                        }, 3000) 
                    }else if(!regInstances.checkRegNumbers(regs)){
                        errorMsgs.classList.add('errors')

                        errorMsgs.innerHTML = "Incorrect format,please use correct format.";
                        
                        setTimeout(function(){
                            errorMsgs.innerHTML = "";
                        }, 3000)             
                  } 
            
        }


    })
 
    localStorage.setItem('registrationD', userRegs);
 
    inputTownElements.value = "";
    townss.selectedIndex = 0;

    userRegs.forEach(displayRegNumbers);
}
addBtns.addEventListener("click", getUserRegs)


townss.onchange = function() {

    while (displayTownElements.firstChild) {
        displayTownElements.removeChild(displayTownElements.firstChild);
        }
    
  
    var townFiltereds = townss.selectedIndex;

    var regAvailables = townss.options[townFiltereds].value;
    var noRegs = townss.value;

     var filterResultss = regInstances.registrations(regAvailables);
   
     if(regAvailables){
            if (filterResultss.length != 0) {
                filterResultss.forEach(displayRegNumbers);
                
            }
            else {
                displayTownElements.innerHTML =  "There are no registrations to display for this town";
            
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
    

    
    if(noRegs=='All'){
        while (displayTownElements.firstChild) {
            displayTownElements.removeChild(displayTownElements.firstChild);
        }
      
        userRegs.forEach(displayRegNumbers);
    }
}


function resets(){
    successMsgs.innerHTML = 'Application reset succesful!';
    setTimeout(function(){
        successMsgs.innerHTML = "";
    }, 3000) 
    displayTownElements .innerHTML = "";
    userRegs = [];
    localStorage['registrationD'] = userRegs;
    
}
resetBtns.addEventListener("click", resets)