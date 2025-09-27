import CivilianDashboard from '../CivilianDashboard';

export default function CivilianDashboardExample() {
  const handleNewReport = () => {
    console.log('New report clicked');
  };

  const handleViewReports = () => {
    console.log('View reports clicked');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CivilianDashboard onNewReport={handleNewReport} onViewReports={handleViewReports} />
    </div>
  );
}