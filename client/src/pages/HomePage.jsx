/**
 * Home Page - Complete Assessment Integration
 * Main entry point for authenticated users with access to the full assessment system
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import CompleteAssessment from '../components/CompleteAssessment.jsx';
import { Section7Report } from '../components/Section7Report.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, assessment, results
  const [selectedResultId, setSelectedResultId] = useState(null);
  const queryClient = useQueryClient();

  // Fetch user's assessment results
  const { data: assessmentResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['/api/assessment-results'],
    enabled: isAuthenticated
  });

  // Save assessment result mutation
  const saveResultMutation = useMutation({
    mutationFn: (resultData) => apiRequest('/api/assessment-results', {
      method: 'POST',
      body: resultData
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/assessment-results'] });
      setCurrentView('dashboard');
    }
  });

  const handleAssessmentComplete = async (personalityResults) => {
    if (isAuthenticated) {
      await saveResultMutation.mutateAsync({
        results: personalityResults,
        completedAt: new Date().toISOString()
      });
    } else {
      // For non-authenticated users, show results directly
      setCurrentView('results');
    }
  };

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleViewResult = (resultId) => {
    setSelectedResultId(resultId);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedResultId(null);
  };

  if (currentView === 'assessment') {
    return (
      <CompleteAssessment
        onComplete={handleAssessmentComplete}
        userId={user?.id}
      />
    );
  }

  if (currentView === 'results' && selectedResultId) {
    const selectedResult = assessmentResults?.find(r => r.id === selectedResultId);
    if (selectedResult) {
      return (
        <div className="results-view">
          <div className="mb-6 px-6 py-4 bg-white border-b">
            <button
              onClick={handleBackToDashboard}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
          <Section7Report
            personalityData={selectedResult.results}
            onSave={() => console.log('Results already saved')}
            onExport={() => window.print()}
          />
        </div>
      );
    }
  }

  return (
    <div className="home-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Personality Mosaic</h1>
              <p className="text-gray-600">Discover your unique personality pattern</p>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.firstName || user.email}</span>
                <a
                  href="/api/logout"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {isAuthenticated ? (
          <AuthenticatedDashboard
            assessmentResults={assessmentResults}
            resultsLoading={resultsLoading}
            onStartAssessment={handleStartAssessment}
            onViewResult={handleViewResult}
          />
        ) : (
          <GuestWelcome onStartAssessment={handleStartAssessment} />
        )}
      </main>
    </div>
  );
}

// Dashboard for authenticated users
function AuthenticatedDashboard({ assessmentResults, resultsLoading, onStartAssessment, onViewResult }) {
  return (
    <div className="authenticated-dashboard">
      {/* Welcome Section */}
      <div className="welcome-section bg-white rounded-lg shadow-sm border p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Personality Journey</h2>
        <p className="text-gray-600 text-lg mb-6">
          Explore your unique personality pattern through our comprehensive seven-phase assessment. 
          Discover your core type, growth directions, state patterns, and life domain insights.
        </p>
        
        <button
          onClick={onStartAssessment}
          className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          {assessmentResults?.length > 0 ? 'Take New Assessment' : 'Start Your Assessment'}
        </button>
      </div>

      {/* Assessment Results */}
      <div className="results-section">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Your Assessment History</h3>
        
        {resultsLoading ? (
          <div className="loading-state bg-white rounded-lg shadow-sm border p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ) : assessmentResults?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentResults.map((result) => (
              <AssessmentResultCard
                key={result.id}
                result={result}
                onView={() => onViewResult(result.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🧩</div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No Assessments Yet</h4>
            <p className="text-gray-600 mb-6">
              Take your first personality assessment to begin discovering your unique patterns and insights.
            </p>
            <button
              onClick={onStartAssessment}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Your First Assessment
            </button>
          </div>
        )}
      </div>

      {/* Features Overview */}
      <div className="features-section mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">What You'll Discover</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="Core Type"
            description="Your fundamental personality pattern and core motivations"
            icon="🏗️"
          />
          <FeatureCard
            title="Growth Directions"
            description="How you behave in different states and your development path"
            icon="🌱"
          />
          <FeatureCard
            title="Priority Areas"
            description="Where you focus your attention and energy in life"
            icon="🎯"
          />
          <FeatureCard
            title="Life Domains"
            description="How your personality impacts different areas of your life"
            icon="🌍"
          />
        </div>
      </div>
    </div>
  );
}

// Welcome screen for guest users
function GuestWelcome({ onStartAssessment }) {
  return (
    <div className="guest-welcome">
      {/* Hero Section */}
      <div className="hero-section text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Discover Your Personality Mosaic
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Uncover your unique personality pattern through our comprehensive assessment. 
          Explore your core type, growth directions, state patterns, and how your personality 
          influences different areas of your life.
        </p>
        
        <div className="cta-buttons space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={onStartAssessment}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Free Assessment
          </button>
          
          <a
            href="/api/login"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors shadow-md inline-block text-center"
          >
            Sign In
          </a>
        </div>
      </div>

      {/* Assessment Preview */}
      <div className="assessment-preview bg-white rounded-lg shadow-sm border p-8 mb-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Your Assessment Journey
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PhasePreview
            phase="1"
            title="Foundation Stones"
            description="Select stones that resonate with your core personality patterns"
            duration="5 min"
          />
          <PhasePreview
            phase="2"
            title="Building Blocks"
            description="Choose blocks that represent your growth and stress directions"
            duration="5 min"
          />
          <PhasePreview
            phase="3"
            title="Color Palette"
            description="Distribute colors representing your current state balance"
            duration="3 min"
          />
          <PhasePreview
            phase="4"
            title="Detail Elements"
            description="Allocate tokens to show your priority area focus"
            duration="3 min"
          />
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Complete all four phases to unlock your comprehensive personality report
          </p>
          <div className="text-sm text-gray-500">
            Total time: ~15 minutes • No registration required to start
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          What Makes This Different
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BenefitCard
            title="Interactive Experience"
            description="Engaging visual selection process that feels natural and intuitive"
            icon="🎨"
          />
          <BenefitCard
            title="Comprehensive Analysis"
            description="Seven-dimensional analysis covering all aspects of your personality"
            icon="📊"
          />
          <BenefitCard
            title="Actionable Insights"
            description="Practical growth recommendations and life domain guidance"
            icon="🚀"
          />
        </div>
      </div>
    </div>
  );
}

// Assessment result card component
function AssessmentResultCard({ result, onView }) {
  const completedDate = new Date(result.completedAt).toLocaleDateString();
  const primaryType = result.results?.primaryType?.name || 'Unknown Type';
  
  return (
    <div className="result-card bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{primaryType}</h4>
        <span className="text-sm text-gray-500">{completedDate}</span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Comprehensive personality analysis with tower visualization and growth insights
      </p>
      
      <button
        onClick={onView}
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
      >
        View Results
      </button>
    </div>
  );
}

// Feature card component
function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card bg-white rounded-lg shadow-sm border p-6 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Phase preview component
function PhasePreview({ phase, title, description, duration }) {
  return (
    <div className="phase-preview text-center">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
        {phase}
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <span className="text-xs text-blue-600 font-medium">{duration}</span>
    </div>
  );
}

// Benefit card component
function BenefitCard({ title, description, icon }) {
  return (
    <div className="benefit-card text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}