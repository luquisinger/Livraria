import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores (requisisao, resposta) {
        try {
          const listaAutores = await autor.find({});
          resposta.status(200).json(listaAutores);
        } catch (erro) {
          resposta.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
      };

    static async listarAutorPorId(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            const autorEncontrado = await autor.findById(id);
            resposta.status(200).json(autorEncontrado)
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na requisição do autor`})
        }
    }

    static async cadastrarAutor (requisisao, resposta) {
        try{

            const novoAutor = await autor.create(requisisao.body);
            resposta.status(201).json({ message: "Criado com sucesso!",
        autor: novoAutor })

        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - FALHA ao cadastar autor`});
        }
    }

    static async atualizarAutor(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            await autor.findByIdAndUpdate(id, requisisao.body);
            resposta.status(200).json({ message: "autor atualizado "});
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na atualização`})
        }
    }

    static async excluirAutor(requisisao, resposta ){
        try {
            const id = requisisao.params.id;
            await autor.findByIdAndDelete(id);
            resposta.status(200).json({ message: "autor excluído com sucesso "});
        } catch (erro) {
            resposta.status(500).json({message: `${erro.message} - falha na exclusão`})
        }
    };
};

export default AutorController;