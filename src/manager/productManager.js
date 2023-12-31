import fs from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path;
        this.itemId = 1
    }

    async addProduct(ProductInf) {
        try {
            let productos = [];
            
            try{
                productos = await this.getProducts();
            } catch (error) {
                productos = [];
            }

            const product = {
                id: this.itemId++,
                ...ProductInf
            };

            productos.push(product);


            await fs.promises.writeFile(this.path, JSON.stringify(productos));
            return productos;
        } catch (error) {
            console.error(error);
        }
    }



    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }


    async getProductById(id){
        const buscardor= await fs.promises.readFile(this.path, 'utf-8')
        const buscar =await JSON.parse(buscardor)
        const encontrado=await buscar.find((itemID)=>itemID.id===id)
        if(buscardor){
            console.log('----------ID encontrado--------------')
            console.log(encontrado)
        }else{
            console.log('not found'+ id)
        }
        return encontrado

    }
    async getDeleteProduct(DeleteId){
        let productos=await this.getProducts()
        const eliminado=productos.findIndex(produc => produc.id === DeleteId)
        if(eliminado !== - 1){
            productos.splice(eliminado,1)
            await fs.promises.writeFile(this.path ,JSON.stringify(productos));
            console.log('-----delet -----',eliminado)

           }else{
            console.log('producto encontrado para borrar')
        }
    }
    
      
    async updateProduct(obj, Id){
        try {
            const products = await this.getProducts();  
            const index = products.findIndex(prod => prod.id === Id);  
            if(index === -1) return false;
            else{
                const prodUpdt = { ...obj, Id };
                products[index] = prodUpdt;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
      }


    
    
    async getProductsByLimit(limit){
        try {
            const product = await this.getProducts();
            if(!limit || limit >= product.length){
                return product
            }else{
                return product.slice(0,limit)
            }
            
        } catch (error) {
            console.log(error)
            
        }
     

        
    }


}


