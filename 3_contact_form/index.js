// Error Message String
const error_required = "This field is required";
const invalid_email = "Please enter a valid email address";
const error_required_query = "Please select a query type";
const error_required_consent = "To submit this form, please consent to being contacted";

const form = document.getElementById("form")

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if( validateform(event) ){
        setTimeout(() => {
            form.reset();
        }, 3000);
        toastmessage();
    }
})

function validateform(event){
    let submitstatus = true;
    
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let query_type_radio = document.getElementsByName("QueryType");
    let message = document.getElementById("message").value;
    let consent = document.getElementById("consent");

    // reset all error message
    reset_error();

    // first name
    if(firstname == ""){
        document.getElementById("firstnameerror").innerHTML = error_required;
        document.getElementById("firstname").classList.add("error_border");
        submitstatus = false;
    }
    // last name
    if(lastname == ""){
        document.getElementById("lastnameerror").innerHTML = error_required;
        document.getElementById("lastname").classList.add("error_border");
        submitstatus = false;
    }
    // email
    if(email == ""){    // empty email
        document.getElementById("emailerror").innerHTML = error_required;
        document.getElementById("email").classList.add("error_border");
        submitstatus = false;
    }
    else if(email.indexOf("@") == -1){  // not empty email but does not contain @
        document.getElementById("emailerror").innerHTML = invalid_email;
        document.getElementById("email").classList.add("error_border");
        submitstatus = false;
    }
    // query_type
    if( !query_type_radio[0].checked && !query_type_radio[1].checked ){
        document.getElementById("queryerror").innerHTML = error_required_query;
        submitstatus = false;
    }
    // message
    if(message == ""){
        document.getElementById("messageerror").innerHTML = error_required;
        document.getElementById("message").classList.add("error_border");
        submitstatus = false;
    }
    // consent
    if(!consent.checked){
        document.getElementById("consenterror").innerHTML = error_required_consent;
        submitstatus = false;
    }

    return submitstatus;
}

function reset_error(){
    document.getElementById("firstnameerror").innerHTML = "";
    document.getElementById("lastnameerror").innerHTML = "";
    document.getElementById("emailerror").innerHTML = "";
    document.getElementById("queryerror").innerHTML = "";
    document.getElementById("messageerror").innerHTML = "";
    document.getElementById("consenterror").innerHTML = "";

    document.getElementById("firstname").classList.remove("error_border");
    document.getElementById("lastname").classList.remove("error_border");
    document.getElementById("email").classList.remove("error_border");
    document.getElementById("message").classList.remove("error_border");
}

function toastmessage(){
    let toast = document.getElementById("toast");
    document.getElementById("toastmessage").innerHTML = "✅ Form Submitted !"
    toast.style.visibility = 'visible';
    toast.classList.add("appear_animation");
    setTimeout(() => {
        toast.style.visibility = 'hidden';
        toast.classList.remove("appear_animation");
    }, 3000);
}

