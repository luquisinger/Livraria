import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js'

class LivroController {

    static async listarLivros (requisisao, resposta) {
        try {
          const listaLivros = await livro.find({});
          resposta.status(200).json(listaLivros);
        } catch (erro) {
          resposta.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
      };

    static async listarLivroPorId(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            const livroEncontrado = await livro.findById(id);
            resposta.status(200).json(livroEncontrado)
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na requisição do livro`})
        }
    }

    static async cadastrarLivro (requisisao, resposta) {
        
        const novoLivro = requisisao.body;
        try{
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {...novoLivro, autor: { ...autorEncontrado._doc}};
            const livroCriado = await livro.create(livroCompleto);
            resposta.status(201).json({ message: "Criado com sucesso!",
        livro: novoLivro })

        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - FALHA ao cadastar livro`});
        }
    }

    static async atualizarLivro(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            await livro.findByIdAndUpdate(id, requisisao.body);
            resposta.status(200).json({ message: "livro atualizado "});
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na atualização`})
        }
    }

    static async excluirLivro(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            await livro.findByIdAndDelete(id);
            resposta.status(200).json({ message: "livro excluído com sucesso "});
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na exclusão`})
        }
    };

    static async listarLivrosPorEditora(requisisao, resposta){
        const editora = requisisao.query.editora;
        try{
            const livrosPorEditora = await livro.find({ editora:editora })
            resposta.status(200).json(livrosPorEditora); 
        } catch (erro){
            resposta.status(500).json({message: `${erro.message} - falha na busca`});
        }
    }
};

export default LivroController;