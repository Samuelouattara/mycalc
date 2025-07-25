import NoFeatureYet from "../shared/noFeatureYet";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
      <main className="flex-1 p-6 overflow-auto">
        {children ? children : <NoFeatureYet title='Dashboard' description='Ici retrouver les éléments de votre dashboard' />}
      </main>
    )
  }