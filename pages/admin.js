import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "ok") {
      router.push("/login");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNews = () => {
    let old = JSON.parse(localStorage.getItem("news") || "[]");

    old.unshift({
      title,
      content,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("news", JSON.stringify(old));

    alert("Haber eklendi!");
    setTitle("");
    setContent("");
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
    </div>
  );
}
