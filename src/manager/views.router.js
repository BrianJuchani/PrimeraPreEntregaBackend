import express from "express";
import productRouter from '../router/product.router.js'
import cartRouter from '../router/cart.router.js'
import morgan from 'morgan';
// import { server } from "socket.io"
import { __dirname } from "./utils.js";
import handlebars from 'express-handlebars'
import viewsRouter from '../router/views.router.js'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(__dirname + "public"))
app.use(morgan('dev'))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use('/',viewsRouter)
app.listen(8080, () => console.log("server ok on port 8080"));

// const httpServer = app.listen(8080,()=>{
//     console.log('escuchando al puerto 8080')
// })
// const socketServer= new Server (httpServer)

// socketServer.on('connection ',(socket)=>{
//     console.log(`usuario conectado ${socket.id}`);
//     socket.on('disconect',()=>console.log('usuario desconectado'))
// })