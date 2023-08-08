const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    owner: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
      },
      dob: {
        type: String,
        required: false
      },
      gender: {
        type: String,
        required: false
      },
      mobNumber: {
        type: String,
        required: false
      },
      profilePic: {
        type: "String",
      },
      add: {
        type: String,
        required: false
      },
      registrationDate: {
        type: Date
      }
})

userSchema.statics.singup = async function(email, password, owner) {
    if (!email || !password) {
        return next(new ErrorHander("Please Enter Email & Password", 400));
        }
        if (!validator.isEmail(email)) {
          throw new Error('Invalid Email')
        }
        // if (!validator.isStrongPassword(password)) {
        //   throw Error('Password not strong enough')
        // }
      
        const exists = await this.findOne({ email })
      
        if (exists) {
         throw new Error('Email already exists')  
        }
        const existsOwner = await this.findOne({ owner })
        if(existsOwner){
            throw new Error('Owner already exists');
        }
      
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const registrationDate = Date.now();
        const user = await this.create({ email, password: hash, registrationDate, owner });

        return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
      }
    
      const user = await this.findOne({ email })
      if (!user) {
        throw Error('Email does not exist')
      }
    
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        throw new Error('password does not match')
      }
      return user
}

module.exports = mongoose.model('User', userSchema)