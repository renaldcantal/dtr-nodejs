const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory');

router.get('/', (req, res) => {
    res.render("inventory/addOrEdit", {
        viewTitle: "Insert Details Here"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var inventory = new Inventory();
    inventory.fullName = req.body.fullName;
    inventory.address = req.body.address;
    inventory.date = req.body.date;
    inventory.time = req.body.time;
    inventory.itemName = req.body.itemName;
    inventory.unitPrice = req.body.unitPrice;
    inventory.quantity = req.body.quantity;
    inventory.total = req.body.total;

    inventory.save((err, doc) => {
        if (!err)
            res.redirect('inventory/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("inventory/addOrEdit", {
                    viewTitle: "Insert",
                    inventory: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Inventory.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('inventory/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("inventory/addOrEdit", {
                    viewTitle: 'Update',
                    inventory: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Inventory.find((err, docs) => {
        if (!err) {
            res.render("inventory/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving student list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Inventory.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("inventory/addOrEdit", {
                viewTitle: "Update",
                inventory: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Inventory.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/inventory/list');
        }
        else { console.log('Error in student delete :' + err); }
    });
});

module.exports = router;