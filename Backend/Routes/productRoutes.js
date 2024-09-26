const router= require('express').Router();
const productCtrl=require('../Controllers/productCtrl');
const auth=require("../Middleware/auth");
const sellerAuth=require("../Middleware/sellerAuth");
const upload=require("../Middleware/multer");


router.get("/getproducts",productCtrl.getproducts);
router.post("/addProduct", auth, sellerAuth,upload.single('image'), productCtrl.addProduct);
router.get('/:id', productCtrl.getProductById);
router.post("/deleteProduct",auth,sellerAuth,productCtrl.deleteProduct);

module.exports=router;