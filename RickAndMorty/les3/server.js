const express = require('express')
const app = express()
const port = 3000

const users = require('./data/users.json')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// HOME
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/tech.html')
})

// ABOUT
app.get('/about', (req, res) => {
  // res.send('Dit is een express application voor school')
  res.sendFile(__dirname + '/views/about.html')
})

// LOGIN PAGINA
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})

// LOGIN VERWERKEN → REDIRECT NAAR PROFILE
app.post('/login', (req, res) => {
  const username = req.body.username

  const userExists = users.find(u => u.username === username)

  if (!userExists) {
    return res.status(404).send('Gebruiker bestaat niet')
  }

  // 👉 REDIRECT naar profielpagina
  res.redirect(`/profile/${username}`)
})

// PROFILE PAGINA
app.get('/profile/:username', (req, res) => {
  const username = req.params.username;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send('Gebruiker niet gevonden');
  }

  res.sendFile(__dirname + '/views/profile.html')
});

// 404
app.use((req, res) => {
  res.status(404).send('404 - Pagina niet gevonden')
})

app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`)
})

// Json
app.get('/users', (req, res) => {
  res.json(users)
})

