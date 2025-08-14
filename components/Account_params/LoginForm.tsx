import React, { useState } from 'react';
import ContentTitle from '../shared/contentTitle';
import { login } from '@/lib/auth';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (form.password.length < 6 || !/\d/.test(form.password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères et 1 chiffre.');
      return;
    }
    try {
      const data = await login({ email: form.email, password: form.password });
      // Stocke le nom, l'email et l'icône dans le localStorage pour la navbar
      if (typeof window !== 'undefined') {
        if (data.nom) window.localStorage.setItem('userNom', data.nom);
        if ((data as any).email) window.localStorage.setItem('userEmail', String((data as any).email));
        if (data.userId) window.localStorage.setItem('userId', String(data.userId));
        if (data.icon) window.localStorage.setItem('userIcon', String(data.icon));
      }
  // Connexion réussie, redirige vers le profil
  console.log('Login success', data);
  window.location.href = '/Profil';
    } catch (err) {
      setError('Erreur réseau');
    }
  };

  return (
  <div className="flex flex-row items-center justify-between w-full h-full">
      <div className="flex flex-col items-center flex-1">
        <div className="bg-white rounded-2xl shadow-[0_0_16px_4px_rgba(28,39,77,0.8)] border-2 border-[#1C274D] p-6 w-full max-w-md mx-4 mt-8 text-white transition-colors duration-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none text-gray-900"
                placeholder="Mot de passe"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="flex gap-2 justify-center mt-4">
              <button type="submit" className="bg-[#1C274D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#162040] transition">Se connecter</button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Vous n'avez pas de compte ? <a href="/register" className="font-semibold hover:underline" style={{ color: '#1C274D' }}>Créer un compte</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;
