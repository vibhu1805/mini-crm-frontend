import { Link } from 'react-router-dom';
import '../styles/Landing.css'; // Create this CSS file

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to <span className="brand">Mini CRM</span></h1>
          <p className="hero-subtitle">Streamline your customer relationships with our intuitive platform</p>
          
          <div className="interactive-demo">
            <div className="demo-card" draggable="true">
              <div className="card-icon">👥</div>
              <p>Drag contacts to organize</p>
            </div>
            <div className="demo-card" draggable="true">
              <div className="card-icon">📅</div>
              <p>Schedule meetings</p>
            </div>
          </div>
        </div>

        <div className="auth-options">
          <div className="option-card">
            <h3>Existing User?</h3>
            <Link to="/login">
              <button className="auth-button login-button">
                <span className="button-icon">🔑</span>
                Login
              </button>
            </Link>
          </div>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="option-card">
            <h3>New to Mini CRM?</h3>
            <Link to="/signup">
              <button className="auth-button signup-button">
                <span className="button-icon">✨</span>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;