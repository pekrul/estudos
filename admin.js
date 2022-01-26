const db = require ('../models/db')
const Post = require ('../models/Post')
const Perfil = require ('../models/Perfil')
const Empresa = require ('../models/Empresa')
const Cliente = require ('../models/Cliente')
const express = require ('express')
const router = express.Router()

//TESTE INICIAIS 
router.get('/', function (req, res) {
    res.render('MenuLiso')
  })  
  router.get('/menu', function (req, res) {
    res.render('index')
  })
  router.get('/formulario', function (req, res) {
    res.render('formulario')
  })
  router.post('/add', function (req, res) {
    var erros = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
      erros.push({texto: "Titulo Invalido"})
    }
    
    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
      erros.push({texto: "Conteudo Invalido"})
    }

    if (erros.length > 0){

      res.render('formulario', {erros: erros})

    }

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
    
  router.get('/postagem', function (req, res){
	  Post.findAll().then(function(postagems){
      res.render('postagem', {postagems: postagems});
    })  
  })})  

  // CRUD EMPRESAS
  router.get('/formempresa', function (req, res) {
    res.render('EmpresaCad')
  })  
  router.post('/addempresa', function (req, res) {

    var erros = []

    if (!req.body.tipo || typeof req.body.tipo == undefined || req.body.tipo == null){
      erros.push({texto: "Tipo Invalido ou em Branco"})
    }
    
    if (!req.body.razao || typeof req.body.razao == undefined || req.body.razao == null){
      erros.push({texto: "Razao Social Invalida ou em Branco"})
    }

    if (!req.body.cnpj || typeof req.body.cnpj == undefined || req.body.cnpj == null){
      erros.push({texto: "CNPJ Invalido ou em Branco"})
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null){
      erros.push({texto: "CNPJ Invalido ou em Branco"})
    }

    if (!req.body.responsavel || typeof req.body.responsavel == undefined || req.body.responsavel == null){
      erros.push({texto: "Responsavel Invalido ou em Branco"})
    }

    if (!req.body.fone1 || typeof req.body.fone1 == undefined || req.body.fone1 == null){
      erros.push({texto: "Telefone Invalido ou em Branco"})
    }

    if (!req.body.fone2 || typeof req.body.fone2 == undefined || req.body.fone2 == null){
      erros.push({texto: "Telefone Invalido ou em Branco"})
    }

    if (!req.body.status || typeof req.body.status == undefined || req.body.status == null){
      erros.push({texto: "Status Invalido ou em Branco"})
    }

    if (erros.length > 0){

      res.render('EmpresaCad', {erros: erros})

    }

    Empresa.create({
      tipo: req.body.tipo,
      razao: req.body.razao,
      cnpj: req.body.cnpj,
      email: req.body.email,
      responsavel: req.body.responsavel,
      fone1: req.body.fone1,
      fone2: req.body.fone2,
      status: req.body.status
    })
    .then(function(){
      res.redirect('/admin/listempresa')
    })
    .catch(function(){
      res.send("Houve um Erro"+ erro)
    })    
  })  
  router.get('/listempresa',function (req, res) {
    Empresa.findAll().then(function(empresas){    
      res.render('Empresalist', {empresas: empresas});
    })  
  })  
  router.get('/delempresa/:id', function(req, res){
    Empresa.destroy({
      where: {'id': req.params.id}
    }).then (function(){
        res.redirect ('/admin/listempresa');
    }).catch(function(err){
      res.send ("Empresa não apagada com Sucesso" +erro);
    })
  })
  router.get('/editempresa/:id', function(req, res){
      Empresa.findOne({
        where: {'id':req.params.id}
      }).then((empresas)=> {
        res.render('EmpresaEdit', {empresas: empresas})
      }).catch(function(err){
        res.redirect ('/admin/listempresa')
      })    
  })
  router.post('/editempresa/', function(req, res){
    Empresa.findOne({
      where: {'id':req.body.id}
    }).then((empresas)=>{
      empresas.tipo = req.body.tipo;
      empresas.razao = req.body.razao;
      empresas.cnpj = req.body.cnpj;
      empresas.email = req.body.email;
      empresas.responsavel = req.body.responsavel;
      empresas.fone1 = req.body.fone1;
      empresas.fone2 = req.body.fone2;
      empresas.status = req.body.status;

      empresas.save().then (()=>{
        res.redirect ('/admin/listempresa')      

      }).catch((err)=>{        
        res.redirect ('/admin/listempresa')

    })
      }).catch((err)=>{        
        res.redirect ('/admin/listempresa')

    })

  })
    
  //CRUD CLIENTES
  router.get('/formcliente', function (req, res) {
    res.render('ClienteCad')
  })
  router.post('/addcliente', function (req, res) {
    Cliente.create({
      tipo: req.body.tipo,
      nome: req.body.nome,
      rg: req.body.rg,
      cpf: req.body.cpf,
      email: req.body.email,    
      fone1: req.body.fone1,
      fone2: req.body.fone2,
      status: req.body.status
    })
    .then(function(){
      res.redirect('/admin/listcliente')
    })
    .catch(function(erro){
      res.send("Houve um Erro"+ erro)
    })    
  })
  router.get('/listcliente',function (req, res) {
    Cliente.findAll().then(function(clientes){    
      res.render('Clientelist', {clientes: clientes});
    })  
  })
  router.get('/delcliente/:id', function(req, res){
    Cliente.destroy({
      where: {'id': req.params.id}
    }).then (function(){
        res.redirect ('/admin/listcliente');
    }).catch(function(err){
      res.send ("Cliente não apagada com Sucesso" +erro);
    })
  })
  router.get('/editcliente/:id', function(req, res){
    Cliente.findOne({
      where: {'id':req.params.id}
    }).then((clientes)=> {
      res.render('ClienteEdit', {clientes: clientes})
    }).catch(function(err){
      res.redirect ('/admin/listcliente')
    })    
})
router.post('/editcliente/', function(req, res){
  Cliente.findOne({
    where: {'id':req.body.id}
  }).then((clientes)=>{
    clientes.tipo = req.body.tipo;
    clientes.nome = req.body.nome;
    clientes.rg = req.body.rg;
    clientes.cpf = req.body.cpf;
    clientes.email = req.body.email;
    clientes.fone1 = req.body.fone1;
    clientes.fone2 = req.body.fone2;
    clientes.status = req.body.status;

    clientes.save().then (()=>{
      res.redirect ('/admin/listcliente')      

    }).catch((err)=>{        
      res.redirect ('/admin/listcliente')

  })
    }).catch((err)=>{        
      res.redirect ('/admin/listempresa')

  })

})
  
  //CRUD PERFIL
  router.get('/formperfil', function (req, res) {
    res.render('PerfilCad')
  })
  router.post('/addperfil', function (req, res) {
    Perfil.create({
      tipo: req.body.tipo,
      status: req.body.status    
    })
    .then(function(){
      res.redirect('/admin/listperfil')
    })
    .catch(function(){
      res.send("Houve um Erro"+ erro)
    })    
  })
  router.get('/listperfil',function (req, res) {
    Perfil.findAll().then(function(perfils){    
      res.render('Perfillist', {perfils: perfils});
    })  
  })
  router.get('/delperfil/:id', function(req, res){
    Perfil.destroy({
      where: {'id': req.params.id}
    }).then (function(){
        res.redirect ('/admin/listperfil');
    }).catch(function(erro){
      res.send ("Perfil não apagado com Sucesso" +(erro));
    })
  })
  router.get('/editperfil/:id', function(req, res){
    Perfil.findOne({
      where: {'id':req.params.id}
    }).then((perfils)=> {
      res.render('PerfilEdit', {perfils: perfils})
    }).catch(function(err){
      res.redirect ('/admin/listperfil')
    })    
})
router.post('/editperfil/', function(req, res){
  Perfil.findOne({
    where: {'id':req.body.id}
  }).then((perfils)=>{
    perfils.tipo = req.body.tipo;
    perfils.status = req.body.status;

    perfils.save().then (()=>{
      res.redirect ('/admin/listperfil')    

    }).catch((err)=>{        
      res.redirect ('/admin/listperfil')
  })
    }).catch((err)=>{        
      res.redirect ('/admin/listperfil')
  })

})

module.exports = router