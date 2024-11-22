const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarProdutos(req,res){
        try {
            const produtos = await prisma.produtos.findMany();
            res.status(200).json(produtos);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os produtos"})
        }
    },

    async buscaProduto(req,res){
        try {
            const {id} = req.params;
            const produto = await prisma.produtos.findUnique({
                where: { id: Number(id) }
            });
            if (!produto){
                return res.status(404).json( 
                    {
                        error: "Produto não encontrado"}
                    );
            }
            res.status(200).json(produto)

        }catch(error){
            res.status(500).json({ error: "Erro de acesso aos dados do produto" });
        }
    },

    async criarProduto(req,res){
        try {
            const {
                descricao, quantidade, valor, proprietario_id  
            } = req.body;

            const novoProduto = await prisma.produtos.create({
                data: {
                    descricao, 
                    quantidade, 
                    valor, 
                    proprietario_id
            }})

            res.status(201).json(novoProduto);

        }catch(error){
            res.status(500).json({ error: "Erro ao criar o produto" });

        }
    },

    async atualizarProduto(req,res){
        try{
            const { id } = req.params;
            //const matricula = req.body.matricula;
            const { descricao, quantidade, valor, proprietario_id } = req.body;
            const produto = await prisma.produtos.update({
                where: { id: Number(id) },
                data: { 
                    descricao, 
                    quantidade, 
                    valor, 
                    proprietario_id  
                }
            })
            res.status(200).json({ message: "Atualização realizada com sucesso" });

        }catch(error){
            res.status(500).json({ error: "Erro ao atualizar o produto" });
        }

    },

    async deletarProduto(req,res){
        try {
            //const id = req.params.id;
            const { id } = req.params;
            await prisma.produtos.delete(

                {
                    where: { id: Number(id) }
                }


            )
            res.status(204).json({ message: "Produto removido com sucesso." } )

        }catch(error){
            res.status(500).json({ error: "Erro ao remover o produto" });
        }
    }

};