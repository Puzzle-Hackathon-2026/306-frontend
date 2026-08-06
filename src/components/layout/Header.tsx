export default function Header() {
  return (
    <header className="border-b border-[#D4E0D9] bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#16643A] rounded-md flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5v6l-6 3L2 11V5l6-3z" fill="white" opacity="0.9" />
                <path d="M8 2v12M2 5l6 3 6-3" stroke="white" strokeWidth="0.8" opacity="0.5" />
              </svg>
            </div>
            <span className="font-display font-700 text-[#111A14] text-[16px] tracking-tight">
              CleanCity <span className="text-[#16643A]">SPS</span>
            </span>
          </div>

          {/* Placeholder de cuenta — próximamente login/perfil */}
          <div
            className="w-9 h-9 rounded-full bg-[#D4E0D9] hover:bg-[#B8D9C5] transition-colors cursor-pointer"
            title="Cuenta (próximamente)"
          />
        </div>
      </div>
    </header>
  )
}
