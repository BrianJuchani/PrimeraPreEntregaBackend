import { ProductManager } from '../manager/productManager.js';
import {Router} from 'express';
import { ProductValidator } from '../middlewares/productValidator.js';
const productManager =new ProductManager("./data/products.Json")
const router = Router();


router.get('/' ,async (req,res)=>{ 
    try {
        const {limit}= req.query
        const products =await productManager.getProducts();
        if(!limit)res.status(200).json(products)
        else{
            const produtbyLimit= await productManager.getProductsByLimit(limit)
            res.status(200).json(produtbyLimit)
        }
    } catch (error) {
        res.status(500).json(error.message)
    } 
})

router.post('/',ProductValidator,async(req,res)=>{
    try {
        const productos = {...req.body};
        console.log(productos)
        const  AddProduct= await productManager.addProduct(productos);
        res.status(200).json(AddProduct)
        
    } catch (error) {
        res.status(500).json(error.message)
        
    }

      
})  
router.get('/:id',async(req,res)=>{
    try {
        const {id}= req.params
        const prod=await productManager.getProductById(Number(id))
        if(!prod)res.status(404).json({message:'id no encontrado'})
        else res.status(200).json(prod)
    } catch (error) {
        res.status(500).json (error.message)   
    }
})
router.delete('/:id',async (req,res)=>{
    try {
        const {id}=req.params
        const iD=Number(id)
        await productManager.getDeleteProduct(iD)
        res.json({message:`product id : ${iD} deleted`})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const {id}= req.params
        const Id=Number(id)
        const pro =await productManager.updateProduct(Id)
        if(!pro)res.status(404).json({message:'product not found'})
        else res.status(200).json({message:`product id: ${id}updated`})
    } catch (error) {
        res.status(500).json(error.message)
        
    }
})


export default router

