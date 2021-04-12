import mongoose from 'mongoose';
import groupRouter from '../route/group.routes';

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Группа уже существует"],
    required: true,
    maxLength: [15, "Слишком длинное название группы"]
  }
});

groupSchema.pre(/^find/, function(next) {
  this.select('-__v');
  next();
});

export default mongoose.model('Group', groupSchema);