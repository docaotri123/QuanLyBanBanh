var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var Schema=mongoose.Schema;

var CustomerSchema=new Schema(
    {
        name:{type:String,required:true},
        username:{type:String,unique:true},
        password:{type:String,required:true},
        isVerified: { type: Boolean, default: false },
        phone:{type:String,required:true},
        email:{type:String,required:true},
        birthDay:{type:Date},
        style:{type:String,required:true}
    }
);
// tạo mã hóa
CustomerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// kiểm tra mật khẩu có trùng khớp
CustomerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);;
};

// Export model.
module.exports=mongoose.model("Customer",CustomerSchema);

