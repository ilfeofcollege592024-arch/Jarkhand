import ReportForm from '../ReportForm';

export default function ReportFormExample() {
  const handleSubmit = (report: any) => {
    console.log('Report submitted:', report);
  };

  const handleCancel = () => {
    console.log('Report cancelled');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ReportForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}