// Personality Report Content Generation using Claude API
// Copy this into your Replit project

// 1. Install the required package (run in Replit shell):
// npm install @anthropic-ai/sdk

const Anthropic = require('@anthropic-ai/sdk');

// 2. Add your Claude API key (get from console.anthropic.com)
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY // Store in Replit Secrets
});

// 3. Content Generation Functions

class PersonalityReportGenerator {
  
  // Generate Growth Recommendations
  async generateGrowthRecommendations(personalityData) {
    const prompt = `You are an expert personality coach creating a diagnostic-style growth assessment. Based on this personality data, generate 4-5 concise growth recommendations that sound like medical insights.

PERSONALITY DATA:
- Type: ${personalityData.primaryType.name} ${personalityData.influence.influenceNumber} (${personalityData.influence.strength} influence)
- Subtype Focus: ${personalityData.subtypeFocus.dominantName} primary (${personalityData.subtypeFocus.percentages[personalityData.subtypeFocus.dominantFocus]}%)
- Heart Activation: ${personalityData.heartActivation.activationPercentage}%
- Stress Pattern: Tends toward Type ${personalityData.moodPatterns.badMood.type} when stressed
- Growth Pattern: Moves toward Type ${personalityData.moodPatterns.goodMood.type} when thriving

FORMAT: Return 4-5 bullet points, each 15-25 words. Focus on:
1. Address current limitations from their stress patterns
2. Leverage their natural strengths and focus area  
3. Unlock potential from their heart activation level
4. Build on their growth direction patterns
5. Set up "The Incredible You" program as the solution

TONE: Clinical but inspiring, like a medical report showing treatable conditions with clear pathways to improvement.

AVOID: Any Enneagram terminology, wings, arrows, instincts, etc.`;

    return await this.callClaude(prompt);
  }

  // Generate Life Domain Analysis
  async generateLifeDomainAnalysis(personalityData, domain) {
    const domainSpecs = {
      'health': 'physical wellness, energy levels, stress management, and self-care practices',
      'career': 'professional fulfillment, leadership potential, work-life balance, and career advancement',
      'financial': 'money management, abundance mindset, financial security, and wealth building',
      'relationships': 'intimate connections, communication patterns, emotional availability, and relationship depth'
    };

    const prompt = `Create a life domain analysis for ${domain.toUpperCase()} that reads like a medical assessment with clear current state and transformation potential.

PERSONALITY PROFILE:
- Type: ${personalityData.primaryType.name} ${personalityData.influence.influenceNumber}
- Subtype: ${personalityData.subtypeFocus.dominantName} focus (${personalityData.subtypeFocus.percentages[personalityData.subtypeFocus.dominantFocus]}%)
- Heart Activation: ${personalityData.heartActivation.activationPercentage}%
- Stress Response: Type ${personalityData.moodPatterns.badMood.type} patterns
- Growth Access: Type ${personalityData.moodPatterns.goodMood.type} qualities

DOMAIN FOCUS: ${domainSpecs[domain]}

STRUCTURE:
**Current State:** (40-60 words describing their current ${domain} patterns, challenges, and limitations based on their personality profile)

**Key Indicators:** (3-4 bullet points, 8-12 words each, showing specific symptoms/signs)

**Trajectory Without Change:** (30-40 words painting the concerning picture if they don't transform)

**Transformation Potential:** (40-60 words describing what's possible with "The Incredible You" program - specific, inspiring outcomes)

TONE: Professional medical assessment style. Direct about current limitations, inspiring about potential. Reference their specific activation percentage and patterns.`;

    return await this.callClaude(prompt);
  }

  // Generate Leadership Pattern Analysis
  async generateLeadershipPattern(personalityData) {
    const prompt = `Create a leadership pattern assessment that sounds like a professional psychological profile.

PERSONALITY DATA:
- Core Pattern: ${personalityData.primaryType.description}
- Type: ${personalityData.primaryType.name} with ${personalityData.influence.influenceNumber} influence
- Social Focus: ${personalityData.subtypeFocus.dominantName} primary (${personalityData.subtypeFocus.percentages[personalityData.subtypeFocus.dominantFocus]}%)
- Activation Level: ${personalityData.heartActivation.activationPercentage}%

CONTENT STRUCTURE:
**Leadership Archetype:** [One compelling phrase describing their leadership style]

**Current Expression:** (50-70 words describing how they currently show up as leaders, including both strengths and shadow patterns)

**Activation Indicators:** (3-4 bullet points showing specific leadership behaviors and tendencies)

**Transformation Through "The Incredible You":** (40-60 words describing their evolved leadership potential)

TONE: Authoritative psychological assessment. Acknowledge current patterns honestly while showing exciting growth potential.`;

    return await this.callClaude(prompt);
  }

  // Generate Heart Activation Profile
  async generateHeartActivationProfile(personalityData) {
    const activationLevel = personalityData.heartActivation.activationPercentage;
    const gapPercentage = 100 - activationLevel;

    const prompt = `Create a heart activation assessment that reads like a medical diagnostic report.

ACTIVATION DATA:
- Current Level: ${activationLevel}%
- Growth Potential: ${gapPercentage}% untapped capacity
- Dominant State: ${personalityData.heartActivation.dominantState}
- Type Pattern: ${personalityData.primaryType.name} with ${personalityData.subtypeFocus.dominantName} focus

STRUCTURE:
**Current Activation Status:** (30-40 words describing what ${activationLevel}% activation means for their life experience)

**Diagnostic Indicators:**
- State Distribution: [Brief description of their current state mix]
- Engagement Patterns: [How this shows up in daily life]
- Limitation Factors: [What's preventing full activation]

**Optimization Potential:** (40-50 words describing the transformation possible through increasing to 90%+ activation via "The Incredible You" program)

TONE: Clinical diagnostic style, like a heart specialist explaining test results. Professional but accessible, showing clear pathway to improvement.`;

    return await this.callClaude(prompt);
  }

  // Generate complete personalized report
  async generateCompleteReport(personalityData) {
    try {
      const [
        growthRecs,
        healthAnalysis,
        careerAnalysis,
        financialAnalysis,
        relationshipAnalysis,
        leadershipPattern,
        heartProfile
      ] = await Promise.all([
        this.generateGrowthRecommendations(personalityData),
        this.generateLifeDomainAnalysis(personalityData, 'health'),
        this.generateLifeDomainAnalysis(personalityData, 'career'),
        this.generateLifeDomainAnalysis(personalityData, 'financial'),
        this.generateLifeDomainAnalysis(personalityData, 'relationships'),
        this.generateLeadershipPattern(personalityData),
        this.generateHeartActivationProfile(personalityData)
      ]);

      return {
        growthRecommendations: growthRecs,
        lifeDomains: {
          health: healthAnalysis,
          career: careerAnalysis,
          financial: financialAnalysis,
          relationships: relationshipAnalysis
        },
        leadershipPattern: leadershipPattern,
        heartActivationProfile: heartProfile,
        personalityData: personalityData.summary
      };

    } catch (error) {
      console.error('Report generation error:', error);
      throw new Error('Failed to generate personalized report');
    }
  }

  // Core Claude API call function
  async callClaude(prompt) {
    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        temperature: 0.7,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Claude API error:', error);
      throw error;
    }
  }
}

// 4. Usage Example
async function generatePersonalityReport(personalityData) {
  const generator = new PersonalityReportGenerator();
  
  try {
    const report = await generator.generateCompleteReport(personalityData);
    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    return null;
  }
}

// 5. Export for use in your Replit app
module.exports = {
  PersonalityReportGenerator,
  generatePersonalityReport
};

// 6. Example API endpoint for your app
/*
app.post('/api/generate-report', async (req, res) => {
  try {
    const personalityData = req.body;
    const report = await generatePersonalityReport(personalityData);
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
*/