import React from 'react';


const Popup = ({ isOpen, closePopup, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        background: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
        zIndex: 1000,
      }}>
        {children}
        {/* <button onClick={closePopup}>Close</button> */}
      </div>
    </div>
  );
};



export default Popup;
