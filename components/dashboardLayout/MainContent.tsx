import NoFeatureYet from "../shared/noFeatureYet";

export default function MainContent({ children }: { children: React.ReactNode }) {
  
    return (
      <main className="flex-1 p-2 overflow-auto bg-[#F7F7F7] rounded-xl shadow-sm">
        {children ? children : <NoFeatureYet title='Dashboard' description='Ici retrouver les éléments de votre dashboard' />}
      </main>
    )
  }