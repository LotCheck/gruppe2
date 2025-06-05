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

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Euro className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h4 className="font-semibold mb-1">Geschätzte Kosten</h4>
            <p className="text-2xl font-bold text-blue-600">€{analysis.totalEstimatedCost}</p>
            <p className="text-sm text-gray-600">Reparaturkosten</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 font-bold">SB</span>
            </div>
            <h4 className="font-semibold mb-1">Ihre Selbstbeteiligung</h4>
            <p className="text-2xl font-bold text-orange-600">€{analysis.deductible}</p>
            <p className="text-sm text-gray-600">Eigenanteil</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h4 className="font-semibold mb-1">Ihre Ersparnis</h4>
            <p className="text-2xl font-bold text-green-600">€{analysis.totalEstimatedCost - analysis.deductible}</p>
            <p className="text-sm text-gray-600">Durch Versicherung</p>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Details */}
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

      {/* Timeline */}
      
    </div>;
};
export default AIAssistant;