"use strict";

require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const argon2 = require("argon2");
const mysql = require("mysql");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");
app.set("views", "view");
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.listen(8888);
console.log("listening on port 8888");

app.get("/", index);
app.get("/register", registerForm);
app.get("/survey", survey);
app.get("/survey2", survey2)
app.get("/survey3", survey3)
app.get("/answer", answer);
app.post("/profilePost", register)
app.post("/login", login)
app.post("/jsSurvey", addAllAnswers)
app.post("/surveyOne", addAnswerOne)
app.post("/surveyTwo", addAnswerTwo)
app.post("/surveyThree", addAnswerThree)


function index(req, res) {
    let result = {
        errors: [],
        data: undefined
    };

    res.render("index.ejs", Object.assign({}, result));
}

function registerForm(req, res) {
    let result = {
        errors: [],
        data: undefined
    };

    res.render("register.ejs", Object.assign({}, result));
}

function survey(req, res) {
    let result = {
        errors: [],
        data: undefined
    };
    if (!req.session.user) {
        console.log("geen session")
        res.redirect("/")
    } else {
        res.render("survey.ejs", Object.assign({}, result));
    }


}

function register(req, res, next) {
    const email = req.body.email
    const password = req.body.password
    const passwordVerify = req.body.passwordVerify
    if (!email || !password) {
        res
            .status(400)
            .send('Email or password is missing.')

        return
    }
    if (password !== passwordVerify) {
        res
            .status(400)
            .send(
                'Password verification failed, make sure both passwords are the same.'
            )
        return
    }

    connection.query('SELECT * FROM users WHERE email = ?', email, done)

    function done(err, data) {
        if (err) {
            next(err)
        } else if (data.length !== 0) {
            res.status(409).send('email already in use')
        } else {
            argon2.hash(password).then(onhash, next)
        }
    }

    function onhash(hash) {
        connection.query('INSERT INTO users SET ?', {
            email: email,
            hash: hash,
        }, oninsert)

        function oninsert(err, data) {
            if (err) {
                next(err)
            } else {
                req.session.user = {
                    email: email,
                    id: data.insertId
                }
                res.redirect('/survey')
            }
        }

    }
}

function login(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res
            .status(400)
            .send('email of wachtwoord mist')

        return
    }

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        email,
        done
    )

    function done(err, data) {
        let user = data && data[0]

        if (err) {
            next(err)
        } else if (user) {
            argon2
                .verify(user.hash, password)
                .then(onverify, next)
        } else {
            res
                .status(401)
                .send('Email does not exist')
        }

        function onverify(match) {
            if (match) {
                req.session.user = {
                    email: user.email,
                    id: user.userid
                };
                res.redirect('/survey')
            } else {
                res.status(401).send('Password incorrect')
            }
        }
    }
}

function addAllAnswers(req, res) {
    console.log(req.body)
    let question1 = req.body.question1
    let question2 = req.body.question2
    let question3 = req.body.question3
    let question4 = req.body.question4
    let question5 = req.body.question5
    let question6 = req.body.question6
    let question7 = req.body.question7
    let question8 = req.body.question8
    let question9 = req.body.question9
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        question5: question5,
        question6: question6,
        question7: question7,
        question8: question8,
        question9: question9,
    }, userId], done)



    function done(err) {
        if (err) {
            res.status(400).json(err)
            console.error(err)
        } else {
            res.json("succes")
        }
    }



}

function addAnswerOne(req, res) {
    let question1 = req.body.question1
    let question2 = req.body.question2
    let question3 = req.body.question3
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        question1: question1,
        question2: question2,
        question3: question3
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        } else {
            res.redirect("/survey2")
        }
    }
}

function survey2(req, res) {
    res.render("survey2.ejs")
}

function addAnswerTwo(req, res) {
    let question4 = req.body.question4
    let question5 = req.body.question5
    let question6 = req.body.question6
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        question4: question4,
        question5: question5,
        question6: question6
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        } else {
            res.redirect("/survey3")
        }
    }
}

function survey3(req, res) {
    res.render("survey3.ejs")
}

function addAnswerThree(req, res) {
    let question7 = req.body.question7
    let question8 = req.body.question8
    let question9 = req.body.question9
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        question7: question7,
        question8: question8,
        question9: question9
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        } else {
            res.redirect("/answer")
        }
    }
}

function answer(req, res) {
    let userId = req.session.user.id

    connection.query('SELECT question1, question2, question3, question4, question5, question6, question7, question8, question9 FROM users WHERE userid = ?', userId, done)

    function done(err, data) {
        if (err) {
            console.log(err)
        } else {
            const answers = data[0]
            let sum = Number(answers.question1) + Number(answers.question2) + Number(answers.question3) + Number(answers.question4) + Number(answers.question5) + Number(answers.question6) + Number(answers.question7) + Number(answers.question8) + Number(answers.question9)

            let result = {
                errors: [],
                sum: sum
            };

            res.render("answer.ejs", Object.assign({}, result));

        }
    }
}
