import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Пользователь с таким логином уже существует'],
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
    maxLength: 200,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'user'],
    default: 'user'
  },
  savedGroups: {
    type: [mongoose.Schema.ObjectId],
    ref: 'Group'
  }
});

userSchema.pre(/^find/, function(next) {
  this.select('-__v').populate('savedGroups');
  next();
})

userSchema.pre(/(save|Save)/, async function(next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

userSchema.methods.comparePasswordsAsync = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model('User', userSchema);