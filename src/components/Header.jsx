export default function Header() {
  return (
    <header style={{ padding: "0.3rem" }}>
      {/* Main title */}
      <div
        style={{
          backgroundColor: "#456646",
          color: "white",
          padding: "0.75rem 1rem",
          borderRadius: "8px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "0rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "inline-block"
        }}
      >
        ENGAGE-IN!
      </div>

      {/* Descriptive paragraph 1*/}
      <p
        style={{
          fontSize: "1rem",
          color: "#1a1a1a",
          fontWeight: "bold",
          lineHeight: "0.8",
          marginBottom: "0.3rem"
        }}
      >
        An initiative to reduce CO₂ emissions through real-time monitoring of carbon dioxide,
        temperature, and humidity.
      </p>

      {/* Descriptive paragraph 2 */}
      <p
        style={{
          fontSize: "1rem",
          color: "#228B22",
          fontWeight: "bold",
          lineHeight: "0.8"
        }}
      >
        View data, share your thoughts, and contribute suggestions — your feedback drives meaningful
        change for a greener, healthier city.
      </p>
    </header>
  );
}
