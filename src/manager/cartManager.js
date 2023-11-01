import fs from 'fs';

export class CartManager{
    constructor(path){
        this.path= path;
        this.itemId=1;
    }

    async getCarts(){
        try {
            if(fs.existsSync(this.path)){
                const carts=await fs.promises.readFile(this.path,"utf-8")
                return JSON.parse(carts)
            }else return []
        } catch (error) {
            console.log(error)
        }
    }
    async createCart() {
        try {
            const cart={
                id:this.itemId++,
                products:[]
            }
            const cartsFile=await this.getCarts()
            cartsFile.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
            return cart
        } catch (error) {
            console.log(error)
        }
    }
    async getCartById(id){
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

    async saveProductToCart(idCart, idProd){
        const carts = await this.getCarts();
        const cartExists = await this.getCartById(idCart);
        if(cartExists){
            const existProdInCart = cartExists.products.find(p => p.id === idProd);
            if(existProdInCart) existProdInCart.quantity + 1
            else {
                const prod = {
                    product: idProd,
                    quantity: 1
                };
                cartExists.products.push(prod);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cartExists;
        }
      }
}
      