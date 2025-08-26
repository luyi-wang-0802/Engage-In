import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Coverage from "./Coverage";
import MapPanel from "./MapPanel";
import HistoricalData from "./HistoricalData";
import Community from "./Community";
import EcoTipsCard from "./EcoTipsCard";
import PublicPollCard from "./PublicPollCard";
import MotivationCard from "./MotivationCard";
import Help from "./Help";

export default function MainLayout() {
  const [activePanel, setActivePanel] = useState("home");

  const renderPanel = () => {
    switch (activePanel) {
      case "map":
        return <MapPanel />;
      case "historical_data":
        return <HistoricalData />;
      case "community":
        return <Community />;
      case "help":
        return <Help />;
      default:
        return (
          <>
            <Header />
            <div style={{ marginTop: "1rem" }}>
              <Coverage />
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Main body content area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left sidebar */}
        <Sidebar onSelect={setActivePanel} />

        {/* Center content area */}
        <main
          style={{
            flex: 1,
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          {renderPanel()}
        </main>

        {/* Right sidebar */}
        <div style={{ 
          width: "230px", 
          padding: "1rem", 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem",
          backgroundColor: "#f9f9f9"
        }}>
          <EcoTipsCard />
          <PublicPollCard />
          <MotivationCard />
        </div>
      </div>

      {/* Footer occupies the full width of the page */}
      <Footer />
    </div>
  );
}
