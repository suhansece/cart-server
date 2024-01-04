const { default: mongoose } = require("mongoose");

const scheme = mongoose.Schema;

const adminSchema =new scheme({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },email:{
        type:String,
        require:true
    },type:{
        type:String,
        require:true,
        default:"admin"
    }
})

module.exports=mongoose.model('admin',adminSchema);
