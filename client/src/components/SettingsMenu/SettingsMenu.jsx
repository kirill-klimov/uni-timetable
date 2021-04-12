import React from 'react';
import { ArrowBackIcon } from '../Menu/Menu.styles';
import CoolButton from '../CoolButton/CoolButton';
import MenuLoader from '../MenuLoader/MenuLoader';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import './SettingsMenu.styles.scss';
import { motion } from 'framer-motion';
import { connect, useDispatch } from 'react-redux';
import { logOut } from '../../redux/user/user.actions';

const SettingsMenu = ({ setSettingsMenu, user }) => {

  const variants = {
    initial: {
      x: "-100%"
    },
    animate: {
      x: 0,
    }
  }

  const transition = {
    // ease: 'linear',
    type: 'spring',
    duration: 0.3,
  }

  const dispatch = useDispatch();

  return (
    <motion.div 
      className="app__menu settings-menu"
      variants={variants}
      transition={transition}
      initial="initial"
      animate="animate"
      exit="initial"
      >
      <div className="menu__control-block right">
        <ArrowBackIcon 
          className="arrow-back-icon"
          onClick={() => setSettingsMenu(false)} />
      </div>

      {
        user.name ?
        <div className="menu-block_titled">
          <span className="menu-block_titled__title">Вошел как</span>
          <span className="menu-block__name">{user.name}</span>
          <CoolButton 
          text="Выйти"
          onClick={() => dispatch(logOut())}
           />
        </div>
        :
        <>
        <LogIn />
        <SignUp /> 
        </>
      }
      {
        user.loading ?
        <MenuLoader />
        : null
      }
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(SettingsMenu);