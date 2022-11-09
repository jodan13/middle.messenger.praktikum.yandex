export const getFormattedTime = (chatsResponse) => {
  const funToTime = (time) => {
    const date = new Date(time);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const week = new Date();
    week.setDate(week.getDate() - 7);
    const day = date.getDate();
    const month = date.toLocaleString('ru', {month: 'short'});
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      return `${hoursStr}:${minutesStr}`;
    } else if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
      return 'Вчера';
    } else if (date.getTime() > week.getTime()) {
      return date.toLocaleString('ru', {weekday: 'short'});
    } else {
      return `${day} ${month} ${year}`;
    }

  };
  return chatsResponse.map((chat) => {
    return {
      ...chat,
      last_message: {
        ...chat.last_message,
        time: funToTime(chat.last_message.time),
      },
    };
  });
};
