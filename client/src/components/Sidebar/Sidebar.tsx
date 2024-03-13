import React, { useEffect } from 'react';
import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  setIsVisible: (state: boolean) => void;
  isVisible?: boolean;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children, isVisible = true, setIsVisible }) => {
  const location = useLocation();

  useEffect(() => {
    if (isVisible) {
      setIsVisible(false);
    }
  }, [location.pathname]);

  return (
    <PrimeSidebar visible={isVisible} onHide={() => setIsVisible(false)}>
      {children}
    </PrimeSidebar>
  );
};

export default Sidebar;
