import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Calendar, ArrowLeft, ArrowRight, BarChart2, PieChart, Clock, RefreshCw } from 'lucide-react';
import TowerVisualization from '@/components/TowerVisualization';
import { AssessmentResult } from '@shared/schema';

export default function ResultsCompare() {
  const { user, isGuest } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [selectedResults, setSelectedResults] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'states' | 'subtypes' | 'overview'>('overview');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isGuest) {
      navigate('/login');
    }
  }, [user, isGuest, navigate]);
  
  // Fetch user assessment results
  const { data: assessmentResults, isLoading, error } = useQuery<AssessmentResult[]>({
    queryKey: ['/api/assessment/results'],
    enabled: !!user && !isGuest,
  });
  
  // Format date for display
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Handle result selection
  const toggleResultSelection = (resultId: number) => {
    if (selectedResults.includes(resultId)) {
      setSelectedResults(selectedResults.filter(id => id !== resultId));
    } else {
      // Limit to comparing maximum 3 results at a time
      if (selectedResults.length < 3) {
        setSelectedResults([...selectedResults, resultId]);
      } else {
        toast({
          title: "Selection limit reached",
          description: "You can compare up to 3 results at a time",
          variant: "destructive",
        });
      }
    }
  };
  
  // Get selected assessment results data
  const getSelectedResults = () => {
    if (!assessmentResults) return [];
    return assessmentResults.filter(result => selectedResults.includes(result.id));
  };
  
  // Parse state distribution data
  const parseStateDistribution = (distribution: unknown): Record<string, number> => {
    if (!distribution) return { veryGood: 0, good: 0, average: 0, belowAverage: 0, destructive: 0 };
    try {
      if (typeof distribution === 'string') {
        return JSON.parse(distribution);
      }
      return distribution as Record<string, number>;
    } catch {
      return { veryGood: 0, good: 0, average: 0, belowAverage: 0, destructive: 0 };
    }
  };
  
  // Parse subtype distribution data
  const parseSubtypeDistribution = (distribution: unknown): Record<string, number> => {
    if (!distribution) return { selfPreservation: 0, oneToOne: 0, social: 0 };
    try {
      if (typeof distribution === 'string') {
        return JSON.parse(distribution);
      }
      return distribution as Record<string, number>;
    } catch {
      return { selfPreservation: 0, oneToOne: 0, social: 0 };
    }
  };
  
  // Get state distribution comparison data
  const getStateComparisonData = () => {
    const selected = getSelectedResults();
    return {
      labels: ['Very Good', 'Good', 'Average', 'Below Average', 'Destructive'],
      datasets: selected.map((result, index) => {
        const distribution = parseStateDistribution(result.stateDistribution);
        return {
          label: formatDate(result.createdAt),
          data: [
            distribution.veryGood || 0,
            distribution.good || 0,
            distribution.average || 0,
            distribution.belowAverage || 0,
            distribution.destructive || 0
          ],
          backgroundColor: getColorByIndex(index),
          borderColor: getColorByIndex(index),
          borderWidth: 1,
        };
      }),
    };
  };
  
  // Get subtype distribution comparison data
  const getSubtypeComparisonData = () => {
    const selected = getSelectedResults();
    return {
      labels: ['Self-Preservation', 'One-to-One', 'Social'],
      datasets: selected.map((result, index) => {
        const distribution = parseSubtypeDistribution(result.subtypeDistribution);
        return {
          label: formatDate(result.createdAt),
          data: [
            distribution.selfPreservation || 0,
            distribution.oneToOne || 0,
            distribution.social || 0,
          ],
          backgroundColor: getColorByIndex(index),
          borderColor: getColorByIndex(index),
          borderWidth: 1,
        };
      }),
    };
  };
  
  // Get color for chart based on index
  const getColorByIndex = (index: number): string => {
    const colors = ['#7c3aed', '#ef4444', '#10b981', '#f59e0b'];
    return colors[index % colors.length];
  };
  
  // If user is in guest mode, show limited view
  if (isGuest) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
          <p className="text-gray-600">You're using the app in guest mode. Create an account to save and compare your results.</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Guest Mode</CardTitle>
            <CardDescription>
              Result comparison is only available for registered users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Create an account to save your assessment results and track your progress over time.
              The comparison feature allows you to see how your personality profile evolves.
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4 w-full">
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate('/signup')}
              >
                Create Account
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/assessment')}
              >
                Take Assessment
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Home
        </Button>
      </div>
    );
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
          <p className="text-gray-600">Loading your assessment results...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c3aed]"></div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !assessmentResults) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
          <p className="text-red-500">Failed to load your assessment results</p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // Show no results state
  if (assessmentResults.length === 0) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
          <p className="text-gray-600">You haven't taken any assessments yet</p>
        </div>
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <p className="text-gray-700 mb-4">
              Take an assessment to see your personality profile and compare results over time.
            </p>
            <Button
              onClick={() => navigate('/assessment')}
            >
              Take Assessment
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Profile
        </Button>
      </div>
    );
  }
  
  // Show need more results state
  if (assessmentResults.length === 1) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
          <p className="text-gray-600">You need at least two assessment results to compare</p>
        </div>
        <Card className="mb-6">
          <CardContent className="p-8 text-center">
            <p className="text-gray-700 mb-4">
              You currently have only one assessment result. Take another assessment 
              to compare how your personality profile changes over time.
            </p>
            <Button
              onClick={() => navigate('/assessment')}
              className="mt-4"
            >
              Take Another Assessment
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Profile
        </Button>
      </div>
    );
  }
  
  // Main comparison view
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Results</h1>
        <p className="text-gray-600">Select up to 3 assessment results to compare</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Selector Panel */}
        <div className="md:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Select Results</CardTitle>
              <CardDescription>Choose up to 3 results to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentResults.map((result) => (
                  <div 
                    key={result.id} 
                    className={`p-3 rounded border ${selectedResults.includes(result.id) ? 'border-[#7c3aed] bg-[#f5f3ff]' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <Checkbox 
                        id={`result-${result.id}`}
                        checked={selectedResults.includes(result.id)}
                        onCheckedChange={() => toggleResultSelection(result.id)}
                        className="mr-2"
                      />
                      <div className="flex-grow">
                        <div className="font-medium">{result.personalityType}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(result.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedResults([])}
                disabled={selectedResults.length === 0}
                className="w-full"
              >
                Clear Selection
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Comparison Panel */}
        <div className="md:col-span-8">
          {selectedResults.length === 0 ? (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Select assessment results to compare</p>
                <p className="text-sm text-gray-400">Choose from the panel on the left</p>
              </div>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Comparison View</CardTitle>
                <CardDescription>
                  Comparing {selectedResults.length} {selectedResults.length === 1 ? 'result' : 'results'}
                </CardDescription>
                <div className="flex mt-2 space-x-2">
                  <Button 
                    variant={activeTab === 'overview' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </Button>
                  <Button 
                    variant={activeTab === 'states' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('states')}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" />
                    States
                  </Button>
                  <Button 
                    variant={activeTab === 'subtypes' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTab('subtypes')}
                  >
                    <PieChart className="h-4 w-4 mr-1" />
                    Subtypes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {getSelectedResults().map((result) => (
                      <div key={result.id} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/3 flex justify-center">
                            <div className="aspect-square w-full max-w-[180px]">
                              <TowerVisualization 
                                stateDistribution={parseStateDistribution(result.stateDistribution)}
                                subtypeDistribution={parseSubtypeDistribution(result.subtypeDistribution)}
                                personalityType={{
                                  id: 0,
                                  name: result.personalityType,
                                  description: "",
                                  positiveTraits: [],
                                  negativeTraits: []
                                }}
                              />
                            </div>
                          </div>
                          <div className="w-full md:w-2/3">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold">{result.personalityType}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(result.createdAt)}
                              </div>
                            </div>
                            <div className="text-sm mb-4">
                              with {result.influence} influence
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              <div className="border rounded p-2">
                                <div className="text-xs text-gray-500 mb-1">State Distribution</div>
                                <div className="grid grid-cols-5 gap-1 h-4">
                                  {Object.entries(parseStateDistribution(result.stateDistribution)).map(([key, value], index) => (
                                    <div 
                                      key={key}
                                      className="h-full rounded-sm"
                                      style={{
                                        backgroundColor: getStateColor(key),
                                        width: `${value}%`
                                      }}
                                      title={`${key}: ${value}%`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="border rounded p-2">
                                <div className="text-xs text-gray-500 mb-1">Subtype Distribution</div>
                                <div className="grid grid-cols-3 gap-1 h-4">
                                  {Object.entries(parseSubtypeDistribution(result.subtypeDistribution)).map(([key, value], index) => (
                                    <div 
                                      key={key}
                                      className="h-full rounded-sm"
                                      style={{
                                        backgroundColor: getSubtypeColor(key),
                                        width: `${value}%`
                                      }}
                                      title={`${key}: ${value}%`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'states' && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4">State Distribution Comparison</h3>
                    <div className="text-center text-sm text-gray-500 mb-6">
                      This chart displays how your states distribution (Very Good, Good, Average, Below Average, Destructive) has changed across assessments.
                    </div>
                    
                    <div className="mt-6">
                      <div className="space-y-4">
                        {getSelectedResults().map((result, index) => {
                          const stateData = parseStateDistribution(result.stateDistribution);
                          return (
                            <div key={result.id} className="border rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: getColorByIndex(index) }}
                                ></div>
                                <span className="font-medium">{formatDate(result.createdAt)}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {Object.entries(stateData).map(([key, value]) => (
                                  <div key={key} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}: {value}%
                                  </div>
                                ))}
                              </div>
                              <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden flex">
                                {Object.entries(stateData).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="h-full"
                                    style={{
                                      width: `${value}%`,
                                      backgroundColor: getStateColor(key)
                                    }}
                                    title={`${key}: ${value}%`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'subtypes' && (
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-4">Subtype Distribution Comparison</h3>
                    <div className="text-center text-sm text-gray-500 mb-6">
                      This chart displays how your subtype distribution (Self-Preservation, One-to-One, Social) has changed across assessments.
                    </div>
                    
                    <div className="mt-6">
                      <div className="space-y-4">
                        {getSelectedResults().map((result, index) => {
                          const subtypeData = parseSubtypeDistribution(result.subtypeDistribution);
                          return (
                            <div key={result.id} className="border rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: getColorByIndex(index) }}
                                ></div>
                                <span className="font-medium">{formatDate(result.createdAt)}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {Object.entries(subtypeData).map(([key, value]) => (
                                  <div key={key} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}: {value}%
                                  </div>
                                ))}
                              </div>
                              <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden flex">
                                {Object.entries(subtypeData).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="h-full"
                                    style={{
                                      width: `${value}%`,
                                      backgroundColor: getSubtypeColor(key)
                                    }}
                                    title={`${key}: ${value}%`}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Return to Profile
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/assessment')}
        >
          Take New Assessment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Helper function to get color for state
function getStateColor(state: string): string {
  const colors: Record<string, string> = {
    veryGood: '#22c55e',    // Green
    good: '#10b981',        // Teal
    average: '#f59e0b',     // Amber
    belowAverage: '#f97316', // Orange
    destructive: '#ef4444',  // Red
  };
  
  return colors[state] || '#94a3b8'; // Default gray if not found
}

// Helper function to get color for subtype
function getSubtypeColor(subtype: string): string {
  const colors: Record<string, string> = {
    selfPreservation: '#8b5cf6', // Purple
    oneToOne: '#ec4899',        // Pink
    social: '#3b82f6',          // Blue
  };
  
  return colors[subtype] || '#94a3b8'; // Default gray if not found
}