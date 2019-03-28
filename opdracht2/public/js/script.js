const noJS = document.querySelectorAll(".noJS")
const JS = document.querySelectorAll(".JS")
const hiddenForms = document.querySelectorAll(".form");
const noJsButtons = document.querySelectorAll(".noJsButton")
const firstButton = document.querySelector("#firstButton")
const secondButton = document.querySelector("#secondButton")
const thirdButton = document.querySelector("#thirdButton")


document.addEventListener("DOMContentLoaded", function () {
    hiddenForms.forEach(function (form) {
        form.classList.add("noShow")
    })

    console.log(noJsButtons)

    noJsButtons.forEach(function (button) {
        button.classList.remove("noShow")
    })

    JS.forEach(function (element) {
        element.classList.add("noJS")
    })

    noJS.forEach(function (element) {
        element.classList.remove("noJS")
    })
});

firstButton.addEventListener("click", function () {
    hiddenForms[0].classList.toggle("noShow")
})

secondButton.addEventListener("click", function () {
    hiddenForms[1].classList.toggle("noShow")
})

thirdButton.addEventListener("click", function () {
    hiddenForms[2].classList.toggle("noShow")
})

const form = document.querySelector(".form")

form.addEventListener("change", function () {
    let inputs = document.querySelectorAll("input[type=radio]:checked")
    let data = {}
    inputs.forEach(function (input) {
        let question = input.name
        let value = input.value
        data[question] = value
    })
    fetch("/jsSurvey", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
})