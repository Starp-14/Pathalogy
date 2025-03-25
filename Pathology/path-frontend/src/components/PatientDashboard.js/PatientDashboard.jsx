import { Link } from "react-router-dom";

const PatientDashboard = () => {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <Link to="/status">Check Status</Link>
      <Link to="/report/123">View Report</Link> {/* Example report ID */}
    </div>
  );
};

export default PatientDashboard;
