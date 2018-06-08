var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var Schema=mongoose.Schema;

var CustomerSchema=new Schema(
    {
        name:{type:String,required:true},
        username:{type:String,unique:true},
        password:{type:String,required:true},
        isVerified: { type: Boolean, default: false },
        phone:{type:String,required:true},
        email:{type:String,required:true},
        style:{type:String,required:true}
    }
);

// kiểm tra mật khẩu có trùng khớp
// CustomerSchema.methods.validPassword = function(password) {
//     console.log('*****',bcrypt.compareSync(password, this.password));
//     return bcrypt.compareSync(password, this.password);
// };
// tạo mã hóa
// CustomerSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };


// Export model.
module.exports=mongoose.model("Customer",CustomerSchema);

