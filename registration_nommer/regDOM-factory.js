function registrationFactoryFunction() {

  var capeCities = [];

  var townss = {
    
    'CY' : 'Bellville',
    'CL' : 'Stellenbosch',
    'CA' : 'Cape Town',
    
  }

 
  var validRegistrations;
  var invalidRegistrations;
  var duplicates = [];
  var invalidRegNums = [];

  function regList(inputReg) {
    userRegs.unshift(inputReg);
  }

  function getTown(town){
    if(town.startsWith("CA") || town.startsWith("CL") || town.startsWith("CY")){
        capeCities.push(town);
       }
       return capeCities;
  }

  function registrations(inputReg) {

      var str;
      var townFiltered = [];

        for (var town in townss) {
          if (townss[town] === inputReg) {
            str = town;
          }

      }
     
    userRegs.forEach(function(car) {
        if(car.startsWith(str)) {
         townFiltered.push(car);
         }
       

    });

    return townFiltered;
    
  }

  function returnErrors(town){
      if(/^((CY|CL|CA|CAA)\s\d([0-9]){4})$/.test(reg) && /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(reg) && /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(reg)) {
            if(reg === town){
              return reg + exists;        
            }if (town === ""){
              return nothingToAdd;        
            }if(reg !== town){
              return town + successMsg;           
            }
      }else {
        return correctFormat;   
      }
  }


  function checkRegNumbers(reg) {
  
    if(/^((CJ|CY|CL|CA)\-([0-9]){3}\-([0-9]){3})$/.test(reg) || /^((CJ|CY|CL|CA)\-([0-9]){6})$/.test(reg) || /^((CJ|CY|CL|CA)\-([0-9]){5})$/.test(reg)) {
      userRegs.forEach(function(car){
        if(car == reg) {
          invalidRegistrations++;
          duplicates.push(reg);
          return false;
          
        } else {
          validRegistrations++;
        }
      });
    } else {
      invalidRegistrations++;
      invalidRegNums.push(reg);
      return false;
      
    }
    return true;
  }


  function caseFormat(str) {

    str = str.toUpperCase();
  
    var list = str.split(',');
      list.forEach(function(regValue, index ,list){
      regValue = regValue.trim();
      list[index] = regValue;
    });
    return list;
  }




  return {
      regList,
      checkRegNumbers,
      registrations,
      returnErrors,
      getTown,
      caseFormat
  }
}