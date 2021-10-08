const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require ('./models/db')
const Post = require ('./models/Post')
const Empresa = require ('./models/Empresa')

//Config Template Engine
app.engine('handlebars',handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Config Body-Parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Pagina Principal!')
})

app.get('/sobre', function (req, res) {
  res.send('Minha Pagina Sobre')
})

app.get('/blog', function (req, res) {
  res.send('Bem Vindo ao Blog!')
})

app.get('/formempresa', function (req, res) {
  res.render('EmpresaCad')
})

app.get('/menuprincipal', function (req, res) {
  res.render('MenuLiso')
})

app.get('/formulario', function (req, res) {
  res.render('formulario')
})

app.post('/add', function (req, res) {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  })
  .then(function(){
    res.send("Post Criado com sucesso")
  })
  .catch(function(){
    res.send("Houve um Erro"+ erro)
  })  
  
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})