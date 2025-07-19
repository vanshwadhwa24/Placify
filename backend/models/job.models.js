import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  package: {
    type: String,
    required: true,
  },

  deadline: {
    type: Date,
    required: true,
  },

  minCGPA: {
    type: Number,
    default: 0,
  },

  eligibleBranches: {
    type: [String], // e.g. ["CSE", "ECE"]
    default: [],
  },

  openForAll: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Job = mongoose.model('Job', jobSchema);
