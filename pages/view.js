import connectDB from '../../../../lib/mongodb'
import News from '../../../../models/News'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await connectDB()
  const { id } = req.query

  try {
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).select('views').lean()

    if (!news) return res.status(404).json({ message: 'Haber bulunamadı' })
    
    res.status(200).json({ views: news.views })
  } catch (e) {
    res.status(500).json({ message: 'Hata' })
  }
}
