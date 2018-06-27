var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var CustomerSchema=new Schema(
    {
        name:{type:String,required:true},
        username:{type:String,unique:true},
        password:{type:String,required:true},
        isVerified: { type: Boolean, default: false },
        phone:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        style:{type:String,required:true}
    }
);


// Export model.
module.exports=mongoose.model("Customer",CustomerSchema);

