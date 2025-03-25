import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/add-test">Add Test</Link>
      <Link to="/modify-report">Modify Reports</Link>
    </div>
  );
};

export default AdminDashboard;
