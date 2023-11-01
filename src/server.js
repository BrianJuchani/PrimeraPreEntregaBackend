import express from "express";
import productRouter from './router/product.router.js'
import cartRouter from './router/cart.router.js'
import morgan from 'morgan';

const app=express()

app.use(express.json)
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/products',productRouter)
app.use('api/cart',cartRouter)

const PORT = 8080;
app.listen(PORT,()=>console.log(`server ok on port ${PORT}`))