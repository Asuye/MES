import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductionPlanning from "./pages/production/Planning";
import BatchManagement from "./pages/production/Batch";
import ElectronicBatchRecord from "./pages/production/EBR";
import Weighing from "./pages/production/Weighing";
import ProcessMonitoring from "./pages/production/Process";
import EquipmentManagement from "./pages/Equipment";
import EnvironmentMonitoring from "./pages/Environment";
import Traceability from "./pages/Traceability";
import QualityCompliance from "./pages/quality/Compliance";
import Reports from "./pages/Reports";
import SystemManagement from "./pages/System";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/production/planning" element={<ProductionPlanning />} />
        <Route path="/production/batch" element={<BatchManagement />} />
        <Route path="/production/ebr" element={<ElectronicBatchRecord />} />
        <Route path="/production/weighing" element={<Weighing />} />
        <Route path="/production/process" element={<ProcessMonitoring />} />
        <Route path="/equipment" element={<EquipmentManagement />} />
        <Route path="/environment" element={<EnvironmentMonitoring />} />
        <Route path="/traceability" element={<Traceability />} />
        <Route path="/quality/compliance" element={<QualityCompliance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/system" element={<SystemManagement />} />
      </Routes>
    </Router>
  );
}