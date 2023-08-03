import { attachListenersToBtns } from './events';
import { counterCategories } from './utils';
import {
  createTableRow,
  createCategoryIcon,
  emptyMessage,
} from './tableElements';
import { categories, checkerArchiveTasks, mockupDB } from './data';

const tasksTable = document.getElementById('notes-table-container');
const summaryTable = document.getElementById('summary-table-container');
const archiveTable = document.getElementById('archive-table-container');

export function renderTasksTable() {
  tasksTable.innerHTML = '';
  const checkActiveTasks = mockupDB.some((item) => !item.archived);

  if (!checkActiveTasks) {
    tasksTable.innerHTML = emptyMessage('Add you task');
    return;
  }

  mockupDB.forEach((item) => {
    if (!item.archived) {
      const elem = createTableRow(item);
      attachListenersToBtns(elem);
      tasksTable.appendChild(elem);
    }
  });
}

export function renderArchiveTable() {
  archiveTable.innerHTML = '';
  const checkeArchiveTasks = checkerArchiveTasks();

  if (!checkeArchiveTasks) {
    archiveTable.innerHTML = emptyMessage('Empty!');
    return;
  }

  mockupDB.forEach((item) => {
    if (item.archived) {
      const elem = createTableRow(item, true);
      attachListenersToBtns(elem);
      archiveTable.appendChild(elem);
    }
  });
}

export function renderSummaryTable() {
  summaryTable.innerHTML = '';

  const categoryCounts = counterCategories(mockupDB);

  categories.forEach((category) => {
    const newRow = document.createElement('tr');
    const counts = categoryCounts[category] || { active: 0, archived: 0 };

    newRow.innerHTML = `
      <td>${createCategoryIcon(category)}</td>
      <td>${category}</td>
      <td>${counts.active}</td>
      <td>${counts.archived}</td>
      `;

    summaryTable.append(newRow);
  });
}
