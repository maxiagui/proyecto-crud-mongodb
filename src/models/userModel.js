import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";

const catRole = [
    "Administrator",
    "Manager",
    "Seller",
  ];

const userSchema = new mongoose.Schema({
email: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 8,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return isGoodPassword(value);
      },
      message:
        "The password must be between 6 and 12 characters, one numeric digit, one lowercase letter and one uppercase letter",
    },
  },
  fullname: {
    type: String,
    required: true,
    maxlength: 35,
    minlength: 3,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    validate: {
      validator: function (v) {
        return catRole.includes(v);
      },
      message: props => `${props.value} is not a role valid`,
    },
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },

  
});
//antes del save, hasheamos el password
userSchema.pre("save", function(next){
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export default mongoose.model('user', userSchema);