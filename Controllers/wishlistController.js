const wishlists = require('../Models/wishlistModel')

// add to wishlist
exports.addToWishlist = async (req,res) =>{
    const { id,title,price,description,category,image,rating } = req.body
    const userId = req.payload
    try{
        const existingProduct = await wishlists.findOne({id,userId})
        if(existingProduct){
            res.status(406).json("Item is Already in Your Wishlist")
        }else{
            const newProduct = new wishlists({
                id,title,price,description,category,image,rating,userId
            })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get wishlist
exports.getWishlist = async (req,res) =>{
    const userId = req.payload
    try{
        const allWishlists = await wishlists.find({userId})
        res.status(200).json(allWishlists)
    }catch(err){
        res.status(401).json(err)
    }
}

// remove from wishlist
exports.deleteWishlist = async (req,res) =>{
    const {id} = req.params
    try{
        const removeWishlist = await wishlists.findByIdAndDelete({_id:id})
        res.status(200).json(removeWishlist)
    }catch(err){
        res.status(401).json(err)
    }
}