import "core-js/stable";
import "regenerator-runtime/runtime";
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import mongoose from 'mongoose';

import ClassModel from './model/class.model';

const PORT = process.env.PORT || 3000;
const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

const init = async () => {
  await mongoose.connect(process.env.DB_URL, mongooseConnectOptions);
  // await ClassModel.deleteMany({});
  return app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
} 

init();   
