import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [news, setNews] = useState([]);

  // LOGIN + HABER ÇEKME
  useEffect(() => {
    if (localStorage.getItem("auth") !== "ok") {
      router.push("/login");
    } else {
      loadNews();
    }
  }, []);

  // HABERLERİ GETİR
  const loadNews = async () => {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);
  };

  // HABER EKLE
  const addNews = async () => {
    const { error } = await supabase
      .from("news")
      .insert([{ title, content }]);

    if (error) {
      alert("Hata var");
    } else {
      alert("Haber eklendi!");
      setTitle("");
      setContent("");
      loadNews();
    }
  };

  // HABER SİL
  const deleteNews = async (id) => {
    await supabase.from("news").delete().eq("id", id);
    loadNews();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>

      <input
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="İçerik"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={addNews}>Haber Ekle</button>

      <hr />

      <h2>Haberler</h2>

      {news.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <b>{item.title}</b>
          <br />
          <button onClick={() => deleteNews(item.id)}>Sil</button>
        </div>
      ))}
    </div>
  );
}
