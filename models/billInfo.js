var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillInfoSchema = new Schema(
    {
        cake: { type: Schema.ObjectId, ref: 'Cake', required: true },
        bill: { type: Schema.ObjectId, ref: 'Bill', required: true },
        priceNow: { type: Number, required: true },
        count: { type: Number, required: true }
    }
);

// Export model.
module.exports = mongoose.model("BillInfo", BillInfoSchema);

