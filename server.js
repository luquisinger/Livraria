
//import http from "http"
import app from './src/app.js'
const PORT = 3000;

/*
const rotas = {
    "/" : "Curso de NODE.js",
    "/livros" : "varios li vro",
    "/autores" : "gay"
}
 const server = http.createServer((requisisao, resposta) =>{
    resposta.writeHead(200, {"Content-Type": "text/plain"});
    resposta.end(rotas[requisisao.url]);
}); */

app.listen(PORT, ()=>{
    console.log("Escutando")
})
