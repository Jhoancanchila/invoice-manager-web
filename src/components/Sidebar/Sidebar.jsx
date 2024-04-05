import { useState } from "react";
import "./Sidebar.css";

import logo from "../../assets/logo.webp";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="page sidebar-page">
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <img width={40} src={logo} alt="logo" />
            <h2 className="sidebar-title">IAM EDGE APPS</h2>
          </header>
          <nav>           
            <div className= {`sidebar-button ${!isOpen ? 'close' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" fill="white"/></svg>
              <p>Invoices</p>
            </div>
            {
              !isOpen &&
              <div className={`sidebar-button ${!isOpen ? 'close' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" fill="white"/></svg>
            </div>
            }
          </nav>
        </div>
        <div className="sidebar-content-button">
          {
            isOpen &&
            <div className="sidebar-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" fill="white"/></svg>
              <p>Logout</p>
            </div>
          }
        </div>
          <div className={`sidebar-control ${!isOpen ? '' : 'contract'}`}>
            <button
              type="button"
              className="sidebar-control-icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="white"/></svg>
            </button>
          </div>
      </aside>
      <header className="sidebar-mobile">
        <div className="sidebar-mobile-content">
          <img width={40} src={logo} alt="logo" />
          <p className="sidebar-mobile-item">Invoices</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="sidebar-mobile-item" height="30" viewBox="0 -960 960 960" width="30"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" fill="white"/></svg>
        </div>
      </header>
    </section>
  );
};
export default Sidebar;