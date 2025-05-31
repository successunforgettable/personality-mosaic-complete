/**
 * Section 7: Results Visualization and Report - Complete Implementation
 * Exact implementation from specification section 7.2
 */

import { useState } from 'react';
import TowerVisualization from './TowerVisualization.jsx';
import { generateWrittenReport } from '../lib/writtenReport.js';

export function Section7Report({ personalityData, onSave, onExport }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [writtenReport, setWrittenReport] = useState(null);

  // Generate written report on component mount
  useState(() => {
    if (personalityData) {
      const report = generateWrittenReport(personalityData);
      setWrittenReport(report);
    }
  }, [personalityData]);

  if (!personalityData || !writtenReport) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Generating your personality report...</div>
      </div>
    );
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'tower', label: 'Tower Visualization', icon: '🏗️' },
    { id: 'type', label: 'Type Description', icon: '📋' },
    { id: 'influence', label: 'Influence Profile', icon: '🔗' },
    { id: 'states', label: 'State Analysis', icon: '📊' },
    { id: 'subtype', label: 'Priority Areas', icon: '🎯' },
    { id: 'growth', label: 'Growth Path', icon: '🌱' }
  ];

  return (
    <div className="section-7-report max-w-6xl mx-auto p-6">
      {/* Progress Bar Navigation - Specification requirement 7.2.2 */}
      <div className="progress-navigation mb-8">
        <div className="flex flex-wrap justify-center space-x-2 mb-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Report Content */}
      <div className="report-content">
        {activeSection === 'overview' && (
          <ReportOverview 
            personalityData={personalityData}
            writtenReport={writtenReport}
          />
        )}

        {activeSection === 'tower' && (
          <TowerVisualizationSection personalityData={personalityData} />
        )}

        {activeSection === 'type' && (
          <TypeDescriptionSection 
            header={writtenReport.header}
            typeDescription={writtenReport.typeDescription}
          />
        )}

        {activeSection === 'influence' && (
          <InfluenceProfileSection 
            influenceProfile={writtenReport.influenceProfile}
            personalityData={personalityData}
          />
        )}

        {activeSection === 'states' && (
          <StateAnalysisSection 
            stateAnalysis={writtenReport.stateAnalysis}
          />
        )}

        {activeSection === 'subtype' && (
          <SubtypeStackSection 
            subtypeStack={writtenReport.subtypeStack}
          />
        )}

        {activeSection === 'growth' && (
          <GrowthPathSection 
            growthPath={writtenReport.growthPath}
          />
        )}
      </div>

      {/* Report Actions */}
      <div className="report-actions mt-8 flex justify-center space-x-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Print Report
        </button>
        
        {onExport && (
          <button
            onClick={onExport}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export to PDF
          </button>
        )}
        
        {onSave && (
          <button
            onClick={onSave}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save to Account
          </button>
        )}
      </div>
    </div>
  );
}

// Overview Section Component
function ReportOverview({ personalityData, writtenReport }) {
  return (
    <div className="report-overview">
      {/* Header with full personality type name and short description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {writtenReport.header.typeName}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {writtenReport.header.shortDescription}
        </p>
        <div className="text-sm text-gray-500">
          Detection Confidence: {Math.round((writtenReport.header.confidence || 0) * 100)}%
        </div>
      </div>

      {/* Quick Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="summary-card bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Primary Type</h3>
          <p className="text-blue-700">{personalityData.primaryType.name}</p>
        </div>
        
        <div className="summary-card bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Current State</h3>
          <p className="text-green-700">
            {personalityData.stateDistribution.primaryState} ({personalityData.stateDistribution.healthy}% Healthy)
          </p>
        </div>
        
        <div className="summary-card bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">Primary Focus</h3>
          <p className="text-purple-700">
            {personalityData.subtypeDistribution.find(s => s.tokens > 0)?.name || 'Balanced'}
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="quick-navigation bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Explore Your Results</h3>
        <p className="text-gray-600 mb-4">
          Your complete personality analysis includes detailed insights across multiple dimensions. 
          Use the navigation above to explore each section of your report.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="text-gray-700">🏗️ Interactive Tower Visualization</div>
          <div className="text-gray-700">📋 Detailed Type Analysis</div>
          <div className="text-gray-700">🔗 Influence Patterns</div>
          <div className="text-gray-700">📊 State Distribution</div>
          <div className="text-gray-700">🎯 Priority Area Focus</div>
          <div className="text-gray-700">🌱 Personalized Growth Path</div>
        </div>
      </div>
    </div>
  );
}

// Tower Visualization Section
function TowerVisualizationSection({ personalityData }) {
  return (
    <div className="tower-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏗️ Your Personality Tower</h2>
        <p className="text-gray-600">
          An interactive visualization representing your complete personality pattern
        </p>
      </div>

      <TowerVisualization personalityData={personalityData} interactive={true} />

      <div className="tower-explanation mt-6 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Understanding Your Tower</h3>
        <p className="text-gray-700 mb-4">
          Your personality tower is a unique visual representation built from your assessment responses. 
          Each component represents a different aspect of your personality pattern:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li><strong>Foundation Stones:</strong> Your core personality type selection pattern</li>
          <li><strong>Building Blocks:</strong> Your growth directions and influence patterns</li>
          <li><strong>Color Palette:</strong> Your current state distribution across healthy, average, and unhealthy levels</li>
          <li><strong>Detail Elements:</strong> Visual patterns representing your priority area focus</li>
        </ul>
      </div>
    </div>
  );
}

// Type Description Section
function TypeDescriptionSection({ header, typeDescription }) {
  return (
    <div className="type-description-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📋 {header.typeName}</h2>
        <p className="text-gray-600">{header.shortDescription}</p>
      </div>

      <div className="type-content space-y-6">
        {typeDescription.paragraph1 && (
          <div className="paragraph bg-white rounded-lg p-6 shadow-sm border">
            <p className="text-gray-700 leading-relaxed">{typeDescription.paragraph1}</p>
          </div>
        )}

        {typeDescription.paragraph2 && (
          <div className="paragraph bg-white rounded-lg p-6 shadow-sm border">
            <p className="text-gray-700 leading-relaxed">{typeDescription.paragraph2}</p>
          </div>
        )}

        {typeDescription.paragraph3 && (
          <div className="paragraph bg-white rounded-lg p-6 shadow-sm border">
            <p className="text-gray-700 leading-relaxed">{typeDescription.paragraph3}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Influence Profile Section
function InfluenceProfileSection({ influenceProfile, personalityData }) {
  if (!influenceProfile) {
    return (
      <div className="influence-section">
        <div className="section-header text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🔗 Influence Profile</h2>
          <p className="text-gray-600">Your secondary influence patterns</p>
        </div>
        <div className="text-center text-gray-500">
          Influence profile data not available for this assessment.
        </div>
      </div>
    );
  }

  return (
    <div className="influence-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔗 {influenceProfile.title}</h2>
        <p className="text-gray-600">How your secondary influence affects your type expression</p>
      </div>

      <div className="influence-content space-y-6">
        <div className="description bg-white rounded-lg p-6 shadow-sm border">
          <p className="text-gray-700 leading-relaxed mb-4">{influenceProfile.description}</p>
          
          {influenceProfile.traits && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">You likely:</h4>
              <ul className="space-y-2">
                {influenceProfile.traits.map((trait, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {influenceProfile.summary && (
          <div className="summary bg-blue-50 rounded-lg p-6 border border-blue-200">
            <p className="text-blue-800 leading-relaxed">{influenceProfile.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// State Analysis Section
function StateAnalysisSection({ stateAnalysis }) {
  return (
    <div className="state-analysis-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 State Analysis</h2>
        <p className="text-gray-600">Your current functioning level and mood patterns</p>
      </div>

      <div className="state-content space-y-6">
        {/* State Distribution */}
        <div className="distribution bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Current State Distribution</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stateAnalysis.distribution.healthy}</div>
              <div className="text-sm text-gray-600">Healthy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stateAnalysis.distribution.average}</div>
              <div className="text-sm text-gray-600">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stateAnalysis.distribution.unhealthy}</div>
              <div className="text-sm text-gray-600">Unhealthy</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{stateAnalysis.overview}</p>
        </div>

        {/* Mood States */}
        {stateAnalysis.moodStates && (
          <div className="mood-states grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mood-card bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">In a Good Mood</h4>
              <p className="text-green-700">{stateAnalysis.moodStates.goodMoodDescription}</p>
            </div>
            <div className="mood-card bg-red-50 rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">In a Bad Mood</h4>
              <p className="text-red-700">{stateAnalysis.moodStates.badMoodDescription}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Subtype Stack Section
function SubtypeStackSection({ subtypeStack }) {
  return (
    <div className="subtype-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🎯 Your Priority Areas</h2>
        <p className="text-gray-600">How you focus your attention and energy</p>
      </div>

      <div className="subtype-content space-y-6">
        {/* Subtype Stack */}
        <div className="stack bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Priority Area Stack</h3>
          <div className="space-y-3">
            {subtypeStack.stack.map((subtype, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{index + 1}. {subtype.name}</span>
                  <span className="text-gray-600 ml-2">({subtype.tokens} tokens)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dominant Description */}
        {subtypeStack.dominantDescription && (
          <div className="dominant bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">
              Primary Focus: {subtypeStack.dominantDescription.name}
            </h4>
            <p className="text-blue-700 mb-3">{subtypeStack.dominantDescription.description}</p>
            {subtypeStack.dominantDescription.traits && (
              <ul className="space-y-1">
                {subtypeStack.dominantDescription.traits.map((trait, index) => (
                  <li key={index} className="text-blue-700 flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    {trait}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Secondary and Growth Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subtypeStack.secondaryDescription && (
            <div className="secondary bg-gray-50 rounded-lg p-4 border">
              <h5 className="font-medium text-gray-800 mb-2">Secondary Focus</h5>
              <p className="text-gray-700 text-sm">{subtypeStack.secondaryDescription.description}</p>
            </div>
          )}
          
          {subtypeStack.growthArea && (
            <div className="growth bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h5 className="font-medium text-yellow-800 mb-2">Growth Opportunity</h5>
              <p className="text-yellow-700 text-sm">{subtypeStack.growthArea.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Growth Path Section
function GrowthPathSection({ growthPath }) {
  return (
    <div className="growth-section">
      <div className="section-header text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🌱 Your Growth Path</h2>
        <p className="text-gray-600">Personalized recommendations for development</p>
      </div>

      <div className="growth-content space-y-6">
        {/* Overall Guidance */}
        {growthPath.overallGuidance && (
          <div className="guidance bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">Overall Guidance</h3>
            <p className="text-green-700">{growthPath.overallGuidance}</p>
          </div>
        )}

        {/* Type-Specific Recommendations */}
        {growthPath.typeSpecific && growthPath.typeSpecific.length > 0 && (
          <div className="type-recommendations bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-4">Growth Recommendations</h3>
            <div className="space-y-3">
              {growthPath.typeSpecific.map((recommendation, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                  <span className="text-blue-600 mr-3 mt-1">→</span>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Domain Focus */}
        {growthPath.domainFocus && growthPath.domainFocus.length > 0 && (
          <div className="domain-focus bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-800 mb-4">Priority Life Domains</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {growthPath.domainFocus.map((domain, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">{domain.domain}</h4>
                  <p className="text-purple-700 text-sm">{domain.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}