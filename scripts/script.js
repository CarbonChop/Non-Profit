function navBar() {
    var links = document.getElementById("mobilenavLinks");
    if (links.style.display === "block") {
      links.style.display = "none";
    } else {
      links.style.display = "block";
    }
}
let paymentType = '';
let selectedAmountButton = null;

function selectAmountType(type, button) {
    paymentType = type;

    const paymentButtons = document.querySelectorAll(".donation-option");
    console.log(paymentButtons);
    paymentButtons.forEach(btn => {
        btn.style.backgroundColor = (btn === button) ? "orange" : "#F5F3F1"; 
    });

    const amounts = {
        "one-time": ["$25","$35","$45","$50","$75","$100"],
        "monthly": ["$1", "$5","$10","$15","$20","$25"]
    };

    const amountButtons = document.querySelectorAll(".donation-option[data-amount]");
            amountButtons.forEach((button, index) => {
                if (index < amounts[paymentType].length) {
                    button.textContent = amounts[paymentType][index];
                    button.setAttribute("data-amount", amounts[paymentType][index].replace("$", ""));
                }
            });
            deselectAll();
            button.classList.add('selected'); 
            button.style.border = "4px solid #57585C";
}
function selectAmount(button) {
    deselectAll();
    button.classList.add('selected');
    button.style.border = "4px solid #57585C";
    if (selectedAmountButton) {
        selectedAmountButton.style.backgroundColor = "#F5F3F1";
    }
    button.style.backgroundColor = "orange";
    selectedAmountButton = button;
}
function deselectAll() {
    const buttons = document.querySelectorAll('.donation-option');
    buttons.forEach(button => {
        button.classList.remove('selected');
        button.style.border = "1px solid grey";
    });
    const amountButtons = document.querySelectorAll(".donation-option[data-amount]");
    amountButtons.forEach(button => {
        button.style.backgroundColor = "#F5F3F1";
    });
}

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const cardNumber = document.getElementById('cardNumber').value;
    const messageValidation= document.getElementById('ccValid');

    if (validateCreditCard(cardNumber)) {
        messageValidation.textContent = 'Credit card number is valid!';
        messageValidation.style.color = 'green';
    } else {
        messageValidation.textContent = 'Invalid credit card number format. Please try again.';
        messageValidation.style.color = 'red';
    }
});

function validateCreditCard(number) {
    const sanitizedNumber = number.replace(/[\s-]/g, '');

    const regex = /^[0-9]{13,19}$/; // Visa, MasterCard, etc. (13-19 digits)
    return regex.test(sanitizedNumber);
}

document.addEventListener('DOMContentLoaded', () => {
    const creditButton = document.getElementById('creditButton');
    const paypalButton = document.getElementById('paypalButton');

    creditButton.addEventListener('click', () => {
        creditButton.style.backgroundColor = 'orange';
        paypalButton.style.backgroundColor = '#F5F3F1';
    });

    paypalButton.addEventListener('click', () => {
        paypalButton.style.backgroundColor = 'orange';
        creditButton.style.backgroundColor = '#F5F3F1';
    });
});


