/**
 * useParams - React Router hook za čitanje dinamičkih parametara iz URL-a
 * 
 * Kada imamo rutu sa dinamičkim parametrom, npr.:
 * <Route path="/blogs/:id" element={<BlogDetails />} />
 * 
 * useParams() vraća objekat sa parametrima:
 * - Za URL "/blogs/123" → { id: "123" }
 * - Za URL "/blogs/abc" → { id: "abc" }
 * 
 * VAŽNO: Parametri su uvek stringovi, pa ih treba konvertovati ako su potrebni brojevi!
 */
import { useParams } from "react-router-dom";

// Mock podaci za blogove (u realnoj aplikaciji bi došli sa API-ja)
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

/**
 * BlogDetails - Komponenta koja prikazuje detalje bloga na osnovu ID-ja iz URL-a
 * 
 * Kako radi:
 * 1. useParams() čita :id parametar iz URL-a (npr. "/blogs/2" → id: "2")
 * 2. Pronalazi blog sa tim ID-jem u blogData nizu
 * 3. Ako postoji → prikazuje naslov i sadržaj
 * 4. Ako ne postoji → prikazuje poruku "Blog not found"
 * 
 * Primer korišćenja:
 * - URL: "/blogs/1" → prikazuje "React Hooks Explained"
 * - URL: "/blogs/2" → prikazuje "How React Router Works"
 * - URL: "/blogs/999" → prikazuje "Blog not found"
 */
export default function BlogDetails() {
  // useParams() vraća objekat sa svim dinamičkim parametrima iz URL-a
  // Za rutu "/blogs/:id", params će biti { id: "vrednost_iz_url_a" }
  // Primer: za URL "/blogs/2", params = { id: "2" }
  const params = useParams();

  // Pronalazimo blog sa ID-jem iz URL-a
  // params.id je string, pa ga konvertujemo u broj pomoću Number()
  // find() vraća prvi element koji zadovoljava uslov, ili undefined ako ne postoji
  const blog = blogData.find((b) => b.id === Number(params.id));

  // Ako blog ne postoji (find() vratio undefined), prikazujemo poruku o grešci
  if (!blog) {
    return <h2 style={{ padding: 20 }}>Blog not found</h2>;
  }

  // Ako blog postoji, prikazujemo njegov naslov i sadržaj
  return (
    <div style={{ padding: 20 }}>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}
