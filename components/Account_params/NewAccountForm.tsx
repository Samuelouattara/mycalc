import React, { useState } from 'react';
import ProfileIcon1 from '../ui/icones/ProfileIcon1';
import ProfileIcon2 from '../ui/icones/ProfileIcon2';
import ProfileIcon3 from '../ui/icones/ProfileIcon3';
import ProfileIcon4 from '../ui/icones/ProfileIcon4';
import ProfileIcon5 from '../ui/icones/ProfileIcon5';
import ProfileIcon6 from '../ui/icones/ProfileIcon6';
import ProfileIcon7 from '../ui/icones/ProfileIcon7';
import ProfileIcon8 from '../ui/icones/ProfileIcon8';
import ProfileIcon9 from '../ui/icones/ProfileIcon9';
import ProfileIcon10 from '../ui/icones/ProfileIcon2'; // Utilise ProfileIcon2 comme 10ème pour l'exemple
import ContentTitle from '../shared/contentTitle';
import { register } from '@/lib/auth';

const NewAccountForm: React.FC = () => {
  const redirectToLogin = () => {
    window.location.href = '/login';
  };
  const [form, setForm] = useState({
    Nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileIcon: 1
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIconSelect = (index: number) => {
    setForm({ ...form, profileIcon: index });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.Nom || !form.email || !form.password || !form.confirmPassword) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (form.password.length < 6 || !/\d/.test(form.password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères et 1 chiffre.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const data = await register({
        Nom: form.Nom,
        email: form.email,
        password: form.password,
        icon: form.profileIcon
      });
      // Stocker l'icône et le nom dans le localStorage pour affichage immédiat dans la navbar
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('userIcon', String(form.profileIcon));
        window.localStorage.setItem('userNom', form.Nom);
        window.localStorage.setItem('userEmail', form.email);
      }
      // Inscription réussie, redirige vers la page de connexion
      console.log('Register success', data);
      redirectToLogin();
    } catch (err) {
      setError('Erreur réseau');
    }
  };

  return (
  <div className="flex flex-col items-center w-full h-full pt-2">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 w-full max-w-md mx-4 text-white transition-colors duration-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choisissez une icône de profil</label>
            <div className="grid grid-cols-5 gap-4 mb-4">
              {[ProfileIcon1, ProfileIcon2, ProfileIcon3, ProfileIcon4, ProfileIcon5, ProfileIcon6, ProfileIcon7, ProfileIcon8, ProfileIcon9, ProfileIcon10].map((Icon, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`rounded-full border-2 p-1 transition ${form.profileIcon === idx + 1 ? 'border-[#1C274D] shadow-[0_0_8px_2px_rgba(28,39,77,0.7)]' : 'border-gray-300'} hover:border-[#1C274D] hover:shadow-[0_0_8px_2px_rgba(28,39,77,0.7)]`}
                  onClick={() => handleIconSelect(idx + 1)}
                  aria-label={`Choisir l'icône ${idx + 1}`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="Nom"
              value={form.Nom}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmation du mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Confirmez le mot de passe"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex gap-2 justify-center mt-4">
            <button type="submit" className="bg-[#1C274D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#162040] transition">Créer le compte</button>
          </div>
            <div className="mt-1 text-center text-sm text-gray-500">
            Vous avez déjà un compte ? <a href="/login" className="font-semibold hover:underline" style={{ color: '#1C274D' }}>Se connecter</a>
          </div>
        </form>
      </div>

    </div>
  );
};

export default NewAccountForm;
