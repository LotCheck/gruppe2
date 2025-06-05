import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw, FileText, FileX2 } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Versicherungs-Status-Element */}
      <div className="bg-white rounded-xl shadow p-4 mt-4 mb-8 max-w-2xl mx-auto">
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-900">Kfz-Versicherung</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/Allianz.svg.png" alt="Allianz Direct Logo" className="h-8 w-auto" />
            <div>
              <div className="font-bold text-lg text-gray-900">Allianz Direct</div>
              <div className="text-gray-700">Dacia Duster</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-600 font-semibold">aktiv: seit 10.02.2025</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 text-blue-600 cursor-pointer"><path fill="currentColor" d="m493.3 56.3-37.5-37.5C443.2 6.2 426.9 0 410.5 0s-32.8 6.2-45.2 18.7l-74.5 74.5L256 128 18.8 365.1c-3.9 3.9-6.3 9-6.9 14.4L.2 485.3C-1.5 499.7 9.9 512 24 512c.9 0 1.8 0 2.7-.2l105.7-11.7c5.5-.6 10.5-3 14.4-6.9L384 256l34.7-34.7 74.5-74.5c25-25 25-65.6.1-90.5M350.1 222.1 118.8 453.4l-67.6 7.5 7.5-67.7L289.9 162l48.6-48.6 60.1 60.1zm113.4-113.6-29.9 29.9c-.5.5-1.4.5-2 0l-58.2-58.2c-.5-.5-.5-1.4 0-2l29.9-29.9c3.9-3.9 10.2-3.9 14.1 0l46 46c4 4 4 10.3.1 14.2"/></svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">jährlich</span>
              <span className="text-2xl font-bold text-gray-900">1.098,13&nbsp;€</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 text-blue-600 cursor-pointer"><path fill="currentColor" d="m493.3 56.3-37.5-37.5C443.2 6.2 426.9 0 410.5 0s-32.8 6.2-45.2 18.7l-74.5 74.5L256 128 18.8 365.1c-3.9 3.9-6.3 9-6.9 14.4L.2 485.3C-1.5 499.7 9.9 512 24 512c.9 0 1.8 0 2.7-.2l105.7-11.7c5.5-.6 10.5-3 14.4-6.9L384 256l34.7-34.7 74.5-74.5c25-25 25-65.6.1-90.5M350.1 222.1 118.8 453.4l-67.6 7.5 7.5-67.7L289.9 162l48.6-48.6 60.1 60.1zm113.4-113.6-29.9 29.9c-.5.5-1.4.5-2 0l-58.2-58.2c-.5-.5-.5-1.4 0-2l29.9-29.9c3.9-3.9 10.2-3.9 14.1 0l46 46c4 4 4 10.3.1 14.2"/></svg>
            </div>
            <div className="text-xs text-blue-700 underline cursor-pointer flex items-center gap-1">
              Stand: 04.03.2025
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="h-4 w-4"><path fill="#999" d="M19.158 7v14.314h-2.311V8.571h-4.268v12.743h-2.134v-9.775H6v10.648h17.426V7Z"></path><g fill="none" stroke="#b4b4b4" data-name="Ellipse 58"><circle cx="15" cy="15" r="15" stroke="none"></circle><circle cx="15" cy="15" r="14.5"></circle></g></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Schaltflächenliste zuerst */}
      <div className="bg-white rounded-xl shadow max-w-2xl mx-auto mb-8">
        <ul className="divide-y divide-gray-200">
          {/* Neu vergleichen */}
          <li>
            <button
              className="flex items-center w-full px-4 py-4 text-left hover:bg-gray-50 focus:outline-none"
              type="button"
            >
              <RefreshCw className="h-5 w-5 text-gray-500 mr-4" />
              <span className="flex-1 text-gray-800 text-base">neu vergleichen</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>
          </li>
          {/* Schaden melden */}
          <li>
            <button
              className="flex items-center w-full px-4 py-4 text-left hover:bg-gray-50 focus:outline-none"
              type="button"
              onClick={() => navigate('/voice-claim')}
            >
              <FileText className="h-5 w-5 text-gray-500 mr-4" />
              <span className="flex-1 text-gray-800 text-base">Schaden melden</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>
          </li>
          {/* Vertrag kündigen */}
          <li>
            <button
              className="flex items-center w-full px-4 py-4 text-left hover:bg-gray-50 focus:outline-none"
              type="button"
            >
              <FileX2 className="h-5 w-5 text-gray-500 mr-4" />
              <span className="flex-1 text-gray-800 text-base">Vertrag kündigen</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </button>
          </li>
        </ul>
      </div>

      {/* Vertragsübersicht-Widget darunter */}
      <div className="bg-white rounded-xl shadow p-4 mb-8 max-w-2xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Vertragsübersicht</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {/* Tarif */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-gray-500">Tarif</div>
            <div className="font-medium text-gray-900">DIRECT mit Werkstattbindung</div>
          </div>
          {/* Versicherungsumfang */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-gray-500">Versicherungsumfang</div>
            <div className="font-medium text-gray-900">Haftpflicht und Vollkasko mit 500 € SB inkl. Teilkasko mit 150 € SB</div>
          </div>
          {/* Versicherungsscheinnummer */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-gray-500">Versicherungsscheinnummer</div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">DG201265089</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-4 w-4 text-blue-600 cursor-pointer"><path fill="currentColor" d="m493.3 56.3-37.5-37.5C443.2 6.2 426.9 0 410.5 0s-32.8 6.2-45.2 18.7l-74.5 74.5L256 128 18.8 365.1c-3.9 3.9-6.3 9-6.9 14.4L.2 485.3C-1.5 499.7 9.9 512 24 512c.9 0 1.8 0 2.7-.2l105.7-11.7c5.5-.6 10.5-3 14.4-6.9L384 256l34.7-34.7 74.5-74.5c25-25 25-65.6.1-90.5M350.1 222.1 118.8 453.4l-67.6 7.5 7.5-67.7L289.9 162l48.6-48.6 60.1 60.1zm113.4-113.6-29.9 29.9c-.5.5-1.4.5-2 0l-58.2-58.2c-.5-.5-.5-1.4 0-2l29.9-29.9c3.9-3.9 10.2-3.9 14.1 0l46 46c4 4 4 10.3.1 14.2"/></svg>
              <button className="ml-1 px-2 py-0.5 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50">ändern</button>
            </div>
          </div>
          {/* Referenznummer */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-gray-500">Referenznummer</div>
            <div className="font-medium text-gray-900">1436-0230-6130-23</div>
          </div>
          {/* E-Mail-Adresse CHECK24 Nachrichtencenter */}
          <div className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-gray-500 flex items-center gap-1">E-Mail-Adresse CHECK24 Nachrichtencenter
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-4 w-4 text-gray-400"><path fill="#999" d="M50 0a50 50 0 1 0 50 50A50 50 0 0 0 50 0m0 90.32A40.32 40.32 0 1 1 90.32 50 40.3 40.3 0 0 1 50 90.32m0-66.67a7 7 0 1 1-7 7 7 7 0 0 1 7-7m4 52.16h-8a2.42 2.42 0 0 1-2.42-2.42V46A2.42 2.42 0 0 1 46 43.55h8A2.42 2.42 0 0 1 56.45 46v27.39A2.42 2.42 0 0 1 54 75.81"/></svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">rel2z04yv4l2xv1.v@as.check24.de</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88.9 100" className="h-5 w-5 text-blue-600 cursor-pointer"><path fill="currentColor" d="M85.3 13 75.2 2.9C73.4 1.1 71.1.2 68.6.2H35.1c-5.2 0-9.3 4.2-9.3 9.3v9.3H10.2C5 18.8.9 23 .9 28.1v62.3c0 5.2 4.2 9.3 9.3 9.3h43.6c5.2 0 9.3-4.2 9.3-9.3v-9.3h15.6c5.2 0 9.3-4.2 9.3-9.3V19.6c0-2.5-1-4.8-2.7-6.6M52.6 90.5H11.3c-.6 0-1.2-.5-1.2-1.2V29.4c0-.6.5-1.2 1.2-1.2h14.4v43.6c0 5.2 4.2 9.3 9.3 9.3h18.7v8.2c.1.7-.4 1.2-1.1 1.2m24.9-18.7H36.3c-.6 0-1.2-.5-1.2-1.2V10.7c0-.6.5-1.2 1.2-1.2h20.6v17.1c0 2.6 2.1 4.7 4.7 4.7h17.1v39.3c0 .7-.5 1.2-1.2 1.2M78.7 22H66.2V9.5h1.9c.3 0 .6.1.8.3l9.4 9.4c.2.2.3.5.3.8v2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
