import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TokenCapsules from './pages/TokenCapsules';
import AvatarBlueprints from './pages/AvatarBlueprints';
import DatasetBuilder from './pages/DatasetBuilder';
import LoraJobs from './pages/LoraJobs';
import McpSettings from './pages/McpSettings';
import AuditLog from './pages/AuditLog';
import Auth from './pages/Auth';

function Layout() {
  const location = useLocation();
  const isAuth = location.pathname === '/auth';

  if (isAuth) {
    return <Auth />;
  }

  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/capsules" element={<TokenCapsules />} />
        <Route path="/avatars" element={<AvatarBlueprints />} />
        <Route path="/datasets" element={<DatasetBuilder />} />
        <Route path="/lora" element={<LoraJobs />} />
        <Route path="/settings" element={<McpSettings />} />
        <Route path="/audit" element={<AuditLog />} />
      </Routes>
    </Sidebar>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
      <Toaster position="top-right" theme="dark" />
    </Router>
  );
}
