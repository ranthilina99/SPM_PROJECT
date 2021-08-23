const StockCategoryController = require('../models/StockCategory');

const addStockCategory = async (req, res) => {
    if (req.body) {
        const category = new StockCategoryController(req.body);
        if(req.file){
            StockCategoryController.work_template =req.file.path
        }

        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllStockCategory = async (req, res) => {

    await StockCategoryController.find()
        // .populate('stock_items', 'item_name item_quentity item_suppliers item_image item_price item_description  item_date')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSpecificStockCategory = async (req, res) => {
    if (req.params && req.params.id) {
        await StockCategoryController.findById(req.params.id)
            .populate('stock_items', 'item_name item_quantity item_suppliers item_image item_price item_description item_date')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
//
const editSpecificStockCategory = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await StockCategoryController.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteSpecificStockCategory = async (req, res) => {
    if (req.params && req.params.id) {

        await StockCategoryController.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({data: response});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}


const addItemsToCategories = async (req, res) => {
    if (req.params) {

        const itemID = req.body.itemID;
        const categoryID=req.body.categoryID;

        const post = await StockCategoryController.findById(categoryID);

        console.log(post.stock_items);

        await post.stock_items.push(itemID);

        await StockCategoryController.findByIdAndUpdate(categoryID,post)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}



module.exports = {
    addStockCategory,
    getAllStockCategory,
    getSpecificStockCategory,
    editSpecificStockCategory,
    deleteSpecificStockCategory,
    addItemsToCategories,
};
