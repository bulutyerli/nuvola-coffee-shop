export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="p-3 bg-primary min-w-full text-xs">
      <div>&copy; Bulut Yerli. All rights reserved. {year}</div>
    </footer>
  );
}
