// get a reference to the sms or call radio buttons
var billItemType = document.querySelector( ".billItemTypeRadio");

var TotalAddBtn = document.querySelector(".radioBillAddBtn");

var callsTotalElementt = document.querySelector(".callTotalTwo");
var smsTotalElementt = document.querySelector(".smsTotalTwo");
var billTotalElementt = document.querySelector(".totalTwo");
var callsTotal = 0;
var smsTotal = 0;
var radio= radioBill();

var templateSources = document.querySelector(".userTemplate").innerHTML;
// compile the template
var template = Handlebars.compile(templateSources);
function BillTotal(){

    var checkedRadioBtn = document.querySelector("input[name='billItemType']:checked");
if (checkedRadioBtn){
    var billItemType = checkedRadioBtn.value;
    // billItemType will be 'call' or 'sms'
}


radio.radioItem(billItemType)
//update the totals that is displayed on the screen.
callsTotalElementt.innerHTML = template({callsTotal:radio.radioCallTotal()}) ;
smsTotalElementt.innerHTML = template({smsTotal: radio.radioSmsTotal()});
billTotalElementt.innerHTML = template({Total:radio.radioTotal()});

if (radio.radioTotal() >= 50){
    // adding the danger class will make the text red
    billTotalElementt.classList.add("danger");
}
else if (radio.radioTotal() >= 30){
    billTotalElementt.classList.add("warning");
}



}



  
TotalAddBtn.addEventListener('click', BillTotal);
