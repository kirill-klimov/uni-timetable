import React from 'react';
import './MenuLoader.styles.scss';
import MoonLoader from "react-spinners/MoonLoader";

const MenuLoader = () => {
  return (
    <div className="menu-loader">
      <MoonLoader size='60px' color="var(--accent)" />
    </div>
  );
}

export default MenuLoader;