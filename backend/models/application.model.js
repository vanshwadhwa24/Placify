import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  }
});

applicationSchema.index({ jobId: 1, studentId: 1 }, { unique: true });

export const Application = mongoose.model('Application', applicationSchema);
