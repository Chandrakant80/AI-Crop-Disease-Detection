import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DatasetProvider, useDataset } from './context/DatasetContext';
import { Header } from './layouts/Header';
import { Sidebar } from './layouts/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { DocsPage } from './pages/DocsPage';
import { DatasetUploaderModal } from './components/explorer/DatasetUploaderModal';
import { RecordDetailModal } from './components/explorer/RecordDetailModal';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';

const MainLayout = () => {
  const { isLoading, error, refetchDataset } = useDataset();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUploaderModalOpen, setIsUploaderModalOpen] = useState(false);
  const [activeInspectionRecord, setActiveInspectionRecord] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200">
      {/* Top Header */}
      <Header
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onOpenUploader={() => setIsUploaderModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                <LoadingSkeleton type="cards" />
                <LoadingSkeleton type="table" />
              </div>
            ) : error ? (
              <div className="p-8 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-center space-y-3">
                <h3 className="text-base font-bold text-rose-700 dark:text-rose-300">
                  {error}
                </h3>
                <button
                  onClick={refetchDataset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
                >
                  Retry Loading
                </button>
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <DashboardPage
                    onNavigateToExplorer={() => setActiveTab('explorer')}
                    onSelectRecord={(rec) => setActiveInspectionRecord(rec)}
                  />
                )}
                {activeTab === 'explorer' && (
                  <ExplorerPage
                    onOpenUploader={() => setIsUploaderModalOpen(true)}
                  />
                )}
                {activeTab === 'analytics' && <AnalyticsPage />}
                {activeTab === 'simulator' && <SimulatorPage />}
                {activeTab === 'docs' && <DocsPage />}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Dataset Uploader Modal */}
      <DatasetUploaderModal
        isOpen={isUploaderModalOpen}
        onClose={() => setIsUploaderModalOpen(false)}
      />

      {/* Record Inspection Modal (when triggered from dashboard feed) */}
      <RecordDetailModal
        record={activeInspectionRecord}
        isOpen={Boolean(activeInspectionRecord)}
        onClose={() => setActiveInspectionRecord(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <DatasetProvider>
        <MainLayout />
      </DatasetProvider>
    </ThemeProvider>
  );
}

export default App;
