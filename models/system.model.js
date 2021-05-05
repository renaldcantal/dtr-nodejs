const mongoose = require('mongoose');

var dtrSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    address: {
        type: String
    },
    jobtype: {
        type: String
    },
    companyname: {
        type: String
    },
    timeInAm: {
        type: String
    },
    timeOutAm: {
        type: String
    },
    timeInPm: {
        type: String
    },
    timeOutPm: {
        type:String 
    }
});

mongoose.model('DTR', dtrSchema);