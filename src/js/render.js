import { attachListenersToBtns } from './events';
import { counterCategories } from './utils';
import {
  createTableRow,
  createCategoryIcon,
  emptyMessage,
} from './tableElements';
import { archiveDB, categories, mockupDB } from './data';

const tasksTable = document.getElementById('notes-table-container');
const summaryTable = document.getElementById('summary-table-container');
const archiveTable = document.getElementById('archive-table-container');

export function renderTasksTable() {
  tasksTable.innerHTML = '';

  if (mockupDB.length === 0) {
    tasksTable.innerHTML = emptyMessage('Add you task');
    return;
  }

  mockupDB.forEach((item) => {
    const elem = createTableRow(item);
    attachListenersToBtns(elem);

    tasksTable.appendChild(elem);
  });
}

export function renderArchiveTable() {
  archiveTable.innerHTML = '';

  if (archiveDB.length === 0) {
    archiveTable.innerHTML = emptyMessage('Empty!');
    return;
  }

  archiveDB.forEach((item) => {
    const elem = createTableRow(item, true);
    attachListenersToBtns(elem);

    archiveTable.appendChild(elem);
  });
}

export function renderSummaryTable() {
  summaryTable.innerHTML = '';

  const activeCategoryCounts = counterCategories(mockupDB);
  const archivedCategoryCounts = counterCategories(archiveDB);

  categories.forEach((category) => {
    const newRow = document.createElement('tr');

    const activeCount = activeCategoryCounts[category] || 0;
    const archivedCount = archivedCategoryCounts[category] || 0;

    newRow.innerHTML = `
      <td>${createCategoryIcon(category)}</td>
      <td>${category}</td>
      <td>${activeCount}</td>
      <td>${archivedCount}</td>
      `;

    summaryTable.append(newRow);
  });
}
