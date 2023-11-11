const socketClient=io()

const form=document.getElementById('form')
const products=document.getElementById('products')

form.onsubmit=(e)=>{
    e.preventDefault()
    const title=document.getElementById('title').value
    const description=document.getElementById('description').value
    const code = document.getElementById('code').value
    const price=document.getElementById('price').value
    const stock=document.getElementById('stock').price
    const category=document.getElementById('category').value
    const thumbnails=document.getElementById('thumbnails').value
    const product={
        title:title,
        description:description,
        code:code,
        price:price,
        stock:stock,
        category:category,
        thumbnails:thumbnails,
    }
    socketClient.emit('newProduct',product)
}
socketClient.on('allProducts',(lista)=>{
    let info= ''
    lista.forEach(p=>{
        info += `<p>${p.title}</p>`
    })
    products.innerHTML = info

})
socketClient.on('message', (msg) => {
    console.log(msg);
})    