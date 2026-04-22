import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HamburgerMenu } from './ui/components/shared/HamburgerMenu';
import { NuevoPedido } from './ui/pages/NuevoPedido';
import { TicketPage } from './ui/pages/TicketPage';
import { Historial } from './ui/pages/Historial';
import { GestionMenu } from './ui/pages/GestionMenu';

export default function App() {
  return (
    <BrowserRouter>
      <HamburgerMenu />
      <Routes>
        <Route path="/"           element={<NuevoPedido />} />
        <Route path="/ticket/:id" element={<TicketPage />} />
        <Route path="/historial"  element={<Historial />} />
        <Route path="/menu"       element={<GestionMenu />} />
      </Routes>
    </BrowserRouter>
  );
}
