'use client';
import React from 'react';
import NewAccountForm from '@/components/Account_params/NewAccountForm';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-4xl ">
      <div className="flex flex-col md:flex-row">
  <div className="flex-1 px-10 py-2">
          <div className="mb-4 text-center">
            <span className="font-bold text-lg" style={{ color: '#1C274D' }}>OUATTCALC?</span>
          </div>
          <h1 className="text-3xl font-bold mb-1 text-gray-900 text-center">Créer un compte</h1>
          <p className="text-gray-500 mb-4 text-center">Rejoignez la calculatrice intelligente et accédez à toutes les fonctionnalités</p>
          <NewAccountForm />
        </div>
      </div>
    </div>
  );
}


