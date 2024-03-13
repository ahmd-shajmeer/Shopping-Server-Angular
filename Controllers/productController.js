const products = require('../Models/productModel')

// View All Products
exports.getAllProducts = async (req,res) =>{
    try{
        const result = await products.find()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

// Get one product
exports.getOneProduct = async (req,res) =>{
    const {id} = req.params
    try{
        const result = await products.findOne({id})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}