export const convertWeekday = (number) => {
  switch(number) {
    case 0: return "Понедельник";
    case 1: return "Вторник";
    case 2: return "Среда";
    case 3: return "Четверг";
    case 4: return "Пятница";
    case 5: return "Суббота";
    case 6: return "Воскресенье";
    default: return "no";
  }
}

export const getWeekdaysArray = (classes) => {
  const weekdays = new Set();
  classes.forEach(item => weekdays.add(item.weekday));
  return Array.from(weekdays);
}

export const getSortedClasses = (classes) => {

  const weekdays = getWeekdaysArray(classes);
  const sorted = [];

  weekdays.forEach(weekday => {
    const day = {
      weekday,
      classes: []
    }
    classes.forEach(_class => {
      if (_class.weekday !== weekday) return;
      day.classes.push(_class);
    });
    sorted.push({
      ...day,
      classes: day.classes.sort((a, b) => (a.order > b.order) ? 1 : -1),
      weekday: convertWeekday(weekday),
      weekdayId: weekday,
    });
  });

  return sorted.sort((a, b) => (a.weekdayId > b.weekdayId) ? 1 : -1);
}

export const includesGroup = (current, saved) => {
  const groupIdList = saved.map(group => group._id.toString());
  const currentGroupId = current._id.toString();

  return groupIdList.includes(currentGroupId);
}