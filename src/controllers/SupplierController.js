const SupplierController = require('../models/Suppliers');

const addSupplier = async (req, res) => {
    if (req.body) {
        const item = new SupplierController(req.body);
        if(req.file){
            SupplierController.work_template =req.file.path
        }

        await item.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllSuppliers = async (req, res) => {

    await SupplierController.find()
        //  .populate('stock_items', 'item_name item_quentity item_suppliers item_image item_price item_description  item_date')
        .then(data => {
            res.status(200).send({ data: data });

        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


const getSpecificSupplier = async (req, res) => {
    if (req.params && req.params.id) {
        await SupplierController.findById(req.params.id)
            //.populate('stock_items', 'item_name item_quentity item_price item_date item_suppliers item_image  item_description')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}
//
const editSpecificSupplier = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await SupplierController.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteSpecificSupplier = async (req, res) => {
    if (req.params && req.params.id) {

        await SupplierController.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({data: response});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
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
    addSupplier,
    getAllSuppliers,
    getSpecificSupplier,
    editSpecificSupplier,
    deleteSpecificSupplier,
    // addItemsToCategories,
    // MailSend
};
