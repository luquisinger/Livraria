import express, { response } from "express";

const app = express();
app.use(express.json());

const livros = [
    {id: 1, "titulo": "Senhor dos Aneis"},
    {id: 2, "titulo": "O hobbit"}
]

function buscaLivro(id) {
    return livros.findIndex(livro => {
        //dados do id estão em json então precisa converter antes para number
        return livro.id === Number(id)
    })
}

//passa para o express a  responsabilidade de gerenciar as rotas
app.get('/' , (requisisao, resposta) => {
    resposta.status(200).send('Curso de node.js');
})

app.get('/livros', (requisisao, resposta) => {
    resposta.status(200).json(livros)
})

app.get("/livros/:id", (requisisao, resposta) =>{
    const index = buscaLivro(requisisao.params.id);
    resposta.status(200).json(livros[index])
})

app.post('/livros', (requisisao, resposta) => {
    livros.push(requisisao.body);
    //201 significa registro enviado
    resposta.status(201).send("Livro cadastrado com sucesso")
})

app.put("/livros/:id", (requisisao, resposta)=>{
    const index = buscaLivro(requisisao.params.id);
    livros[index].titulo = requisisao.body.titulo;
    resposta.status(200).json(livros);
})

app.delete("/livros/:id", (requisisao, resposta) => {
    const index = buscaLivro(requisisao.params.id);
    livros.splice(index, 1);
    resposta.status(200).send("Livro excluido com sucesso");
})
export default app