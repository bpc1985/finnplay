import "./Header.scss";
import logoImage from "assets/logo.png";
import profileIcon from "assets/profile.png"; // Add this line

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="dashboard-header">
      <div className="logo-container">
        <img src={logoImage} alt="FINNPLAY" className="logo" />
      </div>
      <button className="logout-button" onClick={onLogout}>
        <img src={profileIcon} alt="Profile" className="profile-icon" />
        Logout
      </button>
    </header>
  );
};

export default Header;
