import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const login = () => {
    if (user === "admin" && pass === "1234") {
      localStorage.setItem("auth", "ok");
      router.push("/admin");
    } else {
      alert("Hatalı giriş");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Giriş Yap</h1>

      <input
        placeholder="Kullanıcı adı"
        onChange={(e) => setUser(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPass(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Giriş</button>
    </div>
  );
}
