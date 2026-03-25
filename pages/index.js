import { useEffect, useState } from "react";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("news") || "[]");
    setNews(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sivas Gündem 58</h1>

      {news.length === 0 ? (
        <p>Henüz haber yok</p>
      ) : (
        news.map((item, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>{item.date}</small>
          </div>
        ))
      )}
    </div>
  );
}
