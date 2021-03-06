import { Schema } from 'mongoose'

import mongoose from '../../database/mongoDB/connect'

const dealSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

export default mongoose.model('DealSchema', dealSchema, 'dealColletion')
