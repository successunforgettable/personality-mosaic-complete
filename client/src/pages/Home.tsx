import { Link } from "wouter";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#f1f5f9] to-[#ede9fe] flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-12 w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">
            Discover Your <span className="text-[#7c3aed]">Personality Tower</span>
          </h1>
          <p className="text-lg md:text-xl text-[#64748b] mb-10 max-w-xl">
            Build a visual representation of your unique personality in just 5 minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/assessment">
              <a className="px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-md hover:bg-[#6d28d9] transition-all duration-200 text-center">
                Begin Your Tower
              </a>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-[#1e293b] mb-4">How It Works</h2>
            <p className="text-[#64748b] max-w-2xl mx-auto">
              Our assessment guides you through four interactive phases to build your personalized tower in just 5-7 minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">1</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Select Your Foundation Stones</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Choose foundation stones that represent your core values and personality baselines.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">2</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Add Your Building Blocks</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Select building blocks that shape your decision-making and interaction style.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">3</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Choose Your Color Palette</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Color your tower to show how much time you spend in different psychological states.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-4">
                <span className="font-semibold">4</span>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 w-full">
                <h3 className="text-[#1e293b] font-medium text-center mb-2">Place Your Detail Elements</h3>
                <p className="text-xs text-[#64748b] text-center">
                  Add final details to show where you focus your energy and attention.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/assessment">
              <a className="inline-block px-8 py-4 bg-[#7c3aed] text-white rounded-lg font-medium shadow-sm hover:bg-[#6d28d9] transition-all duration-200 text-center">
                Start Building Now
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}