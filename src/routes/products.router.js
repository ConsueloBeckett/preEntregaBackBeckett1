const express = require('express');
const router = express.Router();

const products = [
    {
        "name": "Berenjena", "price": 2500, "quantity": 10, "image": "image/image",
        "characteristic":"es una hortaliza de color morado oscuro que se utiliza en muchas preparaciones culinarias.",
        "category":"verdura"
    },
    {
        "name": "Arandano","price": 5000, "quantity": 8, "image": "image/image",
        "characteristic":"es una fruta pequeña y dulce que se utiliza en postres y otros platos dulces.",
        "category":"fruta"
    },
    {
        "name": "Frutilla", "price": 3000, "quantity": 20, "image": "image/image",
        "characteristic":"es una fruta dulce y aromática que se utiliza en postres y otros platos dulces.",
        "category":"fruta"
    },
    {
        "name": "Cereza", "price": 5000,  "quantity": 20, "image": "image/image",
        "characteristic":"es una fruta dulce y jugosa que se consume fresca o en conserva",
        "category":"fruta"
    },
    {
        "name": "Durazno", "price": 2500, "quantity": 15, "image": "image/image",        
        "characteristic":"es una fruta jugosa y dulce que se consume fresca o en conserva.",
        "category":"fruta"
    },
    {
        "name": "Sandia",  "price": 3000, "quantity": 20, "image": "image/image",
        "characteristic":"es una fruta grande y refrescante que se consume principalmente en verano.",
        "category":"fruta"
    },
    {
        "name": "Tomate", "price": 1500, "quantity": 30, "image": "image/image",
        "characteristic":"es una hortaliza muy versátil que se utiliza en muchas preparaciones culinarias.",
        "category":"verdura"
    },
    {
         "name": "Mango", "price": 3000, "quantity": 15, "image": "image/image",
        "characteristic": "es una fruta tropical dulce y jugosa que se consume fresca o en conserva.",
        "category":"fruta"
    },
    {
          "name": "Pera",  "price": 2000, "quantity": 25, "image": "image/image",
        "characteristic":"es una fruta  dulce y jugosa que se consume tantp cruda como al horno.",
        "category":"fruta"

    },
    {
         "id":1, "name": "Kiwi",  "price": 2000, "quantity": 12, "image": "image/image",
        "characteristic":"es una fruta  dulce y jugosa.",
        "category":"fruta"
    }
]

//products
router.get('/api/products', (req, res) => {
    res.json({ products });
});

//id
router.get('/api/products/:pid', (req, res) => {
    //const id = {id: products.length + 1, id:  product.id || "id"} 
    const pid = parseInt(req.params.pid); 
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.json(product);
    }else {

        return res.status(400).json({ message: 'We cant find the product' });
    
    }
});


// Ruta para agregar un nuevo producto
router.post('/api/products', (req, res) => {

    const newProduct = req.body;

    // Validamos que se proporcionen todos los campos
    if (!newProduct.id ||
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category) {
            res.json({ message: 'Product added succesfully' });
       
    }else{

        return res.status(400).json({ message: 'Fill all the fields to continue' });
    }

    products.push(newProduct);

});

// Ruta para actualizar un producto por su ID (PUT /:pid)
router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    // Validamos que se proporcionen campos para actualizar
    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'You have to add one field at least' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product isnt found.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});

// Ruta para eliminar un producto por su ID (DELETE /:pid)
router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);


    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product havent been found.' });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.json(deletedProduct[0]);
});


module.exports = router;