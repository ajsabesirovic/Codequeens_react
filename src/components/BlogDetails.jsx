// useParams nam omogućava da iz URL-a čitamo dinamički deo rute (:id)
import { useParams } from "react-router-dom";
const blogData = [
  {
    id: 1,
    title: "React Hooks Explained",
    content: "Hooks make React powerful...",
  },
  {
    id: 2,
    title: "How React Router Works",
    content: "React Router enables SPA navigation...",
  },
  {
    id: 3,
    title: "Understanding useEffect",
    content: "useEffect runs side effects...",
  },
];

export default function BlogDetails() {
  // params je objekat koji sadrzi key-value parove iz trenutnog URL-a
  // Uzimamo parametre iz URL-a, npr. { id: "2" }
  const params = useParams();

  // Pronalazimo blog sa ID-jem iz URL-a (params.id je string → pretvaramo u broj)
  const blog = blogData.find((b) => b.id === Number(params.id));

  // Ako blog ne postoji, vraćamo poruku
  if (!blog) {
    return <h2 style={{ padding: 20 }}>Blog not found</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
