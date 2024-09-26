const Product=require("../Models/Productmodel");

class APIfeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    filtering() {
        const queryObj = { ...this.queryStr }; // Initialize query object from queryStr
        const excludedFields = ['sort', 'page', 'limit'];
        excludedFields.forEach(field => delete queryObj[field]); // Remove unnecessary fields
    
        let queryStr = JSON.stringify(queryObj); 
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match); // Add MongoDB query operators like $gte, $lte, etc.
    
        this.query = this.query.find(JSON.parse(queryStr)); // Use the filtered query to search products
        return this;
    }
    

    sorting() {
        if (this.queryStr.sort) {
            const SortBy = this.queryStr.sort.split(',');
            const sortBy = {};
    
            SortBy.forEach(field => {
                const order = field.startsWith('-') ? -1 : 1;
                const updatedField = field.replace(/^-/,'');
                sortBy[updatedField] = order;
            });
    
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
    
        return this;
    }
    
    pagination() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 9;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


const productCtrl={

    

    getproducts: async (req, res) => {
        try {
            
            const features = new APIfeatures(Product.find(),req.query).filtering().sorting().pagination();
           
            const products=await features.query;
            res.status(201).json(
            {products});
            
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error }); 
        }
    },
    addProduct: async (req, res) => {
        console.log("File Info:", req.file);  // Log the file information
        console.log("Body Info:", req.body);
    
        try {
            const {
                productId,
                title,
                description,
                price,
                category,
                stock,
                discount,
                brand,
                seller,
                
            } = req.body;
            
            const product = await Product.findOne({ productId, seller });
    
            if (product) {
                return res.status(400).json({ message: "Product already exists for this seller" });
            }
    
            const filename = req.file.filename;
            console.log(filename);
            const fileUrl = `http://localhost:5000/uploads/${filename}`;
            console.log(fileUrl) ;
    
            const newProduct = new Product({
                productId,
                title,
                image: fileUrl, // Store URL as a string
                description,
                price,
                category,
                stock,
                discount,
                brand,
                seller
            });

            console.log(newProduct)
    
            await newProduct.save();
            res.status(201).json({ message: "Product created successfully", product: newProduct });
        } catch (err) {
            console.error("Error:", err);
            res.status(400).json({ message: "Something went wrong!", err });
        }
    },
    


    deleteProduct: async (req,res)=>{

        try{
            const {
                productId,
                seller
            } = req.body;

            const product= await Product.findOne({productId,seller});

            if(!product){
               return res.status(404).json({message:"No Product like this"});
            }

         await product.deleteOne();
           res.status(200).json({ message: "Product deleted successfully" });
        }

        catch(err){
            res.status(400).json({message:"Something went wrong!",err})
        }
    },

    updateProduct:async(req,res) => {
        try{
            const {title,price,description,content,images,category} = req.body;

            if(!images) return res.status(500).json({msg:"No Image Upload"})

            await Product.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })

            res.json({msg:"Updated a Product"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product", error });
        }
    },


    
    
}


module.exports=productCtrl;