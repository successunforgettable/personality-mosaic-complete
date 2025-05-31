import { useState } from 'react';
import { runAlgorithmValidation, validateCurrentResult } from '../test/algorithmValidation.js';

/**
 * Validation Page for testing algorithm accuracy
 */
export default function ValidationPage() {
  const [validationResults, setValidationResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runValidation = async () => {
    setIsRunning(true);
    try {
      const results = runAlgorithmValidation();
      setValidationResults(results);
    } catch (error) {
      console.error('Validation error:', error);
    }
    setIsRunning(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Algorithm Validation System
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Test the personality assessment algorithm against known patterns to verify accuracy.
      </p>

      <button
        onClick={runValidation}
        disabled={isRunning}
        style={{
          background: isRunning ? '#94a3b8' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '1rem 2rem',
          fontSize: '1rem',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          marginBottom: '2rem'
        }}
      >
        {isRunning ? 'Running Validation...' : 'Run Algorithm Validation'}
      </button>

      {validationResults && (
        <div>
          {/* Summary */}
          <div style={{
            background: validationResults.failed === 0 ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${validationResults.failed === 0 ? '#34d399' : '#ef4444'}`,
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              color: validationResults.failed === 0 ? '#047857' : '#dc2626',
              fontSize: '1.5rem',
              marginBottom: '1rem'
            }}>
              Validation Summary
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  {validationResults.totalTests}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Tests</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {validationResults.passed}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Passed</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                  {validationResults.failed}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Failed</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                  {Math.round((validationResults.passed / validationResults.totalTests) * 100)}%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Success Rate</div>
              </div>
            </div>
          </div>

          {/* Critical Issues */}
          {validationResults.overallIssues.length > 0 && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #ef4444',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#dc2626', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Critical Issues Found
              </h3>
              {validationResults.overallIssues.map((issue, index) => (
                <div key={index} style={{
                  background: 'white',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  color: '#991b1b',
                  fontSize: '0.9rem'
                }}>
                  {issue}
                </div>
              ))}
            </div>
          )}

          {/* Detailed Results */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
              Detailed Test Results
            </h3>
            
            {Object.entries(validationResults.details).map(([key, result]) => (
              <div key={key} style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#1e293b', fontSize: '1.1rem' }}>
                    {result.patternName}
                  </h4>
                  <div style={{
                    background: result.passed ? '#10b981' : '#ef4444',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {/* Primary Type */}
                  <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                      Primary Type
                    </h5>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <div>Expected: {result.details.primaryType.expected}</div>
                      <div>Detected: {result.details.primaryType.detected}</div>
                      <div>Confidence: {result.details.primaryType.confidence}%</div>
                      <div style={{ 
                        color: result.details.primaryType.passed ? '#10b981' : '#ef4444',
                        fontWeight: '600'
                      }}>
                        {result.details.primaryType.passed ? '✓ Match' : '✗ Mismatch'}
                      </div>
                    </div>
                  </div>

                  {/* Wing */}
                  <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                      Wing/Influence
                    </h5>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <div>Expected: {result.details.wing.expected.join(' or ')}</div>
                      <div>Detected: {result.details.wing.detected}</div>
                      <div>Strength: {result.details.wing.strength}</div>
                      <div style={{ 
                        color: result.details.wing.passed ? '#10b981' : '#ef4444',
                        fontWeight: '600'
                      }}>
                        {result.details.wing.passed ? '✓ Match' : '✗ Mismatch'}
                      </div>
                    </div>
                  </div>

                  {/* Subtype */}
                  <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                      Subtype
                    </h5>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      <div>Expected: {result.details.subtype.expected}</div>
                      <div>Detected: {result.details.subtype.detected}</div>
                      <div>Stack: {result.details.subtype.stack}</div>
                      <div style={{ 
                        color: result.details.subtype.passed ? '#10b981' : '#ef4444',
                        fontWeight: '600'
                      }}>
                        {result.details.subtype.passed ? '✓ Match' : '✗ Mismatch'}
                      </div>
                    </div>
                  </div>
                </div>

                {result.issues.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#dc2626' }}>
                      Issues:
                    </h5>
                    {result.issues.map((issue, index) => (
                      <div key={index} style={{ 
                        fontSize: '0.8rem', 
                        color: '#991b1b', 
                        marginBottom: '0.25rem',
                        paddingLeft: '1rem'
                      }}>
                        • {issue}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}