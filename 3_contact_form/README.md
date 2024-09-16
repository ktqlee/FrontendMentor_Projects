# Frontend Mentor - Contact form solution

![Screenshot of the Contact Form](/readme_img/contact-form-img.png)

## Overview

This is a solution to the [Contact form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/contact-form--G-hYlqKJj). In this project, HTML, CSS and JavaScript is used to set up this contact form.

🖥 [Live Site Link](https://ktqlee.github.io/frontendmentor_contactform/).

## Features

- **Form validation ✔**:
  - Users will receive a error messages if a required field has been missed or the email address is not formatted correctly

    ![Form Validation](/readme_img/contact-form-validation.png)

- **Hover & Focus status for interactive elements 🖱**

    ![Form focus status](/readme_img/contact-form-focus.png)
    
- **Optimal layout for desktop and mobile 📱**

    ![Form mobile layout](/readme_img/contact-form-mobile-layout.png)

- **Success toast message ✅**

    ![Submit toast message](/readme_img/contact-form-submit-message.png)

## What I learned

- To implement an optimal layout for mobile devices, I tried to use @media rule in CSS.

- Moreover, entrance animation for toast message is also added.
```css
.appear_animation{
    animation-name: appear;
    animation-duration: 1s;
}
@keyframes appear{
    from {
        top: -30px;
    }
}
```

- Besides, this is my first time to code in JavaScript. Various methods are used in this project, such as modifying the HTML content using .innerHTML, 
```js
document.getElementById("firstnameerror").innerHTML = error_required;
```

adding or removing element's class using .classList, 
```js
document.getElementById("firstname").classList.add("error_border");
```

and setting styles of an element using .style.
```js
toast.style.visibility = 'visible';
```
