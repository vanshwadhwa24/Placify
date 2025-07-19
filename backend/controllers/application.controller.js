import { Application } from '../models/application.model.js';
import { Profile } from '../models/profile.model.js';
import { Job } from '../models/job.model.js';

export const applyToJob = async (req, res) => {
  const studentId = req.user.userId;
  const { jobId } = req.body;

  try {
    // Check if student has profile
    const profile = await Profile.findOne({ userId: studentId });
    if (!profile) {
      return res.status(400).json({ message: 'Complete your profile before applying.' });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Check eligibility
    const isEligible = job.openForAll ||
      (profile.cgpa >= job.minCGPA && job.eligibleBranches.includes(profile.branch));

    if (!isEligible) {
      return res.status(403).json({ message: 'You are not eligible for this job.' });
    }

    // Apply
    const application = new Application({ jobId, studentId });
    await application.save();

    res.status(201).json({ message: 'Applied successfully', application });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You have already applied to this job.' });
    }

    res.status(500).json({ message: 'Error applying to job', error: err.message });
  }
};

export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await Application.find({ jobId }).populate('studentId', '-password -role -__v');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching applicants', error: err.message });
  }
};
