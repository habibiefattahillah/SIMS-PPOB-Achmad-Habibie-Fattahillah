import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-20">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-center gap-3">
            <img src="/public/Logo.png" alt="logo" className="mb-4" />
            <h1 className="text-xl font-semibold">SIMS PPOB</h1>
          </div>
          {children}
        </div>
      </div>

      <div className="hidden md:block w-1/2 bg-[#FFF2F2] relative">
        <img
          src="/public/Illustrasi Login.png"
          alt="illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
