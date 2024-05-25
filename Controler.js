const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Corrigindo o require
const models=require('./models');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // Corrigindo o nome do método
app.use(bodyParser.json());
let cliente=models.Cliente;
let veiculo=models.Veiculo;

app.post('/login',async(req,res)=>{
    let response=await cliente.findOne({
        where:{usuario:req.body.usuario, password: req.body.password}
    });
    if(response === null){
        res.send(JSON.stringify('error'));
    }else{
        res.send(response);
    }
    
});

//CADASTRO DE USUÁRIO NO BANCO
app.post('/create', async(req,res)=>{
    await cliente.create({
        nome: req.body.nome,
        password: req.body.password,
        email:req.body.email,
        telefone:req.body.telefone,
        usuario: req.body.usuario,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Usuário cadastrado com sucesso!!!');
});

app.get('/carro',async(req,res)=>{
    let read=await veiculo.findAll({
        raw:true,
    });
    res.send(read)
});


let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor Rodando');
});