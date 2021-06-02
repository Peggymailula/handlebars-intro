function textBill()
{
    var calls=0;
    var sms =0;
    var total=0;
   


    function billItem(item){
     

        if(item =='call'){
            calls += 2.75;
            total += 2.75;
           
        }
        else if (item== 'sms'){
         sms += 0.75;
         total+= 0.75;
         

        }

    }

    
    function callTotal(){
        return 'R' + calls.toFixed(2);

    }
    function smsTotal(){
        return 'R'+ sms.toFixed(2);

    }
    

    function billTotal(){
 
        return 'R' +total.toFixed(2);


    }

    function level(){
        if( total >= 30 && total < 50){
            return 'warning';
        }
        else if( total >= 50) {
            return 'critical';
        }
        else{
            return '';
        }
    }


    
    return{
       
        billItem, 
        callTotal,
        smsTotal, 
        billTotal,
        level
       
        
    }
}
    


