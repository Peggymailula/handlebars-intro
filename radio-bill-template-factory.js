function radioBill()
{
    var calls=0;
    var smss =0;
    var totals=0;
   


    function radioItem(option){
     

        if(option=='call'){
            calls += 2.75;
            totals += 2.75;
           
        }
        else if (option== 'sms'){
         smss += 0.75;
         totals+= 0.75;
         

        }

    }
    function radioCallTotal(){
        return  calls.toFixed(2);

    }
    function radioSmsTotal(){
        return  smss.toFixed(2);

    }


    function radioTotal(){
 
        return  totals.toFixed(2);


    }

    function levels(){
        if( totals >= 30 && totals < 50){
            return 'warning';
        }
        else if( totals >= 50) {
            return 'critical';
        }
        else{
            return '';
        }
    }


    
    return{
       
        radioItem,  
        radioCallTotal,
        radioSmsTotal,
       radioTotal,
        levels
       
        
    }
}
    


