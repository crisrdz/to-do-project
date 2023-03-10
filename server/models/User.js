import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema ({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    ref: "Role",
    type: Schema.Types.ObjectId,
  }],
  img_url: {
    type: String,
  },
  enabled: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

userSchema.statics.encryptPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10)
  return encryptedPassword
}

userSchema.statics.comparePasswords = async (password, passwordDB) => {
  const result = await bcrypt.compare(password, passwordDB)
  return result
}

userSchema.virtual("listCount", {
  ref: "List",
  localField: "_id",
  foreignField: "user",
  count: true
})

export default model("User", userSchema)