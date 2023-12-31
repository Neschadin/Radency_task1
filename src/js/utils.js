import { getTaskById } from "./data";

export function extractDatesFromContent(content) {
  const dateRegex = /(\d{1,2}[./-]\d{1,2}[./-]\d{2,4})/g;
  const dates = content.match(dateRegex);

  if (dates && dates.length > 0) {
    return dates.join(', ');
  }
}

export function counterCategories(DB) {
  return DB.reduce((result, task) => {
    const { category, archived } = task;

    if (!result[category]) {
      result[category] = { active: 0, archived: 0 };
    }

    if (archived) {
      result[category].archived++;
    } else {
      result[category].active++;
    }

    return result;
  }, {});
}

export function formatDate(dateString) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function generateId() {
  const id = Math.floor(Math.random() * 1000000);

  return getTaskById(id) ? generateId() : id;
}
