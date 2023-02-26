import {Schema, model} from 'mongoose'

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true
  },
  items: [{
    completed: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model("List", listSchema)