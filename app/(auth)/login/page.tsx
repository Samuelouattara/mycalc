'use client';
import React from 'react';
import LoginForm from '@/components/Account_params/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 px-10 py-12">
          <div className="mb-8">
            <span className="text-purple-600 font-bold text-lg">OUATTCALC?</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Bienvenue sur votre calculatrice intelligente</h1>
          <p className="text-gray-500 mb-8">Connectez-vous pour accéder à vos calculs et fonctionnalités avancées</p>
          <LoginForm />
          <div className="mt-8 text-center text-sm text-gray-500">
            Pas de compte ? <a href="/register" className="text-purple-600 font-semibold hover:underline">Créer un compte</a>
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-400 to-blue-400">
          <div className="w-full h-full flex items-center justify-center">
            <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="320" height="320" rx="40" fill="url(#paint0_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A78BFA" />
                  <stop offset="1" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
              <circle cx="160" cy="120" r="60" fill="#fff" opacity="0.2" />
              <rect x="90" y="70" width="140" height="200" rx="24" fill="#fff" />
              <circle cx="160" cy="140" r="40" fill="#E0E7FF" />
              <path d="M160 120a20 20 0 1 1 0 40a20 20 0 1 1 0-40z" stroke="#A78BFA" strokeWidth="4" fill="none" />
              <path d="M160 130v20" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
              <rect x="220" y="200" width="32" height="40" rx="8" fill="#A78BFA" />
              <rect x="228" y="210" width="16" height="16" rx="4" fill="#fff" />
              <ellipse cx="80" cy="60" rx="24" ry="12" fill="#fff" opacity="0.7" />
              <ellipse cx="240" cy="40" rx="20" ry="10" fill="#fff" opacity="0.7" />
              <ellipse cx="260" cy="100" rx="16" ry="8" fill="#fff" opacity="0.7" />
              <ellipse cx="60" cy="200" rx="18" ry="9" fill="#fff" opacity="0.7" />
              <path d="M200 80l16 16l24-24" stroke="#34D399" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}


