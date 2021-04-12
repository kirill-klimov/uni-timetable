import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import './Timetable.styles.scss';
import TextPicker from '../TextPicker/TextPicker';
import { fetchClassesStart } from '../../redux/group/group.actions';
import { getSortedClasses } from '../../utils/utils';

const Timetable = ({ currentGroup, classes, classesLoading }) => {

  const [UIWeek, setUIWeek] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentGroup) return;
    dispatch(fetchClassesStart(currentGroup._id));
  }, [currentGroup]);

  const sortedClasses = classes && getSortedClasses(classes);

  return (
    sortedClasses ?
    <>
    <TextPicker
      state={UIWeek}
      setActive={setUIWeek}
      initialWidth={85}
      label="Неделя"
      options={['Левая', 'Правая']} />

    <div className="timetable">
      {
        sortedClasses.map(day =>
        <div className="timetable__day">

          <h2 className="timetable__day__name">{day.weekday}</h2>

          <div className="classes-table__header">
            <div className="classes-table__header__column">Пара</div>
            <div className="classes-table__header__column">Дисциплина</div>
            <div className="classes-table__header__column">Ауд.</div>
          </div>
          
          {
            day.classes.map(item => 
              (UIWeek + 1) === item.week || item.week === 0 ?
              <div className="classes-table__content">
                <div className="classes-table__content__column">{item.order}</div>
                <div className="classes-table__content__column">
                  <span className="classes-table__content__column__text">{item.name}</span>
                  <span className="classes-table__content__column__text">{item.lecturer}</span>
                </div>
                <div className="classes-table__content__column">{item.room}</div>
              </div> : null )
          }

        </div> )
      }
    </div>
    </>
    : null
  );
}

const mapStateToProps = (state) => ({
  classes: state.group.classes,
  classesLoading: state.group.classesLoading,
  currentGroup: state.group.currentGroup,
})

export default connect(mapStateToProps)(Timetable);