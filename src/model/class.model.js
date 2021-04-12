import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Пара должна иметь имя'],
    maxLength: [200, 'Слишком много символов']
  },
  lecturer: String,
  room: {
    type: String,
    default: '-'
  },
  order: {
    type: Number,
    required: [true, 'Пара должна иметь номер'],
    min: [1, 'Номер пары не может быть меньше 1'],
    max: [8, 'Номер пары не может быть больше 8']
  },
  subgroup: {
    type: String,
    default: 'Все',
    maxLength: 3
  },
  group: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group'
  },
  week: {
    type: Number,
    default: 0,
  },
  weekday: {
    type: Number,
    required: true
  }
});

classSchema.pre(/^find/, function(next) {
  this.select('-__v');
  next();
});

export default mongoose.model('Class', classSchema);