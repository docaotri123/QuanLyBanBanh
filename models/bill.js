var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new Schema(
    {
        dateCheckIn: { type: Date },
        dateCheckOut: { type: Date },
        disCount: { type: Number },
        status: { type: String, required: true },
        address: { type: String },
        customer: { type: Schema.ObjectId, ref: 'Customer', required: true }
    }
);

// Export model.
module.exports = mongoose.model("Bill", BillSchema);

