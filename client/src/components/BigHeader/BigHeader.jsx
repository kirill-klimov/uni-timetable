import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addGroupStart, removeGroupStart } from '../../redux/user/user.actions';
import { includesGroup } from '../../utils/utils';
import TextToggle from '../TextToggle/TextToggle';
import './BigHeader.styles.scss';

const BigHeader = ({ currentGroup, savedGroups }) => {

  const dispatch = useDispatch();

  const handleGroupToggle = () => {
    if (includesGroup(currentGroup, savedGroups))
      dispatch(removeGroupStart(currentGroup._id))
    else
      dispatch(addGroupStart(currentGroup._id))
  }

  return (
    <div>
      <h1 className="big-header">
        {
          currentGroup ? `Расписание ${currentGroup.name}` : "Группа не выбрана"
        }
      </h1>
      {
        currentGroup && savedGroups ? 
          <TextToggle
            state={includesGroup(currentGroup, savedGroups)}
            textOff="Добавить"
            textOn="Удалить"
            onClick={handleGroupToggle} />
        : null
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentGroup: state.group.currentGroup,
  savedGroups: state.user.savedGroups
})

export default connect(mapStateToProps)(BigHeader);