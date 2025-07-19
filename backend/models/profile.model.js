import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  branch: {
    type: String,
    required: true,
  },

  cgpa: {
    type: Number,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  skills: {
    type: [String],
    default: [],
  },

  resumePath: {
    type: String, // local file path
    default: '',
  },

  linkedin: String,
  github: String,
  bio: String,
});

export const Profile = mongoose.model('Profile', profileSchema);
