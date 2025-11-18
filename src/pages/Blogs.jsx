import { Link } from "react-router-dom";

const blogData = [
  { id: 1, title: "React Hooks Explained" },
  { id: 2, title: "How React Router Works" },
  { id: 3, title: "Understanding useEffect" },
];

export default function Blogs() {
  return (
    <div style={{ padding: 20 }}>
      <h1>All Blogs</h1>

      {/* Pravimo listu linkova ka pojedinačnim blogovima */}
      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {blogData.map((blog) => (
          <li key={blog.id}>
            {/* 
              Link dinamčki kreira putanju npr. /blogs/1
              Ovo je ulaz u dinamičke rute.
            */}
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
