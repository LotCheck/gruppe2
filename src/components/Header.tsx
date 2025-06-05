import React from 'react';

const Header = () => {
  return (
    <header className="shadow-sm border-b sticky top-0 z-50" style={{ backgroundColor: '#022D94', minHeight: 56 }}>
      <div id="c24m-header-top" className="flex items-center justify-between h-14 px-4 max-w-7xl mx-auto">
        {/* Left: Back Button */}
        <div className="c24m-header-top-icons-left flex items-center">
          <a className="c24m-header-back-wrapper" href="#" onClick={e => { e.preventDefault(); window.history.back(); }}>
            <span className="c24m-header-back block">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 58.2 100" xmlSpace="preserve" width="28" height="28">
                <polygon fill="#FFFFFF" points="16.4,50 58.2,8.2 50,0 0,50 50,100 58.2,91.8 "></polygon>
              </svg>
            </span>
          </a>
        </div>
        {/* Center: Logo + Product Name */}
        <div className="flex items-center gap-3">
          <a href="https://www.check24.de/" id="c24m-logo" title="CHECK24 - Deutschlands größtes Vergleichsportal" className="block" style={{ minWidth: 90, minHeight: 24 }}>
            <svg width="90" height="24" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="0" y="20" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#fff">CHECK24</text>
            </svg>
          </a>
          <div id="c24m-product-name" className="text-lg font-semibold text-white">Kfz-Versicherung</div>
        </div>
        {/* Right: Search Icon */}
        <div className="c24m-header-top-icons-right flex items-center">
          <div className="c24m-search-icon-wrapper c24m-header-icon">
            <div className="c24m-search-icon">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M64.8,14.1C52.6-1.7,29.9-4.6,14.1,7.5S-4.6,42.4,7.5,58.2c11,14.2,30.3,17.9,45.6,9.9L77,99
                c0.9,1.2,2.6,1.4,3.6,0.5l5.5-4.2c1.2-0.9,1.4-2.6,0.5-3.6L62.8,60.8C74.5,48,75.8,28.2,64.8,14.1z M52.9,57.8
                c-11.9,9.2-29.1,7-38.3-5c-9.3-11.9-7-29.1,5-38.3c11.9-9.3,29.1-7,38.3,5C67.1,31.4,64.8,48.5,52.9,57.8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
