export default function Footer() {
  return (
    <footer className="text-gray-400 text-sm text-center mt-12 py-7 border-t border-gray-800">
      <p>
        Designed with <span className="text-[var(--color-accent)]">❤</span> by Rakha. <br />
        Copyright © {new Date().getFullYear()} Rakha.dev
      </p>
    </footer>
  );
}
