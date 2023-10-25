//passa uma informacao do express para a constante express
const express = require('express')
//passa uma informação do express para a constante app
const app = express()
//numeração da porta de entrada da constante
const port = 3000
app.use(express.json());

//informações que ficaram amarzenadas no banco de dados
let bd = [

  //informações sobre os nomes dos users
  { 
    id: "1", //identificação do primeiro user
    name: "Felippe" //nome do primeiro user
  },
  {
    id: "2", //identificação do segundo user
    name: "Bruna" //nome do segundo user
  }
]

   //get users
   //coleta as informações dos users e as monitora
   app.get('/users', (request, response) => {
   response.json(bd);
   })

     app.get('/users/:id',(request, response) => {

     //pegar o id da requisicao  
     //pega o id solicitado e passa sua informação
     const idUser = request.params.id;

 //encontrar o usuario correspondente no bd
 // é responsavel por encontrar o user solicitado no banco de dados, caso ele estiver registrado
 const user = bd.filter((usuario) => usuario.id === idUser);

 //respoder a requisicao com as info dos users
 response.json(user);
 
 })

app.post("/users", (request, response) =>{

  //pegar o corpo da requisição
const body = request.body;

  // criar um novo objeto a partir desse corpo
  //ele irá cria um novo objeto com os novos dados e constante criado
  const newUser = {
    id:(bd.length+1).toString(),
    name: body.name
  
  }

  //adicionar esse novo objeto no banco
  //  nova informação que irá ao banco de dados
  bd.push(newUser);

  //responder a requisição com o banco completo
  response.json(bd);

})
  //irá deletar o que for solicitado
  app.delete("/users/:id", (request, response)=>{

   // irá pegar o id da requisicao

   const idUser = request.params.id;

   //percorrer o banco e encontrar quem tem o id da requisicao solicitada

   bd = bd.filter((usuario) =>  usuario.id != idUser);

   //deleta o condenado

   //responder o meu banco atualizado após deletar o que foi pedido

   response.json(bd);

  })

  app.patch("/users/:id", (request, response) => {

//pegar o id da requisição
const idUser = request.params.id;

//pegar o corpo da requisição
const body = request.body;

//percorrer o banco, para que dependendo do que for pedido irá retornar tal resposta
//se estiver diacordo com o que foi pedido
bd = bd.map((usuario) => {

  if (usuario.id === idUser){
    usuario.name = body.name;
  }
  return usuario

})


//atualizar as informacões

//responder a requisição com o banco
response.json(bd);

  })
//listar os dados obtidos
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

