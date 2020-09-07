import { Schema } from 'mongoose'

import mongoose from '../../database/mongoDB/connect'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('UserSchema', userSchema)
