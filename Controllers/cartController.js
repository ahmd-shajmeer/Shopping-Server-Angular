const carts = require('../Models/cartModel')
const { rawListeners } = require('../Models/productModel')

// add to cart
exports.addToCart = async (req,res) =>{
    const { id,title,price,image,quantity } = req.body
    const userId = req.payload
    try{
        const existingProduct = await carts.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity += 1
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("Product added to your cart")
        }else{
            const newProduct = new carts({
                id,title,price,image,quantity,totalPrice:price,userId
            })
            await newProduct.save()
            res.status(200).json("Product added to your cart")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get cart
exports.getCart = async (req,res) =>{
    const userId = req.payload
    try{
        const allCarts = await carts.find({userId})
        res.status(200).json(allCarts)
    }catch(err){
        res.status(401).json(err)
    }
}

// remove cart
exports.deleteCart = async (req,res) =>{
    const {id} = req.params
    try{
        const removeCart = await carts.findByIdAndDelete({_id:id})
        res.status(200).json(removeCart)
    }catch(err){
        res.status(401).json(err)
    }
}

// increment quantity
exports.incrementCart = async (req,res) =>{
    const {id} = req.params
    try{
        const selectedProdcut = await carts.findOne({_id:id})
        selectedProdcut.quantity += 1
        selectedProdcut.totalPrice = selectedProdcut.quantity * selectedProdcut.price
        selectedProdcut.save()
        res.status(200).json(selectedProdcut)
    }catch(err){
        res.status(401).json(err)
    }
}

// decrement quantity
exports.decrementCart = async (req,res) =>{
    const {id} = req.params
    try{
        const selectedProdcut = await carts.findOne({_id:id})
        selectedProdcut.quantity -= 1
        if(selectedProdcut.quantity == 0){
            await carts.deleteOne({_id:id})
            res.status(200).json("Quantity Updated")
        }else{
            selectedProdcut.totalPrice = selectedProdcut.quantity * selectedProdcut.price
            selectedProdcut.save()
            res.status(200).json(selectedProdcut)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// empty cart
exports.emptyCart = async (req,res) =>{
    const userId = req.payload
    try{
        const result = await carts.deleteMany({userId})
        res.status(200).json("Cart Cleared Completely")
    }catch(err){
        res.status(401).json(err)
    }
}
