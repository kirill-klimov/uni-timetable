import React, { useState } from 'react';
import {GroupList, SettingsIcon} from './Menu.styles';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import { AnimatePresence } from 'framer-motion';
import './Menu.styles.scss';
import { connect, useDispatch } from 'react-redux';
import { setCurrentGroup } from '../../redux/group/group.actions';

const Menu = ({ user, currentGroup }) => {
  const [settingsMenu, setSettingsMenu] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="app__menu">
      <div className="menu__control-block">
        <SettingsIcon 
        className="settings-icon" 
        onClick={() => setSettingsMenu(true)} />
      </div>
      <div className="menu-block_titled">
        <span className="menu-block_titled__title">Сохраненные группы</span>
        {
          user?.savedGroups ?
            user.savedGroups.length !== 0 ?
            <GroupList className="group-list" len={user.savedGroups.length}>
              {
                user.savedGroups.map(group => 
                  <li key={group._id} onClick={() => dispatch(setCurrentGroup(group))}>
                    <a className={`menu-block__group-link ${currentGroup?.name === group.name ? "active" : ""}`}>
                      {group.name}
                    </a>
                  </li> )
              }
            </GroupList>
            : <small>Пусто</small>
          : <small style={{cursor: "pointer"}} onClick={() => setSettingsMenu(true)}><u>Войдите,</u> чтобы добавить</small>
        }
      </div>

      <AnimatePresence>
        {
          settingsMenu ?
          <SettingsMenu setSettingsMenu={setSettingsMenu} /> : null
        }
      </AnimatePresence>

    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  currentGroup: state.group.currentGroup
})

export default connect(mapStateToProps)(Menu);