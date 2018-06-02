var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CustomerSchema=new Schema(
    {
        name:{type:String,required:true},
        username:{type:String},
        password:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true},
        birthDay:{type:Date},
        style:{type:String,required:true}
    }
);

// Export model.
module.exports=mongoose.model("Customer",CustomerSchema);

