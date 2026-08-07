"use client";

import { useState } from "react";

import logo from "../../assets/logo-smartcity.png";

import NotificationDropdown from "./NotificationDropdown";
import AccountModal from "./AccountModal";

export default function Header() {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="SmartCity SPS"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Lado derecho */}
          <div className="ml-auto flex items-center gap-4">
            {/* Notificaciones */}
            <NotificationDropdown />

            {/* Usuario */}
            <button
              onClick={() => setAccountOpen(true)}
              className="w-10 h-10 rounded-full bg-[#D4E0D9] hover:bg-[#B8D9C5] transition flex items-center justify-center"
              title="Mi cuenta"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[#2E5E4E]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Modal de usuario */}
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
