// Container
const calculator_box = document.getElementById("calculator_box");
const result_box = document.getElementById("result_box")
const empty_result = document.getElementsByClassName("empty_result")[0];
const completed_result = document.getElementsByClassName("completed_result")[0];

// Input
const mortgage_amount = document.getElementById("mortgage_amount");
const mortgage_term = document.getElementById("mortgage_term");
const interest_rate = document.getElementById("interest_rate");
const mortgage_type_input = document.getElementsByName("mortgage_type");

// Label
const mortgage_type_repayment_label = document.getElementById("mortg_type_repayment_label");
const mortgage_type_interest_label = document.getElementById("mortgage_type_interest_label");

// When the page is loaded
window.addEventListener("load", (e) => {
    empty_result.style.display = "block";
    completed_result.style.display = "none";
    set_div_same_height();
})

// Set the two container to the same height
function set_div_same_height(){
    if(calculator_box.offsetHeight != result_box.offsetHeight){
        result_box.style.height = calculator_box.offsetHeight + 'px';
    }
}

// Clear All button 
const clear_all = document.getElementById("clear_all_button");
clear_all.addEventListener("click", (e) => {
    // Clear input
    mortgage_amount.value = "";
    mortgage_term.value = "";
    interest_rate.value = "";
    mortgage_type_input[0].checked = mortgage_type_input[1].checked = false;

    // Active State for label
    reset_label_activestate();

    // Reset validation
    reset_error();

    // Rest result box
    empty_result.style.display = "block";
    completed_result.style.display = "none";
})

// Active state for mortgage type
mortgage_type_input[0].addEventListener("click", (e) => {
    mortgage_type_repayment_label.style.backgroundColor = "hsl(61, 70%, 52%, 50%)";
    mortgage_type_interest_label.style.backgroundColor = "white";
})
mortgage_type_input[1].addEventListener("click", (e) => {
    mortgage_type_repayment_label.style.backgroundColor = "white";
    mortgage_type_interest_label.style.backgroundColor = "hsl(61, 70%, 52%, 50%)";
})

function reset_label_activestate(){
    mortgage_type_repayment_label.style.backgroundColor = "white";
    mortgage_type_interest_label.style.backgroundColor = "white";
}

// Error <p>
const mortgage_amount_error = document.getElementById("mortgage_amount_error");
const mortgage_term_error = document.getElementById("mortgage_term_error");
const interest_rate_error = document.getElementById("interest_rate_error");
const mortgage_type_error = document.getElementById("mortgage_type_error");

const calculate_button = document.getElementById("calculate_button");
const form = document.getElementById("form");
const required_message = "This field is required";

// Calculate repayment
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(validate()){
        show_result();
    }
})

function validate(){
    let valid = true;
    reset_error();
    if(mortgage_amount.value == ""){
        mortgage_amount_error.innerHTML = required_message;
        valid = false;
    }
    if(mortgage_term.value == ""){
        mortgage_term_error.innerHTML = required_message;
        valid = false;
    }
    if(interest_rate.value == ""){
        interest_rate_error.innerHTML = required_message;
        valid = false;
    }
    if(!mortgage_type_input[0].checked && !mortgage_type_input[1].checked){
        mortgage_type_error.innerHTML = required_message;
        valid = false;
    }
    set_div_same_height();
    return valid;
}

function reset_error(){
    mortgage_amount_error.innerHTML = mortgage_term_error.innerHTML =
    interest_rate_error.innerHTML = mortgage_type_error.innerHTML = "";
    set_div_same_height();
}

function calculate(){

    // Remove ',' before converting it to number as Cleave library add the input string with ','
    let P = Number(mortgage_amount.value.replace(/,/g, '')); 
    let r = ( Number(interest_rate.value) / 100 ) / 12;
    let n = Number(mortgage_term.value) * 12
    let monthly_repay, total_repay;

    // Repayment type
    if(mortgage_type_input[0].checked){ 
        // equation = Pr / ( 1 - (1+r)^-N )
        monthly_repay = ( P * r ) / ( 1 - Math.pow( (1+r), -n ) );
        total_repay = monthly_repay * n
    } 
    // Interest only type  
    else{
        monthly_repay = P * r;
        total_repay = monthly_repay * 12 * 25 + P;
    }
    return [monthly_repay.toFixed(2), total_repay.toFixed(2)];
}

function show_result(){
    let [pay_amount, total_repay] = calculate();

    // Display figure
    document.getElementById("monthly_repayment").innerHTML = "£" + add_commas_to_number(pay_amount);
    document.getElementById("total_repayment").innerHTML = "£" + add_commas_to_number(total_repay);

    empty_result.style.display = "none";
    completed_result.style.display = "block";
}

// Input formatting using Cleave library
var cleave = new Cleave('.cleave_format_digit', {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    numeralPositiveOnly: true
});

// Formating number using regular expression
function add_commas_to_number(x){
    // Regular expression copied from stack overflow
    // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
