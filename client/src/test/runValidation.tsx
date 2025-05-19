import React, { useState, useEffect } from 'react';
import { testWingDetermination, testCompletePersonalitySystem, getValidationStats } from './personalityValidation';

// Component to run and display validation results
const PersonalitySystemValidator: React.FC = () => {
  const [wingResults, setWingResults] = useState<any[]>([]);
  const [completeResults, setCompleteResults] = useState<any[]>([]);
  const [wingStats, setWingStats] = useState<any>(null);
  const [completeStats, setCompleteStats] = useState<any>(null);

  useEffect(() => {
    // Run the wing validation test
    const wingValidationResults = testWingDetermination();
    setWingResults(wingValidationResults);
    setWingStats(getValidationStats(wingValidationResults));

    // Run the complete system validation test
    const completeValidationResults = testCompletePersonalitySystem();
    setCompleteResults(completeValidationResults);
    setCompleteStats(getValidationStats(completeValidationResults));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Personality System Validation</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Wing Determination Test</h2>
        {wingStats && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p><strong>Total Tests:</strong> {wingStats.totalTests}</p>
            <p><strong>Valid Results:</strong> {wingStats.validResults} ({wingStats.validPercentage.toFixed(2)}%)</p>
            <p className={wingStats.allValid ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {wingStats.allValid ? "✅ All wing combinations are valid!" : "❌ Some invalid wing combinations detected!"}
            </p>
          </div>
        )}
        
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Primary Type</th>
              <th className="border border-gray-300 p-2">Assigned Wing</th>
              <th className="border border-gray-300 p-2">Valid?</th>
              <th className="border border-gray-300 p-2">Valid Wing Options</th>
            </tr>
          </thead>
          <tbody>
            {wingResults.map((result, index) => (
              <tr key={index} className={result.isValid ? "bg-green-50" : "bg-red-50"}>
                <td className="border border-gray-300 p-2">{result.primaryType}</td>
                <td className="border border-gray-300 p-2">{result.wing}</td>
                <td className="border border-gray-300 p-2">
                  {result.isValid ? (
                    <span className="text-green-600 font-bold">✅ Yes</span>
                  ) : (
                    <span className="text-red-600 font-bold">❌ No</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">{result.validWings.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Complete Personality System Test</h2>
        {completeStats && (
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p><strong>Total Tests:</strong> {completeStats.totalTests}</p>
            <p><strong>Valid Results:</strong> {completeStats.validResults} ({completeStats.validPercentage.toFixed(2)}%)</p>
            <p className={completeStats.allValid ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
              {completeStats.allValid ? "✅ All personality type combinations are valid!" : "❌ Some invalid type combinations detected!"}
            </p>
          </div>
        )}
        
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Primary Type</th>
              <th className="border border-gray-300 p-2">Assigned Wing</th>
              <th className="border border-gray-300 p-2">Valid?</th>
              <th className="border border-gray-300 p-2">Valid Wing Options</th>
            </tr>
          </thead>
          <tbody>
            {completeResults.map((result, index) => (
              <tr key={index} className={result.isValid ? "bg-green-50" : "bg-red-50"}>
                <td className="border border-gray-300 p-2">{result.primaryType}</td>
                <td className="border border-gray-300 p-2">{result.wing}</td>
                <td className="border border-gray-300 p-2">
                  {result.isValid ? (
                    <span className="text-green-600 font-bold">✅ Yes</span>
                  ) : (
                    <span className="text-red-600 font-bold">❌ No</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">{result.validWings.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalitySystemValidator;