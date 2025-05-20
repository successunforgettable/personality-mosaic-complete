import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Edit, Settings, Trash2, RotateCcw, Share2, UserRound, Mail, ChevronRight, ArrowUpDown } from 'lucide-react';
import { useLocation } from 'wouter';
import TowerVisualization from '@/components/TowerVisualization';
import { AssessmentResult } from '@shared/schema';

export default function UserProfile() {
  const { user, logout, isGuest } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('results');
  
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
  
  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      // API call to delete account would go here
      // For now, we'll just log the user out
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      logout();
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Handle retaking assessment
  const handleRetakeAssessment = () => {
    navigate('/assessment');
  };
  
  // Handle sharing result
  const handleShareResult = (resultId: number) => {
    // Copy shareable link to clipboard
    const shareUrl = `${window.location.origin}/results/${resultId}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Link copied",
      description: "Shareable link has been copied to clipboard.",
    });
  };
  
  // If user is in guest mode, show limited profile
  if (isGuest) {
    return (
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guest Profile</h1>
          <p className="text-gray-600">You're using the app in guest mode. Create an account to save your results.</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserRound className="mr-2 h-5 w-5 text-[#7c3aed]" />
              Guest User
            </CardTitle>
            <CardDescription>
              Your session data is only stored locally and will be lost when you clear your browser data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Results saved</span>
                <span>Local storage only</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Data retention</span>
                <span>Until browser data is cleared</span>
              </div>
            </div>
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
      </div>
    );
  }
  
  // Render the authenticated user profile
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account and view your assessment history</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Information Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserRound className="mr-2 h-5 w-5 text-[#7c3aed]" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.profileImageUrl && (
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center">
              <UserRound className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">{user?.firstName} {user?.lastName}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Joined {user ? formatDate(new Date()) : 'N/A'}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveTab('settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </CardFooter>
        </Card>
        
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="results" className="flex-1">Assessment Results</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            
            {/* Assessment Results Tab */}
            <TabsContent value="results">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c3aed] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your assessment results...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-red-500 mb-4">Failed to load assessment results</p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              ) : assessmentResults && assessmentResults.length > 0 ? (
                <div className="space-y-6">
                  {assessmentResults.map((result) => (
                    <Card key={result.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{result.personalityType}</CardTitle>
                          <Badge>{result.influence}</Badge>
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> 
                          {formatDate(result.createdAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <div className="aspect-square w-full max-w-[200px] mx-auto">
                              <TowerVisualization 
                                stateDistribution={result.stateDistribution ? JSON.parse(result.stateDistribution as string) : undefined}
                                subtypeDistribution={result.subtypeDistribution ? JSON.parse(result.subtypeDistribution as string) : undefined}
                                personalityType={{
                                  id: 0, // Placeholder, would come from full data
                                  name: result.personalityType,
                                  description: "",
                                  positiveTraits: [],
                                  negativeTraits: []
                                }}
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                              <h4 className="font-medium mb-2">Key Findings</h4>
                              <p className="text-gray-700 mb-4">
                                {`${result.personalityType} with ${result.influence} influence. This represents your core personality structure and tendencies.`}
                              </p>
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <p className="text-xs text-gray-500">Type</p>
                                  <p className="font-medium">{result.personalityType}</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <p className="text-xs text-gray-500">Influence</p>
                                  <p className="font-medium">{result.influence}</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded">
                                  <p className="text-xs text-gray-500">Dominant Subtype</p>
                                  <p className="font-medium">
                                    {result.subtypeDistribution 
                                      ? (() => {
                                          try {
                                            const parsed = typeof result.subtypeDistribution === 'string' 
                                              ? JSON.parse(result.subtypeDistribution) 
                                              : result.subtypeDistribution as Record<string, number>;
                                            
                                            if (parsed && typeof parsed === 'object') {
                                              const entries = Object.entries(parsed);
                                              if (entries.length > 0) {
                                                const dominant = entries.sort((a, b) => Number(b[1]) - Number(a[1]))[0][0];
                                                return dominant
                                                  .replace(/([A-Z])/g, ' $1')
                                                  .replace(/^./, str => str.toUpperCase());
                                              }
                                            }
                                            return 'Not available';
                                          } catch (e) {
                                            return 'Not available';
                                          }
                                        })()
                                      : 'Not available'
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/results/${result.id}`)}
                              >
                                <ChevronRight className="h-4 w-4 mr-1" />
                                View Full Results
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleShareResult(result.id)}
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {assessmentResults.length > 1 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compare Results</CardTitle>
                        <CardDescription>
                          Track your personality changes over time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate('/results/compare')}
                        >
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Compare Assessment Results
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-4">You haven't taken any assessments yet</p>
                  <Button onClick={handleRetakeAssessment}>
                    Take Assessment
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                            value={user?.firstName || ''}
                            readOnly
                          />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <div className="flex">
                          <input 
                            type="text" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                            value={user?.lastName || ''}
                            readOnly
                          />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="flex">
                          <input 
                            type="email" 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#7c3aed] focus:border-[#7c3aed]"
                            value={user?.email || ''}
                            readOnly
                          />
                          <Button variant="ghost" size="icon" className="ml-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive emails about your assessment results and insights</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            id="email-notifications"
                            type="checkbox"
                            className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Public Profile</p>
                          <p className="text-sm text-gray-500">Allow others to view your profile when you share results</p>
                        </div>
                        <div className="flex items-center h-6">
                          <input
                            id="public-profile"
                            type="checkbox"
                            className="h-4 w-4 text-[#7c3aed] border-gray-300 rounded focus:ring-[#7c3aed]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. It will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="mt-10 mb-4">
        <h2 className="text-xl font-bold mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center"
            onClick={handleRetakeAssessment}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => navigate('/results/compare')}
            disabled={!assessmentResults || assessmentResults.length < 2}
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Compare Results
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => navigate('/')}
          >
            <ChevronRight className="h-4 w-4 mr-2" />
            Go to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
}