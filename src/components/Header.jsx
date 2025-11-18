import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{ padding: 20, display: "flex", gap: 20 }}>
      <Link to="/blogs">Blogs</Link>
    </header>
  );
}
