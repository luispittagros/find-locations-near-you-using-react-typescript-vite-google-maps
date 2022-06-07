import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="layout">
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
