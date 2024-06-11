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
let locacao=models.Locacao;

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

app.get('/loclist',async(req,res)=>{
    let read=await locacao.findAll({
        raw:true,
    });
    res.send(read)
});
app.post('/confirma', async(req,res)=>{
    await locacao.create({
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
        valor_total: req.body.valor_total,
        status: req.body.status,
        metodo_pagamento: req.body.metodo_pagamento,
        fk_idCliente: req.body.fk_idCliente,
        fk_idVeiculo: req.body.fk_idVeiculo,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Confirmado!!!');
});
app.post('/updatepw', async(req,res)=>{
    let response=await cliente.findOne({
        where:{id:req.body.id, password: req.body.currentPassword}
    });
    if(response === null){
        res.send(JSON.stringify('senha antiga inválida'));
    }else{
        if(req.body.newPassword === req.body.confirmNewPassword){
            response.password=req.body.newPassword;
            response.save();
            res.send(JSON.stringify('Senha atualizada com sucesso!!!'));
        }else{
            res.send(JSON.stringify('Nova senha e confirmação inválidas'))
        }

    }
    
});
    

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor Rodando');
});
