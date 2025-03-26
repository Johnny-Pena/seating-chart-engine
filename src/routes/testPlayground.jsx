import Footer from "../components/footer";
import PlaygroundNavbar from "../components/playgroundNavbar";
import SeatingChartPlaygroundHero from "../components/seatingChartPlaygroundHero";
import { useAuth } from "../context/AuthContext";


export default function TestPlayground() {
    const { isAuthenticated } = useAuth(); // Get authentication status
  
    return (
      <div>
        <div className="flex flex-col min-h-screen">
          {/* Render PlaygroundNavbar only if not authenticated */}
          {!isAuthenticated && <PlaygroundNavbar />}
          <div className="flex-grow">
            <SeatingChartPlaygroundHero />
          </div>
          {/* Render Footer only if not authenticated */}
          {!isAuthenticated && <Footer />}
        </div>
      </div>
    );
  }