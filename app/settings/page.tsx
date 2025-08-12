import NoFeatureYet from "@/components/shared/noFeatureYet";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Paramètres du compte</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Préférences utilisateur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                <span className="text-gray-700">Recevoir les notifications</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Sécurité</h3>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-100 border border-gray-200 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-lg">🔒</span>
              <span className="text-sm font-medium text-gray-900">Changer le mot de passe</span>
            </div>
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 border border-red-200 transition-colors text-red-600">
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-lg">🗑️</span>
              <span className="text-sm font-medium">Supprimer le compte</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}