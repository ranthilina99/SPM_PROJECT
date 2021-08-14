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
        .then(data => {
            res.status(200).send({ data: data });
            console.log(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSpecificStockCategory = async (req, res) => {
    if (req.params && req.params.id) {
        await StockCategoryController.findById(req.params.id)
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

        console.log("itemID:",itemID);

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
//
//
// const MailSend = async (req, res) => {
//
//     try {
//         let status = req.body.status;
//
//         var transporter = nodemailer.createTransport({
//
//             service: 'Gmail',
//             auth: {
//                 user: 'hugoproducts119@gmail.com',
//                 pass: '123hugo@12'
//             },
//
//             // tls: {
//             //     rejectUnauthorized: false
//             // },
//         });
//
//         var mailOptions = {
//
//             from: 'hugoproducts119@gmail.com',
//             to: 'salikamadhushanka33@gmail.com',
//             subject: 'AF Conference Company',
//             html: `
//             <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
//             <h2 style="text-align: center; color: black;">${status}.</h2>
//             </div>`
//         };
//
//         await transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//
//         // res.status(200).json({auth_token: 'token'})
//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({msg: "server Error..."});
//     }
// }


module.exports = {
       addStockCategory,
       getAllStockCategory,
       getSpecificStockCategory,
       editSpecificStockCategory,
       deleteSpecificStockCategory,
       addItemsToCategories,
    // MailSend
};
