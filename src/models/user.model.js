const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required creating a user"],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email address",
    ],
    unique: [true, " Email already exists"]
  },
  name: {
    type: String,
    required: [true, " name is required"],
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: [6, "password should be at least 6 character long "], 
    select: false,
  }
}, {
    timestamps: true
  });


userSchema.pre("save", async function(next){

    if(!this.isModified("password")) {
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return next()
})
