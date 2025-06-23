const { model, Schema } = require('../connection');

const mySchema = new Schema({
    title : String,
    brand : { type : String },
    category:{type: String, default : 'unknown'},
    price : { type : Number, require : true},
    description: {type: String, default: 'unknown'},
    image : {type : String },
    videourl : {type : String },
    createdAt : { type : Date, default: Date.now }
});

module.exports = model('kit', mySchema);