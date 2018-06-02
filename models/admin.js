var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var AdminSchema=new Schema(
    {
        email:{type:String,required:true},
        userName:{type:String},
        password:{type:String,required:true},
        style:{type:Number,required:true}
    }
);

// Export model.
module.exports=mongoose.model("Admin",AdminSchema);

