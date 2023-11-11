import express from "express";
import productRouter from './router/product.router.js'
import cartRouter from './router/cart.router.js'
import RealTimeProducts from './router/realTimeProducts.router.js'
import morgan from 'morgan';
// import {  server } from "socket.io"
import {Server}from 'socket.io'
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.router.js'
import { ProductManager } from "./manager/productManager.js";
const productManager=new ProductManager("./src/data/products.json")

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.use(morgan('dev'))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)               
app.use('/',viewsRouter)
app.use('/view',RealTimeProducts)
app.post('/', (req, res)=>{
    const { msg } = req.body;
    socketServer.emit('message', msg);
    res.send('se envió el mensaje al socket del cliente')
});
const httpServer=app.listen(8080, () => console.log("server ok on port 8080"));

const socketServer =new Server(httpServer)

socketServer.on('connection',async(Socket)=>{
    console.log(`usuario conectado ${Socket.id}`)
    Socket.on('newProduct',async(product)=>{
        await productManager.addProduct(product)
        const lista =await productManager.getProducts()
        socketServer.emit('allProducts',lista)
    })
    const lista= await productManager.getProducts()
    socketServer.emit('allProducts',lista)
})

