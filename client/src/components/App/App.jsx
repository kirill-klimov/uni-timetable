import React from 'react';
import BigHeader from '../BigHeader/BigHeader';
import Menu from '../Menu/Menu';
import Search from '../Search/Search';
import './App.styles.scss';
import Timetable from '../Timetable/Timetable';


const App = () => {
  return (
    <div className="app">

      <Menu />

      <div className="app__main-container">
        <div className="gradient-container">
          <Search />
          <BigHeader />
        </div>
        <Timetable />

        <div className="footer">
          <span className="footer__text">Kirill Klimov<br/>Mar, 2021</span>
        </div>
      </div>

    </div>
  )
}

export default App;