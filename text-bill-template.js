// get a reference to the textbox where the bill type is to be entered
var billTypeText = document.querySelector(".billTypeText");
var textTotalAddBtn= document.querySelector(".addToBillBtn");
var callsTotalElem = document.querySelector(".callTotalOne");
var smsTotalElem = document.querySelector(".smsTotalOne");
var  totalCostElem = document.querySelector(".totalOne");
//get a reference to the add button

var callsTotals = 0;
var smsTotals = 0;

var text= textBill();

function textBillTotal(){
    text.billItem(billTypeText.value);
    
    var templateSource = document.querySelector(".userTemplate").innerHTML;
    // compile the template
    var userTemplate = Handlebars.compile(templateSource);
    //update the totals that is displayed on the screen.

    callsTotalElem.innerHTML = userTemplate({callsTotal:text.callTotal()});
    smsTotalElem.innerHTML = userTemplate({smsTotal: text.smsTotal()});
    totalCostElem.innerHTML = userTemplate({Total: text.billTotal()});

    if (text.billTotal() >= 50){
        // adding the danger class will make the text red
        totalCostElem.classList.add("danger");
    }
    else if (text.billTotal() >= 30){
        totalCostElem.classList.add("warning");
    }
}

textTotalAddBtn.addEventListener('click', textBillTotal);

