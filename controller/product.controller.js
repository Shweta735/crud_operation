const Product = require('../models/product.model');

var productExport = {};

productExport.create = function(req,res){
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err){
        if (err) {
            res.send(err);
        }
        res.render('message',{message : 'Product Created successfully' })
    })
}

productExport.get = function(req,res){
    Product.find({},function (err,data) {
        if (err) {
            res.send(err);
        }
        var result  = [];
       for(var i=0;i<data.length;i++){
        var entry = {};
        entry.name = data[i].name;
        entry.price = data[i].price;
        result.push(entry)
       }
        res.render('displayProducts',{result : result})
    })
}

productExport.update = function(req,res){

    if(req.body.name && req.body.price){
         Product.updateOne({name : req.body.name },{$set : req.body },function (err,data) {
        if (err) {
            res.send(err);
        }
        if(data.nModified == 1)
          res.render('message',{message : 'Successfully updated' })
        else
           res.render('message',{message : 'Product name not found in database' })
    })
     }else
        res.render('message',{message : 'Provide both name and price' })
}

productExport.delete = function(req,res){
    Product.deleteOne({name : req.body.name},function (err,data) {
        if (err) {
            res.send(err);
        }
        if(data.deletedCount == 0)
           res.render('message',{message :'Product name not found in database'})
        else
            res.render('message',{message :'Successfully deleted'})
    })
}

module.exports = productExport