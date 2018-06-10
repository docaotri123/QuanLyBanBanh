var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CakeCategorySchema=new Schema(
    {
        stt:{type:Number},
        nameCategory:{type:String,required:true}
    }
);

// Export model.
module.exports=mongoose.model("CakeCategoryVM",CakeCategorySchema);

