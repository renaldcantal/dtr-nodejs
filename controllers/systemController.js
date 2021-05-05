const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const DTR = mongoose.model('DTR');

router.get('/', (req, res) => {
    res.render("dtr/addOrEdit", {
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
    var dtr = new DTR();
    dtr.fullName = req.body.fullName;
    dtr.address = req.body.address;
    dtr.jobtype = req.body.jobtype;
    dtr.companyname = req.body.companyname;
    dtr.timeInAm = req.body.timeInAm;
    dtr.timeOutAm = req.body.timeOutAm;
    dtr.timeInPm = req.body.timeInPm;
    dtr.timeOutPm = req.body.timeOutPm;

    dtr.save((err, doc) => {
        if (!err)
            res.redirect('dtr/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("dtr/addOrEdit", {
                    viewTitle: "Insert",
                    dtr: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    DTR.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('dtr/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("dtr/addOrEdit", {
                    viewTitle: 'Update',
                    dtr: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    DTR.find((err, docs) => {
        if (!err) {
            res.render("dtr/list", {
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
    DTR.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("dtr/addOrEdit", {
                viewTitle: "Update",
                dtr: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    DTR.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/dtr/list');
        }
        else { console.log('Error in student delete :' + err); }
    });
});

module.exports = router;