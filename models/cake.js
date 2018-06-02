var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CakeSchema=new Schema(
    {
        nameCake:{type:String,required:true},
        oldPrice:{type:Number,required:true},
        newPrice:{type:Number,required:true},
        cakeCategory:{type:Schema.ObjectId,ref:'CakeCategory',required:true},
        image:{type:String,required:true}
    }
);

// Export model.
module.exports=mongoose.model("Cake",CakeSchema);

