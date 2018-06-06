var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var TokenSchema=new Schema(
    {
        customer: { type:Schema.ObjectId, required: true, ref: 'Customer' },
        token: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
    }
);

// Export model.
module.exports=mongoose.model("Token",TokenSchema);

