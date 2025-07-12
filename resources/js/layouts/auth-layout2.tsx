import React from 'react';

interface AuthLayout2Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AuthLayout2({ children, title, description }: AuthLayout2Props) {
  return (
    <div className="auth-bg min-h-screen flex items-center justify-center">
      <div className="auth-inner backdrop-blur-lg bg-black/60 border border-white/30 rounded-2xl shadow-2xl flex w-full max-w-sm flex-col justify-center gap-7 px-5 py-10">
        {title && <h1 className="text-2xl font-bold text-white text-center drop-shadow-lg">{title}</h1>}
        {description && <p className="text-base text-white/90 text-center drop-shadow mb-2">{description}</p>}
        {children}
      </div>
    </div>
  );
}
