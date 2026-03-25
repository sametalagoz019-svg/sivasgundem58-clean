import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "ok") {
      router.push("/login");
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>
    </div>
  );
}
