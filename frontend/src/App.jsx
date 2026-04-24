import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HamburgerMenu } from './ui/components/shared/HamburgerMenu';
import { PageTransition } from './ui/components/shared/PageTransition';
import { NuevoPedido } from './ui/pages/NuevoPedido';
import { TicketPage } from './ui/pages/TicketPage';
import { Historial } from './ui/pages/Historial';
import { GestionMenu } from './ui/pages/GestionMenu';
import { Soporte } from './ui/pages/Soporte';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/"           element={<NuevoPedido />} />
        <Route path="/ticket/:id" element={<TicketPage />} />
        <Route path="/historial"  element={<Historial />} />
        <Route path="/menu"       element={<GestionMenu />} />
        <Route path="/soporte"    element={<Soporte />} />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <HamburgerMenu />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
