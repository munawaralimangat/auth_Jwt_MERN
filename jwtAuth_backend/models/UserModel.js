const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Your email address is required'],
        unique:true
    },
    userName:{
        type:String,
        required:[true,'Your userName is required']
    },
    password:{
        type:String,
        required:[true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
})

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    next()
})
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

module.exports = mongoose.model('User',userSchema)