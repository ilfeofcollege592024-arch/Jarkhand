import Navigation from '../Navigation';
import { useState } from 'react';

export default function NavigationExample() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <Navigation
      userRole="civilian"
      userName="John Doe"
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onLogout={handleLogout}
    />
  );
}