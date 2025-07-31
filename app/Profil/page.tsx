'use client'

import React, { useState } from 'react'
import ContentTitle from '@/components/shared/contentTitle'
import PersonIcon from '@/components/ui/icones/personIcon'
import SettingsIcon from '@/components/ui/icones/settingsIcon'
import { useResponsive } from '@/hooks/useResponsive'

interface UserProfile {
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
  preferences: {
    theme: 'light' | 'dark';
    language: 'fr' | 'en';
    notifications: boolean;
  };
}

export default function ProfilPage() {
  const { isMobile, isTablet } = useResponsive()
  const [isEditing, setIsEditing] = useState(false)
  
  // Données fictives pour l'exemple
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Samuel Ouattara',
    email: 'samuelotr@gmail.com',
    role: 'Utilisateur',
    avatar: '/api/placeholder/100/100',
    phone: '+33 1 23 45 67 89',
    department: 'Finance',
    joinDate: '30/07/2025',
    lastLogin: 'Aujourd\'hui à 14:30',
    calculationsCount: 127,
    preferences: {
      theme: 'light',
      language: 'fr',
      notifications: true
    }
  })

  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone || '',
    department: userProfile.department || ''
  })

  const handleSave = () => {
    setUserProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone || '',
      department: userProfile.department || ''
    })
    setIsEditing(false)
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

  return (
    <div className="flex flex-col h-full">
      <ContentTitle 
        title="Mon Profil" 
        description="Gérez vos informations personnelles et préférences" 
        icon={<div className="w-6 h-6 flex items-center justify-center"><PersonIcon /></div>} 
        actions={actions}
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className={`grid gap-6 ${isMobile || isTablet ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          
          {/* Informations principales */}
          <div className={`${isMobile || isTablet ? '' : 'lg:col-span-2'} space-y-6`}>
            
            {/* Carte d'identité */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-6 mb-6">
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
                    <p className="text-gray-900 py-2">{userProfile.email}</p>
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

            {/* Préférences */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 flex items-center justify-center">
                  <SettingsIcon />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Préférences</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Notifications</p>
                    <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={userProfile.preferences.notifications}
                      onChange={(e) => setUserProfile(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, notifications: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Langue</p>
                    <p className="text-sm text-gray-500">Langue de l'interface</p>
                  </div>
                  <select 
                    value={userProfile.preferences.language}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: e.target.value as 'fr' | 'en' }
                    }))}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques et informations additionnelles */}
          <div className="space-y-6">
            
            {/* Statistiques */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calculs effectués</span>
                  <span className="text-lg font-bold text-blue-600">{userProfile.calculationsCount}</span>
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
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
  )
}
