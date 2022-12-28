const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String, 
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    completed: Boolean
}, { timestamps: true });

module,exports = mongoose.model('Product', productSchema);
