import React, { useContext } from 'react';
import { GlobalState } from '../../../global'; // Import global state
import { useNavigate } from 'react-router-dom';
import styles from './SellerHeader.module.css'; // Optional: Import CSS module for styling

const SellerHeader = () => {
  const { user, logout } = useContext(GlobalState); // Access user info and logout from context
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logging out
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Seller Dashboard</h1>
      <nav className={styles.nav}>
        <ul>
          <li>
            <button onClick={() => handleNavigation('/addProduct')} className={styles.navLink}>
              Add Product
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/viewInventory')} className={styles.navLink}>
              View Inventory
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/updateProduct')} className={styles.navLink}>
              Update Product
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className={styles.navLink}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      
    </header>
  );
};

export default SellerHeader;
