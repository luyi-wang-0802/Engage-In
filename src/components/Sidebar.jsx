import {
  MapPin,
  FileText,
  Users,
  HelpCircle,
  Home
} from 'lucide-react';

export default function Sidebar({ onSelect }) {
  const buttons = [
    { icon: <Home size={30} />, label: 'Home', panel: 'home' },
    { icon: <MapPin size={30} />, label: 'Map', panel: 'map' },
    { icon: <FileText size={30} />, label: 'Historical Data', panel: 'historical_data' },
    { icon: <Users size={30} />, label: 'Community', panel: 'community' },
    { icon: <HelpCircle size={30} />, label: 'Help', panel: 'help' },
  ];

  return (
    <nav style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: "0.1rem",
      width: "80px",
      gap: "0.3rem",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
    }}>
      {buttons.map(btn => (
        <button
          key={btn.panel}
          onClick={() => onSelect(btn.panel)}
          title={btn.label}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.4rem",
            borderRadius: "6px",
            transition: "all 0.2s",
            color: "inherit"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#ddd";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {btn.icon}
        </button>
      ))}
    </nav>
  );
}
