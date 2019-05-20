var noJS = document.querySelectorAll(".noJS")
var JS = document.querySelectorAll(".JS")
var hiddenForms = document.querySelectorAll(".form");
var noJsButtons = document.querySelectorAll(".noJsButton")
var firstButton = document.querySelector("#firstButton")
var secondButton = document.querySelector("#secondButton")
var thirdButton = document.querySelector("#thirdButton")


document.addEventListener("DOMContentLoaded", function () {

    Array.prototype.forEach.call(hiddenForms, function (form) {
        form.classList.add("noShow")
    })

    Array.prototype.forEach.call(noJsButtons, function (button) {
        button.classList.remove("noShow")
    })

    Array.prototype.forEach.call(JS, function (element) {
        element.classList.add("noJS")
    })

    Array.prototype.forEach.call(noJS, function (element) {
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

var forms = document.querySelectorAll(".form")

Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener("change", function () {
        var inputs = document.querySelectorAll("input[type=radio]:checked")
        var data = {}
        inputs.forEach(function (input) {
            var question = input.name
            var value = input.value
            data[question] = value
        })

        console.log(window)

        if (window.fetch) {
            console.log("yes")
            fetch("/jsSurvey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        } else {
            console.log("no");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/jsSurvey", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data))
        }
    })
})



