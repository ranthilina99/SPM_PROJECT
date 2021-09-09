const Store = require('../models/store.model');

const createStore = async (req, res) => {
    if (req.body) {
        const store = new Store(req.body);
        await store.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllStores = async (req, res) => {
    // await Store.find({}).populate('employee', 'name')
    //     .then(data => {
    //         res.status(200).send({ data: data });
    //     })
    //     .catch(error => {
    //         res.status(500).send({ error: error.message });
    //     });
    try {
        const products = await Store.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getSpecificStore = async (req, res) => {

    // if (req.params && req.params.id) {
    //
    //     await Store.findById(req.params.id)
    //         .populate('employee', 'name')
    //         .then(response => {
    //             res.status(200).send({ data: response });
    //         })
    //         .catch(error => {
    //             res.status(500).send({ error: error.message });
    //         });
    // }
    try {
        const product = await Store.findById(req.params.id);

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}

const editStore = async (req, res) => {

    if (req.params && req.params.id) {

        const updated = req.body;

        await Store.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }

}

const deleteStore = async (req, res) => {

    if (req.params && req.params.id) {

        await Store.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    }

}

// const calculateAmount = async (req, res) => {
//     if (req.params && req.params.id) {
//         const course = await Course.findById(req.params.id).populate('subjects', 'amount')
//         let totalAmount = 0;
//
//         if (course.subjects.length > 0) {
//             course.subjects.map((subject) => {
//                 totalAmount += subject.amount;
//             });
//         }
//         res.status(200).send({ totalAmount: totalAmount });
//     }
// }

module.exports = {
    createStore,
    getAllStores,
    getSpecificStore,
    editStore,
    deleteStore
};