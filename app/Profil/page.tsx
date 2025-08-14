'use client'

import React, { useState } from 'react'
import ContentTitle from '@/components/shared/contentTitle'
import PersonIcon from '@/components/ui/icones/personIcon'
import ProfileIcon1 from '@/components/ui/icones/ProfileIcon1';
import ProfileIcon2 from '@/components/ui/icones/ProfileIcon2';
import ProfileIcon3 from '@/components/ui/icones/ProfileIcon3';
import ProfileIcon4 from '@/components/ui/icones/ProfileIcon4';
import ProfileIcon5 from '@/components/ui/icones/ProfileIcon5';
import ProfileIcon6 from '@/components/ui/icones/ProfileIcon6';
import ProfileIcon7 from '@/components/ui/icones/ProfileIcon7';
import ProfileIcon8 from '@/components/ui/icones/ProfileIcon8';
import ProfileIcon9 from '@/components/ui/icones/ProfileIcon9';
import SettingsIcon from '@/components/ui/icones/settingsIcon'
import { useResponsive } from '@/hooks/useResponsive'
import { getUserById } from '@/lib/auth'
import { updateUser, deleteUser } from '@/lib/auth'
import ChangePasswordModal from '@/components/shared/ChangePasswordModal'

interface UserProfile {
  preferences: {
    theme: 'light' | 'dark';
    language: 'fr' | 'en';
    notifications: boolean;
  };
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  icon?: number;
  phone?: string;
  department?: string;
  joinDate: string;
  lastLogin: string;
  calculationsCount: number;
  createdAt?: string;
  // plus de préférences utilisateur
}

export default function ProfilPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  // Changement du mot de passe
  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (newPassword: string) => {
    if (!userProfile) return;
    try {
      await updateUser(userProfile.id, { password: newPassword });
      window.alert('Mot de passe mis à jour avec succès !');
    } catch (err) {
      window.alert('Erreur lors de la mise à jour du mot de passe.');
    }
  };
  // Ajoute les préférences par défaut lors de la récupération des données utilisateur
  const { isMobile, isTablet } = useResponsive()
  const [isEditing, setIsEditing] = useState(false)
  
  // Récupère les vraies données utilisateur depuis l'API backend
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  React.useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (!userId) return;
    getUserById(Number(userId)).then((data) => {
      setUserProfile({
        id: String(data.id),
        name: data.Nom,
        email: data.email,
        role: 'Utilisateur',
        avatar: '/api/placeholder/100/100',
        phone: data.phone || '',
        department: data.department || '',
        joinDate: data.joinDate || '',
        createdAt: data.createdAt || '',
        lastLogin: data.lastLogin ? String(data.lastLogin) : '',
        calculationsCount: data.calculationsCount || 0,
        icon: data.icon || 1,
        preferences: {
          theme: 'light',
          language: 'fr',
          notifications: true
        }
      });
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  React.useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone || '',
        department: userProfile.department || ''
      });
    }
  }, [userProfile]);

  const handleSave = () => {
    if (!userProfile) return;
    // Appel API PATCH pour mettre à jour Nom et email
    updateUser(userProfile.id, {
      Nom: formData.name,
      email: formData.email
    }).then((data) => {
      setUserProfile({
        ...userProfile,
        name: data.Nom,
        email: data.email,
        phone: userProfile.phone,
        department: userProfile.department
      });
      // Synchronise le nom et l'icône dans le localStorage pour la navbar
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('userNom', data.Nom);
        if (userProfile.icon) {
          window.localStorage.setItem('userIcon', String(userProfile.icon));
        }
      }
      setIsEditing(false);
    });
  }

  const handleCancel = () => {
    if (!userProfile) return;
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || '',
      department: userProfile.department || ''
    });
    setIsEditing(false);
  }

  const actions = [
    {
      label: isEditing ? 'Annuler' : 'Modifier',
      onClick: isEditing ? handleCancel : () => setIsEditing(true),
      variant: 'secondary' as const
    },
    ...(isEditing ? [{
      label: 'Enregistrer',
      onClick: handleSave,
      variant: 'primary' as const
    }] : [])
  ]

  // Ajoute le calcul du nombre total de calculs
  const totalCalculs = userProfile ? userProfile.calculationsCount : 0;

  const handleDeleteAccount = async () => {
    if (!userProfile) return;
    setDeleteError('');
    try {
      await deleteUser(userProfile.id, deletePassword);
      window.localStorage.clear();
      window.location.href = '/register';
    } catch (err) {
      setDeleteError('Mot de passe incorrect ou erreur serveur.');
    }
  };

  if (!userProfile) {
    return <div className="flex items-center justify-center h-full">Chargement du profil...</div>;
  }
  return (
    <div className={`flex flex-col w-full ${isMobile ? 'min-h-screen pb-24' : 'h-full'}`}>
      <div className={`${isMobile ? 'px-4 pt-4 pb-2' : 'p-0'}`}>
        <ContentTitle 
          title="Mon Profil" 
          description="Gérez vos informations personnelles" 
          icon={<div className="w-6 h-6 flex items-center justify-center"><PersonIcon /></div>} 
          actions={actions}
        />
      </div>
      <div className={`flex-1 w-full ${isMobile ? 'px-4 pb-38' : isTablet ? 'px-4 pb-130' : 'p-6'}`}>
        <div className={`grid gap-6 w-full ${isMobile ? 'grid-cols-1 pb-20' : isTablet ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Informations principales */}
          <div className={`${isMobile || isTablet ? '' : 'lg:col-span-2'} space-y-6`}>
            {/* Carte d'identité */}
            <div className="bg-white rounded-2xl shadow-sm border  p-6  hover:border-[#1C274D] text-white transition-colors duration-200">
              <div className="flex items-start gap-6 mb-6 hover:text-white">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {(() => {
                      switch(userProfile.icon) {
                        case 1: return <ProfileIcon1 />;
                        case 2: return <ProfileIcon2 />;
                        case 3: return <ProfileIcon3 />;
                        case 4: return <ProfileIcon4 />;
                        case 5: return <ProfileIcon5 />;
                        case 6: return <ProfileIcon6 />;
                        case 7: return <ProfileIcon7 />;
                        case 8: return <ProfileIcon8 />;
                        case 9: return <ProfileIcon9 />;
                        default: return <PersonIcon />;
                      }
                    })()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                  <p className="text-gray-600 mb-2">{userProfile.role}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  </span>
                  {/* Badges et éléments visuels */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userProfile.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  ) : (
                    <p className="text-gray-900 py-2 break-words truncate max-w-full" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>{userProfile.email}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Section inspirante */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl shadow-sm border  p-6 mt-6 hover:border-[#1C274D] flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-blue-700  mb-2">Inspiration du jour</h3>
              <blockquote className="italic text-gray-700 text-center mb-4 max-w-lg">“Les grands calculs commencent par de petites additions.”</blockquote>
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progression</span>
                  <span>{totalCalculs} / 100 calculs</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" style={{ width: `${Math.min(100, totalCalculs)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
                {/* Statistiques et informations additionnelles */}
                <div className="space-y-6  pt-6 ">
                  {/* Statistiques */}
                  <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-900 transition-colors duration-200 border-2 border-[#1C274D]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 ">Statistiques</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Calculs effectués</span>
                        <span className="text-lg font-bold text-blue-600">{totalCalculs}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Membre depuis</span>
                        <span className="text-sm font-medium text-gray-900">
                          {userProfile.createdAt ? new Date(userProfile.createdAt).toISOString().slice(0, 10).replace(/-/g, '/'): ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Actions rapides */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-[#1C274D]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                    <div className="space-y-3">
                      {/* Bouton changer le mot de passe supprimé */}
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border border-red-200 transition-colors text-red-600" onClick={() => setIsDeleteModalOpen(true)}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 text-sm">🗑️</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Supprimer le compte</p>
                            <p className="text-xs text-red-400">Action irréversible</p>
                          </div>
                        </div>
                      </button>
                      {isDeleteModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Supprimer le compte</h2>
      <p className="mb-2 text-gray-700">Pour supprimer votre compte, veuillez entrer votre mot de passe :</p>
      <input
        type="password"
        value={deletePassword}
        onChange={e => setDeletePassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 mb-2"
        placeholder="Mot de passe"
      />
      {deleteError && <p className="text-red-500 text-sm mb-2">{deleteError}</p>}
      <div className="flex gap-2 justify-end mt-2">
        <button type="button" onClick={() => { setIsDeleteModalOpen(false); setDeletePassword(''); setDeleteError(''); }} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300">Annuler</button>
        <button type="button" onClick={handleDeleteAccount} className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">Supprimer</button>
      </div>
    </div>
  </div>
)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
