import { Input } from "../components";

function SearchIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function SearchRow() {
  return (
    <main className="min-h-screen bg-app px-4 py-6 font-seekho text-primary">
      <div className="mx-auto w-full max-w-seekhoShell">
        <Input leftIcon={<SearchIcon />} placeholder="Search" type="search" />
      </div>
    </main>
  );
}
