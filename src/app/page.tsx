import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
export default function Home() {
  return (
    <div className="container container-lg w-4/6 mx-auto px-4">
        <div className="py-10">
          <Hero />
          <SearchBar />
          
        </div>
    </div>
  );
}
