function TemplateFactoryFunction() {

    var capeTemp = [];
  
    var townsT = {
      
      'CY' : 'Bellville',
      'CL' : 'Stellenbosch',
      'CA' : 'Cape Town',
      
    }
  
   
    var validRegistrationsT;
    var invalidRegistrationsT;
    var duplicatesT= [];
    var invalidRegNumsT = [];
  
    function regListT(inputRegT) {
      userTemp.unshift(inputRegT);
    }
  
    function getTownT(townT){
      if(townT.startsWith("CA") || townT.startsWith("CL") || townT.startsWith("CY")){
          capeCitiesT.push(townT);
         }
         return capeCitiesT;
    }
  
    function registrationsT(inputRegT) {
  
        var strT;
        var townFilteredT = [];
  
        for (var townT in townsT) {
            if (townsT[townT] === inputRegT) {
              strT = townT;
            }
  
  
        }
       
      userTemp.forEach(function(carT) {
          if(carT.startsWith(strT)) {
           townFilteredT.push(carT);
           }
         
  
      });
  
      return townFilteredT;
      
    }
  
    function returnErrorsT(townT){
        if(/^((CY|CL|CA|CAA)\s\d([0-9]){4})$/.test(regT) && /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(regT) && /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(regT)) {
              if(regT === townT){
                return 'Duplicate error';        
              }if (townT === ""){
                return 'Incorrect Format,please enter correct format';        
              }if(regT !== townT){
                return 'Succesful entry';           
              }
        }else {
          return correctFormatt;   
        }
    }
  
  
    function checkRegNumbersT(regT) {
    
      if(/^((CJ|CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/.test(regT) || /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(regT) || /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(regT)) {
        userTemp.forEach(function(carT){
          if(carT == regT) {
            invalidRegistrationsT++;
            duplicatesT.push(regT);
            return false;
            
          } else {
            validRegistrationsT++;
          }
        });
      } else {
        invalidRegistrationsT++;
        invalidRegNumsT.push(regT);
        return false;
        
      }
      return true;
    }
  
  
    function caseFormatT(strT) {
  
      strT = strT.toUpperCase();
    
      var listT = strT.split(',');
        listT.forEach(function(regValueT,index,listT){
        regValue = regValueT.trim();
        listT[index] = regValueT;
      });
      return listT;
    }
  
  
  
  
    return {
        regListT,
        checkRegNumbersT,
        registrationsT,
        returnErrorsT,
        getTownT,
        caseFormatT
    }
  }