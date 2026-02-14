export default function Footer() {
  return (
    <footer className="text-gray-400 text-sm text-center mt-12 py-7 flex justify-between px-6">
      <p className="text-start">
        Build with lots of <span className="text-[var(--color-accent)]">☕</span> by Rakha. <br />
      </p>
      <p className="text-end">
        Copyright © {new Date().getFullYear()} Rakha.dev
      </p>
    </footer>
  );
}
