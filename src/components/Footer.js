export function Footer() {
  let actualDate = new Date().getFullYear();
  return (
    <footer className="footer">
      <p style={{ marginBottom: "auto" }}>
        <span style={{ fontFamily: "sans-serif" }}>&copy;</span> {actualDate}
        Pokédex Subvisual. All rights reserved.
      </p>
      <p style={{ marginTop: 5 }}>
        Crafted with passion by Breno Enzo Scafura ✌️.
      </p>
    </footer>
  );
}
