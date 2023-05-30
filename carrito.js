class Producto{
    constructor(nombre = '',path = '',precio = 0,unidades){

        this.id = 0
        
        this.nombre = nombre || 'Indefinido'
        this.path = path || '' //path a la imagen
        this.unidades = unidades || 1
        this.precio = precio || 0
        this.subtotal = 0;


    }
}




// 

class Carrito{
    constructor(){
        this.productos = [];
    }

    sortAll(prop){
        return this.productos.sort((a,b) => {
            return a[prop]>b[prop]?1:a[prop]<b[prop]?-1:0})
    }

    add(id,q = 1){
        
        let producto = new Producto;
        Object.assign(producto,productosLista[id])

        producto.unidades = q;
        producto.subtotal = producto.precio*producto.unidades

        this.productos.push(producto);

        this.mergeAllUnits()
        this.sortAll('unidades')

    }

    reset(){
        this.productos = [];
    }

    deleteProduct(id){
        this.productos = this.productos.filter((prod) => prod.id !== id);
    }

    deleteUnits(id,q = 1){
        let obj = this.getProduct(id)[0];
        this.deleteProduct(id);
        let units = obj.unidades-q < 0 ? 0 : obj.unidades -q;
        this.add(obj.id,units);
    }

    mergeUnits(id){
        let objArray = this.getProduct(id)
        
        if(objArray.length>1){
            let suma = 0;

            objArray.forEach(e=>suma+=e.unidades)

            this.deleteProduct(objArray[0].id)
            this.add(objArray[0].id,suma);
        }

    }

    mergeAllUnits(){
        this.productos.forEach(e=>{
            this.mergeUnits(e.id) 
        })
    }


    getProduct(id){
        return this.productos.filter((prod) => prod.id == id);
    }




}

let carrito = new Carrito;

let productosLista = [
    new Producto('Camiseta Messi Campeón del Mundo','',800),
    new Producto('Camiseta Messi Barcelona 09/10','',500),
    new Producto('Balón de Oro (Réplica)','',250),
    new Producto('Copa del Mundo (Réplica)','',1000),
]

setIDs(productosLista);

// productosLista.forEach(e=>{
//     carrito.add(e.id)
// });

carrito.add(0,1)
carrito.add(0,3)
carrito.add(3,4)
carrito.add(2,8)
// carrito.deleteUnits(0,1)
// carrito.deleteUnits(3,1)
carrito.add(1,1)
carrito.add(3,1)

// carrito.deleteUnits(1,5)
// carrito.deleteUnits(1,4)





carrito.sortAll('unidades').reverse()
console.table(carrito.productos)


function setIDs(arr) {
    arr.forEach((e,i) => e.id = i);
}
