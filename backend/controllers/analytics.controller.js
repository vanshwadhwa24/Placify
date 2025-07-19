import { User } from '../models/user.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';
import { Profile } from '../models/profile.model.js';

export const getPlacementStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const appliedStudentIds = await Application.distinct('studentId');
    const appliedCount = appliedStudentIds.length;

    const notAppliedCount = totalStudents - appliedCount;

    res.status(200).json({
      totalStudents,
      totalJobs,
      totalApplications,
      studentsApplied: appliedCount,
      studentsNotApplied: notAppliedCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats', error: err.message });
  }
};

export const getTopRecruiters = async (req, res) => {
  try {
    const top = await Application.aggregate([
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'jobInfo',
        },
      },
      { $unwind: '$jobInfo' },
      {
        $group: {
          _id: '$jobInfo.company',
          totalApplications: { $sum: 1 },
        },
      },
      { $sort: { totalApplications: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(top);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recruiters', error: err.message });
  }
};
