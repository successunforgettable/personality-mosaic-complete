import { motion } from 'framer-motion';
import { useAssessment } from '@/context/AssessmentContext';
import TowerVisualization from './TowerVisualization';
import { Link } from 'wouter';

const Results = () => {
  const { state, resetAssessment } = useAssessment();
  const { result } = state;
  
  if (!result) return null;
  
  const { type, influence, stateDistribution, subtypeDistribution } = result;
  
  const handleShare = () => {
    // Implement sharing functionality
    // This could be expanded to include actual share APIs
    alert("Share functionality will be implemented here");
  };
  
  const handleDownloadPDF = () => {
    // Implement PDF download
    alert("PDF download functionality will be implemented here");
  };
  
  const handleWhatsApp = () => {
    // Implement WhatsApp sharing
    alert("WhatsApp sharing functionality will be implemented here");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="animate-fade-in"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900 mb-3">Your Personality Mosaic</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Behold your unique personality tower! Explore the insights below to better understand yourself.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Tower Visualization */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">The {type.name} {influence.id}</h3>
          
          <div className="relative w-full max-w-sm h-80 mb-6">
            <TowerVisualization 
              stateDistribution={stateDistribution} 
              subtypeDistribution={subtypeDistribution} 
              personalityType={type}
              showHotspots={true}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-all"
              onClick={handleShare}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">share</span>
              Share
            </button>
            <button 
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-all"
              onClick={handleDownloadPDF}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">save_alt</span>
              Download PDF
            </button>
            <button 
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-all"
              onClick={handleWhatsApp}
            >
              <span className="material-icons text-sm mr-1 align-text-bottom">whatsapp</span>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Primary Type Description */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">The {type.name}</h3>
          <h4 className="text-primary-600 font-medium mb-4">{influence.name} {influence.id} Influence</h4>
          
          <div className="prose text-gray-700">
            <p>{type.description}</p>
            
            <h5 className="text-gray-900 font-medium mt-4">When you're in a good mood, you are:</h5>
            <ul className="mt-2">
              {type.positiveTraits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
            
            <h5 className="text-gray-900 font-medium mt-4">When you're in a bad mood, you are:</h5>
            <ul className="mt-2">
              {type.negativeTraits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* State Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">State Distribution</h3>
          
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-700">Healthy State</span>
            <span className="ml-auto text-sm font-medium text-gray-900">{stateDistribution.healthy}%</span>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-700">Average State</span>
            <span className="ml-auto text-sm font-medium text-gray-900">{stateDistribution.average}%</span>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-700">Unhealthy State</span>
            <span className="ml-auto text-sm font-medium text-gray-900">{stateDistribution.unhealthy}%</span>
          </div>
          
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="flex h-full">
              <div className="bg-green-500 h-full" style={{ width: `${stateDistribution.healthy}%` }}></div>
              <div className="bg-blue-500 h-full" style={{ width: `${stateDistribution.average}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${stateDistribution.unhealthy}%` }}></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            {stateDistribution.healthy > stateDistribution.average && stateDistribution.healthy > stateDistribution.unhealthy ? (
              "You tend to operate in your healthy state most often, which indicates a balanced and growth-oriented mindset."
            ) : stateDistribution.average > stateDistribution.healthy && stateDistribution.average > stateDistribution.unhealthy ? (
              "You tend to operate in your average state most often, with a good amount of time in your healthy state and occasional dips into your unhealthy state."
            ) : (
              "You tend to spend significant time in your unhealthy state, which may indicate current life stressors that need addressing."
            )}
          </p>
        </div>

        {/* Subtype Stack */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Subtype Distribution</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Social</span>
                <span className="text-gray-900">{subtypeDistribution.social}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="bg-primary-500 h-full" style={{ width: `${subtypeDistribution.social}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">One-to-One</span>
                <span className="text-gray-900">{subtypeDistribution.oneToOne}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="bg-primary-500 h-full" style={{ width: `${subtypeDistribution.oneToOne}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Self-Preservation</span>
                <span className="text-gray-900">{subtypeDistribution.selfPreservation}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="bg-primary-500 h-full" style={{ width: `${subtypeDistribution.selfPreservation}%` }}></div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            {subtypeDistribution.social > subtypeDistribution.oneToOne && subtypeDistribution.social > subtypeDistribution.selfPreservation ? (
              "Your primary focus is on social connections and community engagement, followed by close one-to-one relationships, with personal preservation as your tertiary concern."
            ) : subtypeDistribution.oneToOne > subtypeDistribution.social && subtypeDistribution.oneToOne > subtypeDistribution.selfPreservation ? (
              "Your primary focus is on close one-to-one relationships, followed by social connections, with personal preservation as your tertiary concern."
            ) : (
              "Your primary focus is on personal preservation and security, followed by one-to-one relationships, with social connections as your tertiary concern."
            )}
          </p>
        </div>

        {/* Growth Opportunities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Opportunities</h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-icons text-primary-600 mr-2 text-lg">trending_up</span>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Practice Courageous Trust</h4>
                <p className="text-xs text-gray-600">Build confidence in your own judgment and the intentions of others.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary-600 mr-2 text-lg">self_improvement</span>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Embrace Uncertainty</h4>
                <p className="text-xs text-gray-600">Develop comfort with ambiguity and not always having all the answers.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary-600 mr-2 text-lg">psychology</span>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Recognize Your Strength</h4>
                <p className="text-xs text-gray-600">Acknowledge your natural gifts of perception, analysis, and commitment.</p>
              </div>
            </div>
          </div>
          
          <button className="mt-4 w-full px-4 py-2 bg-primary-100 text-primary-700 rounded-md text-sm font-medium hover:bg-primary-200 transition-all">
            Get Personalized Development Plan
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Want to explore more about your personality?</h3>
        <p className="text-gray-600 mb-4">Unlock in-depth insights, personalized growth paths, and compatibility guidance with our premium services.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-all text-sm">
            <span className="material-icons text-primary-600 text-lg block mx-auto mb-1">psychology</span>
            Deep Dive Analysis
          </button>
          <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-all text-sm">
            <span className="material-icons text-primary-600 text-lg block mx-auto mb-1">favorite</span>
            Relationship Compatibility
          </button>
          <button className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50 transition-all text-sm">
            <span className="material-icons text-primary-600 text-lg block mx-auto mb-1">trending_up</span>
            Growth Path Program
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-md hover:bg-primary-600 transition-all"
          onClick={resetAssessment}
        >
          Take Another Assessment
        </button>
      </div>
    </motion.div>
  );
};

export default Results;
