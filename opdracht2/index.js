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
app.post("/profilePost", register)
app.post("/login", login)
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

function registerForm(req, res){
  let result = {
    errors: [],
    data: undefined
  };

  res.render("register.ejs", Object.assign({}, result));
}

function survey(req, res){
     let result = {
      errors: [],
      data: undefined
    };
    if (!req.session.user){
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

function addAnswerOne(req, res){
    let answer1 = req.body.questionOne
    let answer2 = req.body.questionTwo
    let answer3 = req.body.questionThree
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        answer1: answer1,
        answer2: answer2,
        answer3: answer3
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        }
    }

}
 
function addAnswerTwo(req, res){
    let answer4 = req.body.questionFour
    let answer5 = req.body.questionFive
    let answer6 = req.body.questionSix
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        answer4: answer4,
        answer5: answer5,
        answer6: answer6
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        }
    }
}

function addAnswerThree(req, res){
    let answer7 = req.body.questionSeven
    let answer8 = req.body.questionEight
    let answer9 = req.body.questionNine
    let userId = req.session.user.id

    connection.query('UPDATE users SET ? WHERE userid = ?', [{
        answer7: answer7,
        answer8: answer8,
        answer9: answer9
    }, userId], done)

    function done(err) {
        if (err) {
            console.error(err)
        }
    }
}
