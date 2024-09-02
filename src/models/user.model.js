import mongoose, { Schema } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  edad: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const UserModel = mongoose.model(userCollection, userSchema);
