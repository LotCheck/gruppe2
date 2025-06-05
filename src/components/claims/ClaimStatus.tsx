
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Download, 
  MapPin,
  Calendar,
  Bell,
  Star
} from 'lucide-react';

interface ClaimStatusProps {
  claimId: string;
}

const ClaimStatus = ({ claimId }: ClaimStatusProps) => {
  const [claimData, setClaimData] = useState<any>(null);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Simulate loading claim data
    setTimeout(() => {
      setClaimData({
        id: claimId,
        status: 'in_progress',
        submittedAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        currentStep: 'assessment',
        updates: [
          {
            timestamp: new Date().toISOString(),
            type: 'submitted',
            title: 'Schaden erfolgreich gemeldet',
            description: 'Ihre Schadensmeldung wurde bei der Versicherung eingereicht.'
          },
          {
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            type: 'assigned',
            title: 'Sachbearbeiter zugewiesen',
            description: 'Ihr Schaden wurde an Sarah Mueller übertragen.'
          }
        ],
        assignedAgent: {
          name: 'Sarah Mueller',
          phone: '+49 30 12345678',
          email: 'sarah.mueller@autoschild.de',
          avatar: '/placeholder.svg'
        },
        documents: [
          { name: 'Schadensmeldung_komplett.pdf', size: '2.1 MB', type: 'report' },
          { name: 'Fotos_Schaden.zip', size: '15.8 MB', type: 'photos' },
          { name: 'Kostenvoranschlag_Werkstatt.pdf', size: '0.8 MB', type: 'estimate' }
        ],
        nextActions: [
          {
            title: 'Gutachtertermin vereinbaren',
            description: 'Ein Kfz-Sachverständiger wird Ihr Fahrzeug begutachten.',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'high'
          },
          {
            title: 'Werkstatt kontaktieren',
            description: 'Vereinbaren Sie einen Reparaturtermin nach der Gutachterfreigabe.',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            priority: 'medium'
          }
        ]
      });
      setProgress(35);
    }, 1000);
  }, [claimId]);

  if (!claimData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Lade Schadenstatus...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Claim Info */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">Schaden {claimId}</h1>
              <p className="opacity-90 mb-4">Erfolgreich eingereicht und wird bearbeitet</p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Gemeldet: {new Date(claimData.submittedAt).toLocaleDateString('de-DE')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Voraussichtlich fertig: {new Date(claimData.estimatedCompletion).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            </div>
            
            <Badge className="bg-green-500 text-white">
              Wird bearbeitet
            </Badge>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Fortschritt</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="bg-blue-700" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Aktueller Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Bewertung durch Sachverständigen</h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Ein qualifizierter Kfz-Sachverständiger wird Ihr Fahrzeug begutachten 
                    und einen detaillierten Schadensbericht erstellen.
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 font-medium">In Bearbeitung seit 2 Stunden</span>
                  </div>
                </div>
                
                {/* Progress Steps */}
                <div className="space-y-3">
                  {[
                    { step: 'Eingang bestätigt', completed: true },
                    { step: 'Sachbearbeiter zugewiesen', completed: true },
                    { step: 'Gutachter beauftragt', completed: false, current: true },
                    { step: 'Reparaturfreigabe', completed: false },
                    { step: 'Abschluss', completed: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center border-2
                        ${item.completed 
                          ? 'bg-green-600 border-green-600 text-white' 
                          : item.current 
                          ? 'bg-blue-600 border-blue-600 text-white animate-pulse'
                          : 'bg-white border-gray-300 text-gray-400'
                        }
                      `}>
                        {item.completed ? <CheckCircle className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
                      </div>
                      <span className={`text-sm ${item.completed || item.current ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                        {item.step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <span>Ihre nächsten Schritte</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimData.nextActions.map((action: any, index: number) => (
                  <div key={index} className={`
                    p-4 rounded-lg border-l-4 
                    ${action.priority === 'high' 
                      ? 'bg-red-50 border-red-500' 
                      : 'bg-yellow-50 border-yellow-500'
                    }
                  `}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{action.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                        <p className="text-xs text-gray-500">
                          Fällig bis: {new Date(action.dueDate).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <Badge variant={action.priority === 'high' ? 'destructive' : 'default'}>
                        {action.priority === 'high' ? 'Dringend' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Updates Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Verlauf & Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimData.updates.map((update: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{update.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(update.timestamp).toLocaleString('de-DE')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Ihr Sachbearbeiter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-medium">{claimData.assignedAgent.name}</h4>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">4.9</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Nachricht senden
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Termin vereinbaren
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Digitale Schadenakte</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claimData.documents.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Alle Dokumente exportieren
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Schnellaktionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Werkstätten in der Nähe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Ersatzfahrzeug anfragen
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                FAQ & Hilfe
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimStatus;
