'use strict'
//llamar
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const Product = require('./models/product')


const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//rutas  


app.get('/api/product', (req, res) => {
//buscar todo	
	Product.find({}, (err, products) => {
	if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
	if (!products) return res.status(404).send({message: `No existen productos`})	
	res.send(200, {products})
		
	})	
}) 
	
//GET	
app.get('/api/product/:productId', (req, res) => {
	let productId = req.params.productId
	
	Product.findById(productId, (err, product) => {
	   if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
		
		if (!product) return res.status(404).send({message: `El producto no existe`})
		
		res.status(200).send({ product })
	})
})

//POST
app.post('/api/product', (req, res) => {
	console.log('POST /api/product')
	console.log(req.body)
	
	let product = new Product()
	product.name = req.body.name
	product.price = req.body.price
	product.category = req.body.category
	
	
	product.save((err, productStored) => {
	if (err) res.status(500).send({message: `Error al salvar la Base de Datos: ${err}`})
		
	res.status(200).send({product: productStored})
	})										  
})

//PUT
app.put('/api/product/:productId', (req, res) => {
	let productId = req.params.productId
	let update = req.body
	
	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
	if (err) rest.status(500).send({message: `Error al actualizar el producto: ${err}`})	
	
	res.status(200).send({ product: productUpdated})		
	})
})

//DELETE
app.delete('/api/product/:productId', (req, res) => {
	let productId = req.params.productId
	
	Product.findById(productId, (err, product) => {
		if (err) rest.status(500).send({message: `Error al borrar el producto: ${err}`})
		
		product.remove(err => {
			if (err) rest.status(500).send({message: `Error al borrar el producto: ${err}`})
			res.status(200).send({message: 'El producto a sido eliminado'})
		})
	})
})


mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida....')
	
	app.listen(port, () => {
	console.log(`Api rest http://localhost:${port}`)
	})
})

