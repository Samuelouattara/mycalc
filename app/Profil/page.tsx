'use client'

import React, { useState } from 'react'
import ContentTitle from '@/components/shared/contentTitle'
import PersonIcon from '@/components/ui/icones/personIcon'
import SettingsIcon from '@/components/ui/icones/settingsIcon'
import { useResponsive } from '@/hooks/useResponsive'
import { getUserById } from '@/lib/auth'

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
  phone?: string;
  department?: string;
  joinDate: string;
  lastLogin: string;
  calculationsCount: number;
  // plus de préférences utilisateur
}

export default function ProfilPage() {
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
        lastLogin: data.lastLogin ? String(data.lastLogin) : '',
        calculationsCount: data.calculationsCount || 0,
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
    setUserProfile({
      ...userProfile,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department
    });
    setIsEditing(false);
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
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:bg-[#1C274D] text-white transition-colors duration-200">
              <div className="flex items-start gap-6 mb-6 hover:text-white">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                  <p className="text-gray-600 mb-2">{userProfile.role}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Actif
                  </span>
                  {/* Badges et éléments visuels */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-400 to-blue-400 text-white shadow">⭐ Membre Premium</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow">🎯 Objectif Atteint</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-red-400 text-white shadow">🔥 Calculateur Expert</span>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 py-2 break-words truncate max-w-full" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>{userProfile.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Numéro de téléphone"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userProfile.phone || 'Non renseigné'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Département"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{userProfile.department || 'Non renseigné'}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Section inspirante */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl shadow-sm border border-blue-100 p-6 mt-6 flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Inspiration du jour</h3>
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
                <div className="space-y-6 border-t border-blue-100 pt-6 ">
                  {/* Statistiques */}
                  <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 hover:bg-[#1C274D] text-white transition-colors duration-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 hover:text-white">Statistiques</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Calculs effectués</span>
                        <span className="text-lg font-bold text-blue-600">{totalCalculs}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Membre depuis</span>
                        <span className="text-sm font-medium text-gray-900">{userProfile.joinDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Dernière connexion</span>
                        <span className="text-sm font-medium text-gray-900">{userProfile.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                  {/* Actions rapides */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-[#1C274D]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-100 border border-gray-200 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-sm">🔒</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 ">Changer le mot de passe</p>
                            <p className="text-xs text-gray-500">Sécurisez votre compte</p>
                          </div>
                        </div>
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-lg border-blue-200 hover:bg-green-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-600 text-sm">📊</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Exporter mes données</p>
                            <p className="text-xs text-gray-500">Télécharger un rapport</p>
                          </div>
                        </div>
                      </button>
                      <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border border-red-200 transition-colors text-red-600">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
