var inputTownElementT = document.querySelector(".inputT");
var addBtnT = document.querySelector(".addButtonT");
var resetBtnT = document.querySelector(".resetBtnT");
var displayTownElementT = document.querySelector(".displayTownT");
var townsT = document.querySelector(".townT");
var errorMsgT = document.querySelector(".errorMsgT");
var successMsgT = document.querySelector(".successT");
var registrationTemplate = document.querySelector(".userTemplate").innerHTML;
var template = Handlebars.compile(registrationTemplate);

var userTemp = [];


if(localStorage['Template']) {
    userTemp = localStorage.getItem('Template').split(',')
}


var regInstanceT = TemplateFactoryFunction();

// CREATING A FUNCTION THAT WILL DISPLAY REG NUMBERS
function displayRegNumberT(regT) {

    var regNumberT = document.createElement("p");

    regNumberT.className = 'regT';
    regNumberT.innerHTML = regT;

    displayTownElementT.insertBefore(regNumberT, displayTownElementT.firstChild);
    }
    userTemp.forEach(displayRegNumberT);

function getUserRegT(){
    
   regT = inputTownElementT.value;

    while (displayTownElementT.firstChild) {
        displayTownElementT.removeChild(displayTownElementT.firstChild);
     }
     

    var pattern1 = /^((CY|CL|CA|CAA)\s\d ([0-9]){4})$/; 
    var pattern2 = /^((CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/;
    var pattern3 = /^((CY|CL|CA)\-([0-9]){6})$/;
    var pattern4 = /^((CY|CL|CA)\s([0-9]){6})$/;

    console.log("Testing validation format 1:  " +pattern1.test(regT))
    console.log("Testing validation format 2:  " + pattern2.test(regT))
    console.log("Testing validation format 3:  " +pattern3.test(regT))
    console.log("Testing validation format 4:  " +pattern4.test(regT))

    townListT = regInstanceT.caseFormatT(regT);

    if (regT == "") {
        errorMsgT.classList.add('errors');
        errorMsgT.innerHTML =  "Please enter a valid registration.";

                setTimeout(function(){
                    errorMsgT.innerHTML = "";
                }, 3000)
            }

    townListT.forEach(function(regT){
        if (userTemp.includes(regT)){
          errorMsgT.classList.add('errors')

            errorMsgT.innerHTML ="Duplicate error!";
            
            setTimeout(function(){
                errorMsgT.innerHTML = "";
            }, 2000)      
        } else {
            if(regInstanceT.checkRegNumbersT(regT)) {
                regInstanceT.regListT(regT);
                        successMsgT.innerHTML = 'Entry succesful!';
                        setTimeout(function(){
                            successMsgT.innerHTML = "";
                        }, 3000) 
                    }else if(!regInstanceT.checkRegNumbersT(regT)){
                        errorMsgT.classList.add('errors')

                        errorMsgT.innerHTML = "Incorrect format,please use correct format.";
                        
                        setTimeout(function(){
                            errorMsgT.innerHTML = "";
                        }, 3000)             
                  } 
            
        }


    })
 
    localStorage.setItem('Template', userTemp);
 
    inputTownElementT.value = "";
    townsT.selectedIndex = 0;

    userTemp.forEach(displayRegNumberT);
    displayTownElementT.innerHTML = template ({ registration : userTemp});
}
addBtnT.addEventListener("click", getUserRegT)


townsT.onchange = function() {

    while (displayTownElementT.firstChild) {
        displayTownElementT.removeChild(displayTownElementT.firstChild);
        }
    
  
    var townFilteredT = townsT.selectedIndex;

    var regAvailableT = townsT.options[townFilteredT].value;
    var noRegT = townsT.value;

     var filterResultsT = regInstanceT.registrationsT(regAvailableT);
     console.log(filterResultsT)
   
     if(regAvailableT){
            if (filterResultsT.length != 0) {
                filterResultsT.forEach(displayRegNumberT);
               
                
            }
            else {
                displayTownElementT.innerHTML =  "There are no registrations to display for this town";
            
        }
          
        }
     


    
    if(noRegT=='All'){
        while (displayTownElementT.firstChild) {
            displayTownElementT.removeChild(displayTownElementT.firstChild);
        }
      
        userTemp.forEach(displayRegNumberT);
    }
}


function resetT(){
    successMsgT.innerHTML = 'Application reset succesful!';
    setTimeout(function(){
        successMsgT.innerHTML = "";
    }, 3000) 
    displayTownElementT.innerHTML = "";
    userTemp = [];
    localStorage['Template'] = userTemp;
    
}
resetBtnT.addEventListener("click", resetT)