'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = Schema({
	name: String,
	price: { type: Number, default: 0 },
	category: { type: String, enum: ['disparos', 'carreras', 'sandbox', 'deportes', 'rol', 'accion', 'terror', 'eroge', 'multijugador', 'plataforma'] },
})
	
	
module.exports = mongoose.model('Product', ProductSchema)