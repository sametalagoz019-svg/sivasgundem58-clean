import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Sidebar from '../components/layout/Sidebar'
import NewsCard from '../components/news/NewsCard'

export default function SearchPage() {
  const router = useRouter()
  const { q } = router.query
  const [news, setNews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (q) fetchSearch(q)
  }, [q])

  const fetchSearch = async (query) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/news?search=${encodeURIComponent(query)}&limit=20`)
      const data = await res.json()
      setNews(data.news || [])
      setTotal(data.total || 0)
    } catch (e) {}
    setLoading(false)
  }

  return (
    <Layout title={q ? `"${q}" için arama sonuçları` : 'Arama'}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-primary mb-1">
                {q ? `"${q}" için sonuçlar` : 'Arama'}
              </h1>
              {q && !loading && (
                <p className="text-gray-500 text-sm">{total} haber bulundu</p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.map(n => <NewsCard key={n._id} news={n} />)}
              </div>
            ) : q ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-gray-700 mb-2">Sonuç Bulunamadı</h2>
                <p className="text-gray-500 text-sm">"{q}" ile ilgili haber bulunamadı.</p>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  )
}
