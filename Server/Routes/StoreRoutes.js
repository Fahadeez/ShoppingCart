const mongoose = require('mongoose');
const Products = mongoose.model('Products')
const Sales = mongoose.model('Sales')


module.exports = app => {

	app.get('/store/getAllProducts', async (req, res) => {
		const query = Products.find()
		query.exec((err, products) => {
			if (err) {
				console.log(err)
				return res.send('Error in DB').status(400);
			}
			if (products) {
				console.log(products);
				return res.send(products).status(200);
			}
		})
    });
    
    
	app.post('/store/getProductByName', async (req, res) => {
		const { name } = req.body;
         console.log("name in server api", name)
		if (name) {
			const query = Products.find({Name: name})
			query.exec((err, products) => {
				if (err) {
					return res.send('Error in DB').status(400);
				}
				if (products) {
                    console.log("Products based on query",products)
					return res.send(products).status(200);
				}
            })
        }
        // return res.send('error').status(400)
    })

    app.post('/store/proceedToCheckout', async (req, res) => {
        const { sale } = req.body;
        var date = new Date();
         console.log("sale in server api", sale)
         const newSale = new Sales({ Products: sale.Products, TotalPrice: sale.TPrice,
             Date: date })
         newSale.save(function(err){
            if(err){
                return res.send('error').status(400)
            }
            return res.send('ok').status(200)
         })   
       
        // return res.send('error').status(400)
    })



};
