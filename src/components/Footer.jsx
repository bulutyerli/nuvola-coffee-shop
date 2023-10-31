export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-3">
      <div>&copy; Bulut Yerli. All rights reserved. {year}</div>
    </footer>
  );
}
