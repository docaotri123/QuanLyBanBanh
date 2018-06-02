var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CakeCategorySchema=new Schema(
    {
        nameCategory:{type:String,required:true}
    }
);

// Export model.
module.exports=mongoose.model("CakeCategory",CakeCategorySchema);

