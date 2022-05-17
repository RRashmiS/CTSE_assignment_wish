const router = require("express").Router();
let WishListItem = require("../models/wishlistItemsModel")

router.route("/add").post((req,res)=>{
    const name = req.body.name
    const price = req.body.price
    const stockAvailable = Number(req.body.brandName)
    const description = req.body.description

    const newWishItem = new WishListItem({
        name,price,description,stockAvailable
    })

    newWishItem.save().then(()=>{
        res.json("Item added to wish list")
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/getAll").get((req,res)=>{
    Product.find().then((products)=>{
        res.json(products)
    }).catch((error)=>{
        console.log(error)
    })
})

router.route("/update/:id").put(async(req,res) =>{
    let userId = req.body.id;
    const {name,price,description,stockAvailable,brandName,category} = req.body;

    const updateProduct = {
        name,
        price,
        description,
        stockAvailable,
        brandName,
        category
    }

    const update = await Product.findByIdAndUpdate(userId,updateProduct)
    .then(() => {
        res.status(200).send({status: "Product Updated",user: update})
    }).catch((error)=>{
    res.status(500).send({status: "Error with update"})
    })
})
router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.body.id;
    await Product.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "Product Deleted"})
    }).catch((error)=>{
        res.status(500).send({status: "Error with delete"})
    })
})

module.exports= router