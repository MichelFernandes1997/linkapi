import mongoose from 'mongoose'

require('dotenv/config')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Conexão de banco de dados bem-sucedida !!'))
  .catch(err => console.error(err))

mongoose.Promise = global.Promise

export default mongoose
