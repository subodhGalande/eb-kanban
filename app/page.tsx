export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold tracking-tight">Kanban Board</h1>

        <a
          href="https://github.com/subodhGalande/eb-kanban"
          target="_blank"
          className="text-sm text-gray-600 hover:text-black transition"
        >
          View Source →
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="grid md:grid-cols-2 gap-6  items-center  sm:max-w-7xl sm:w-full">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-heading leading-tight">
              A Kanban experience
              <br /> for Productivity
            </h2>

            <p className="text-text text-lg max-w-md">
              Built with Next.js, Prisma, NeonDB, PostgreSQL, and DnD Kit. Fast,
              minimal, and engineered for clean code & maintainability.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="/login"
                className="px-5 py-2.5 rounded-lg border border-gray-800 hover:bg-gray-100 transition font-medium"
              >
                Login
              </a>

              <a
                href="/signup"
                className="px-5 py-2.5 rounded-lg bg-heading text-white hover:bg-gray-900 transition font-medium"
              >
                Sign Up
              </a>
            </div>

            <div className="bg-white w-fit border border-gray-200 rounded-lg p-4 shadow-sm text-sm">
              <p className="font-mono text-xs text-gray-500 mb-2">
                Sample Task JSON
              </p>
              <pre className="font-mono text-xs text-gray-800 overflow-auto">
                {`{
  "id": "task_123",
  "title": "Build Kanban UI",
  "description": "Fast, Developer Friendly"
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}`}
              </pre>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 h-[380px]">
              <div className="grid grid-cols-4 gap-4 h-full">
                {["TODO", "IN_PROGRESS", "REVIEW", "DONE"].map((col) => (
                  <div key={col}>
                    <h3 className="font-semibold text-gray-700 mb-3 text-sm">
                      {col}
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-card-background h-12 rounded-md animate-pulse" />
                      <div className="bg-card-background h-12 rounded-md animate-pulse" />
                      {col === "DONE" && (
                        <div className="bg-card-background h-12 rounded-md animate-pulse" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
