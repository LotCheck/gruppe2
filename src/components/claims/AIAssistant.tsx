import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, TrendingUp, Clock, Euro } from 'lucide-react';

interface ClaimData {
  description: string;
  photos: string[];
  location: string;
  dateTime: string;
  estimatedCost: number;
  severity: 'minor' | 'moderate' | 'severe';
  recommendation: string;
  shouldReport: boolean;
}

interface AIAssistantProps {
  claimData: ClaimData;
  onAnalysisUpdate: (updates: Partial<ClaimData>) => void;
}

const AIAssistant = ({
  claimData,
  onAnalysisUpdate
}: AIAssistantProps) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        totalEstimatedCost: 1850,
        deductible: 300,
        coverageCheck: {
          covered: true,
          coverageType: 'Vollkasko',
          limitations: []
        },
        recommendation: {
          shouldReport: true,
          reason: 'Der Schaden übersteigt Ihre Selbstbeteiligung deutlich. Eine Meldung ist wirtschaftlich sinnvoll.',
          confidence: 0.94
        },
        riskAssessment: {
          premiumIncrease: 'Wahrscheinlich keine Erhöhung',
          noClaimsBonus: 'Bleibt erhalten (Vollkasko)',
          futureRisks: 'Gering'
        },
        timeline: {
          processing: '2-3 Werktage',
          repair: '5-7 Werktage',
          totalDuration: '1-2 Wochen'
        },
        nextSteps: ['Schadensmeldung bei Versicherung einreichen', 'Kostenvoranschlag von Partnerwerkstatt einholen', 'Gutachter-Termin vereinbaren (wird automatisch organisiert)', 'Reparaturfreigabe abwarten']
      };
      setAnalysis(mockAnalysis);
      onAnalysisUpdate({
        estimatedCost: mockAnalysis.totalEstimatedCost,
        recommendation: mockAnalysis.recommendation.reason,
        shouldReport: mockAnalysis.recommendation.shouldReport
      });
      setAnalyzing(false);
    }, 3000);
  }, [claimData, onAnalysisUpdate]);

  if (analyzing) {
    return <div className="text-center py-12">
        <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold mb-4">KI analysiert Ihren Schaden...</h3>
        <div className="space-y-2 text-gray-600">
          <p>✓ Schadensbeschreibung ausgewertet</p>
          <p>✓ Fotos analysiert und klassifiziert</p>
          <p>✓ Versicherungsschutz geprüft</p>
          <p className="animate-pulse">⏳ Kostenschätzung und Empfehlungen werden erstellt...</p>
        </div>
      </div>;
  }

  return <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">KI-Analyse Ergebnis</h3>
        <p className="text-gray-600">
          Basierend auf Ihrer Beschreibung und den Fotos haben wir eine umfassende Analyse erstellt.
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className={`border-2 ${analysis.recommendation.shouldReport ? 'border-green-500 bg-green-50' : 'border-yellow-500 bg-yellow-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {analysis.recommendation.shouldReport ? <CheckCircle className="h-6 w-6 text-green-600" /> : <AlertTriangle className="h-6 w-6 text-yellow-600" />}
            <span className={analysis.recommendation.shouldReport ? 'text-green-800' : 'text-yellow-800'}>
              {analysis.recommendation.shouldReport ? 'Schaden melden empfohlen' : 'Meldung nicht empfohlen'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`mb-4 ${analysis.recommendation.shouldReport ? 'text-green-700' : 'text-yellow-700'}`}>
            {analysis.recommendation.reason}
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              {Math.round(analysis.recommendation.confidence * 100)}% Genauigkeit
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Compact Cost Analysis - Mobile Optimized */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Euro className="h-6 w-6 text-blue-600" />
            <span>Kostenübersicht</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Geschätzte Kosten</p>
              <p className="text-2xl sm:text-xl font-bold text-blue-600">€{analysis.totalEstimatedCost}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Ihre Selbstbeteiligung</p>
              <p className="text-2xl sm:text-xl font-bold text-orange-600">€{analysis.deductible}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Ihre Ersparnis</p>
              <p className="text-2xl sm:text-xl font-bold text-green-600">€{analysis.totalEstimatedCost - analysis.deductible}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coverage Details - moved below recommendation */}
      <Card>
        <CardHeader>
          <CardTitle>Versicherungsschutz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium">Vollständig abgedeckt durch {analysis.coverageCheck.coverageType}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Beitragserhöhung:</span>
              <p className="font-medium">{analysis.riskAssessment.premiumIncrease}</p>
            </div>
            <div>
              <span className="text-gray-600">Schadenfreiheitsklasse:</span>
              <p className="font-medium">{analysis.riskAssessment.noClaimsBonus}</p>
            </div>
            <div>
              <span className="text-gray-600">Zukünftiges Risiko:</span>
              <p className="font-medium">{analysis.riskAssessment.futureRisks}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};

export default AIAssistant;
