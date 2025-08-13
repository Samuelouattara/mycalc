'use client';
import React from 'react';
import LoginForm from '@/components/Account_params/LoginForm';
import LogoIcon from '@/components/ui/icones/logoIcon';

export default function LoginPage() {
  return (
    <div className="w-full max-w-4xl">
      <div className="flex flex-col">
        <div className="flex-1 px-10 py-12">
          <div className="mb-8 text-center flex items-center justify-center gap-2">
            <LogoIcon />
            <span className="text-[#1C274D] font-bold text-lg align-middle">OUATTCALC?</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Connexion</h1>
          <p className="text-gray-500 mb-8 text-center">Connectez-vous à votre compte</p>
          <LoginForm />
          <div className="mt-8 text-center text-sm text-gray-500">
          </div>
        </div>
      </div>
    </div>
  );
}


