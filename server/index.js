const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require('bcrypt')
const { request } = require('express')
const saltRounds = 10

const port = 3001
const app = express()
app.use(express.json())

const url = 'http://localhost:3000'
app.use(cors({
    origin: [url],
    methods: ['GET', 'POST'],
    credentials: true,
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    key: 'userId',
    secret: 'need work',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'memoir'
})

app.post('/signup', (req, res) => {

    const account = {
        username: req.body.username,
        email: req.body.emailAddress,
        password: req.body.password
    }

    bcrypt.hash(account.password, saltRounds, (err, hash) => {
        if (err) console.log(err)
        db.query(
            "INSERT INTO accounts (username, password, email_address) VALUES (?,?,?)",
            [account.username, hash, account.email],
            (err, result) => {
                if (result) console.log('Signed in successfully')
                else console.log(err)
            }
        )
    })    
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true , user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.post('/login', (req, res) => {
    const account = {
        email: req.body.emailAddress,
        password: req.body.password
    }

    db.query(
        "SELECT * FROM accounts WHERE email_address = ?",
        account.email,
        (err, result) => {
            if (err) {
                res.send({err: err})
                return
            }
            if (result.length > 0) {
                bcrypt.compare(account.password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result
                        res.send(result)
                        console.log('Logged in successfully')
                    } else {
                        res.send({message: 'Wrong email address/password combination'})
                    }
                })
            } else {
                res.send({message: `User doesn't exist`})
            }
        }
    )
})

app.listen(port, () => {
    console.log(`running server on port ${port}`)
})