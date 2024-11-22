const express = require('express')
const ProdutoController = require('../controllers/ProdutoController')

const router = express.Router()
router.get('/produto/:id',ProdutoController.buscaProduto)
router.get('/produtos',ProdutoController.listarProdutos)
router.post('/produto',ProdutoController.criarProduto)
router.delete('/produto/:id', ProdutoController.deletarProduto)
router.put('/produto/:id',ProdutoController.atualizarProduto)

module.exports = router
