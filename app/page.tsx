import MainContent from "@/components/dashboardLayout/MainContent";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Plan, prioritize, and accomplish your tasks with ease.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Bienvenue sur <span className="text-green-600">MyCalc</span></h2>
        <p className="text-gray-600">Votre tableau de bord est en cours de développement.</p>
      </div>
    </div>
  );
}
