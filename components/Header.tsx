export default function Header() {
    return (
      <header className="h-16 border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">Codex Internal</h1>
  
        <nav className="flex items-center gap-4">
         {/*  <a href="/" className="text-sm hover:underline">Home</a>
          <a href="/dashboard" className="text-sm hover:underline">Dashboard</a> */}
        </nav>
      </header>
    )
  }