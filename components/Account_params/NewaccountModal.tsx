import React, { useState } from 'react';
import ContentTitle from '../shared/contentTitle';

interface NewAccountModalProps {
  show: boolean;
  onClose: () => void;
}

const NewAccountModal: React.FC<NewAccountModalProps> = ({ show, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    // Logique pour créer un compte
    console.log('Créer un compte', form);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <ContentTitle title="Créer un nouveau compte" description="Veuillez remplir les informations nécessaires à la création de votre compte" />
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
        <div className="absolute inset-0 bg-blue-100 bg-opacity-40 pointer-events-none" />
        <div className="relative bg-white rounded-2xl shadow-sm border border-blue-100 p-6 w-full max-w-md mx-4 z-[101] hover:bg-[#1C274D] text-white transition-colors duration-200">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-900">Créer un nouveau compte</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom & Prénom</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Nom & Prénom"
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
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Créer le compte</button>
            <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default NewAccountModal;
