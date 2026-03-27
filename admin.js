import connectDB from '../../../lib/mongodb';
import News from '../../../models/News';
import { authMiddleware } from '../../../lib/auth';

async function handler(req, res) {
  await connectDB();
  const { page = 1, limit = 20, status, category } = req.query;
  
  const query = {};
  if (status && status !== 'all') query.status = status;
  if (category && category !== 'all') query.category = category;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await News.countDocuments(query);
  const news = await News.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  const stats = await News.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  return res.status(200).json({
    news,
    stats: stats.reduce((acc, s) => { acc[s._id] = s.count; return acc; }, {}),
    pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
  });
}

export default authMiddleware(handler);
