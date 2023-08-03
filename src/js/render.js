import data from '../data.json';
import { handleEditTask } from './modal';
import {
  countCategories,
  extractDatesFromContent,
  formatDate,
  genId,
} from './utils';

const tasksTable = document.getElementById('notes-table-container');
const summaryTable = document.getElementById('summary-table-container');
const archiveTable = document.getElementById('archive-table-container');
const categories = ['Task', 'Random Thought', 'Idea'];
const mockupDB = data.data;
const archiveDB = [];

function createBtn(id, icon) {
  return `
    <td>
    <button id="${id}">
    <span class="material-symbols-outlined">${icon}</span>
    </button>
    </td>
  `;
}

export function createTableRow(data, isArchive = false) {
  const { id, name, createdAt, content, category } = data;
  const newRow = document.createElement('tr');
  newRow.id = id;

  const archAction = isArchive ? 'unarchive' : 'archive';
  const icon = archAction;
  const deleteAction = isArchive ? 'arch_delete' : 'delete';
  const editBtnCell = isArchive ? '' : createBtn('edit_' + id, 'edit');

  newRow.innerHTML = `
    <td></td>
    <td>${name}</td>
    <td>${formatDate(createdAt)}</td>
    <td>${category}</td>
    <td>${content}</td>
    <td>${extractDatesFromContent(content) || ''}</td>
    ${editBtnCell}
    ${createBtn(archAction + '_' + id, icon)}
    ${createBtn(deleteAction + '_' + id, 'delete')}
  `;

  return newRow;
}

function handleEdit(id) {
  // const elemToEdit = document.getElementById(id);
  const editTask = getTaskById(id);
  handleEditTask(editTask);
}

function handleArchive(id) {
  const elemToArchive = document.getElementById(id);
  elemToArchive.remove();

  moveTaskBetweenDatabases(id, mockupDB, archiveDB);
  deleteFromDB(id, mockupDB);
  renderArchiveTable();
  renderSummaryTable();
}

function handleUnarchive(id) {
  moveTaskBetweenDatabases(id, archiveDB, mockupDB);
  deleteFromDB(id, archiveDB);
  renderArchiveTable();
  renderTasksTable();
  renderSummaryTable();
}

function handleDelete(id) {
  const elemToDelete = document.getElementById(id);
  if (!elemToDelete) return;

  elemToDelete.remove();
  deleteFromDB(id, mockupDB);
  renderSummaryTable();
}

function handleArchiveDelete(id) {
  deleteFromDB(id, archiveDB);
  renderArchiveTable();
  renderSummaryTable();
}

export function addTaskToDB(newTask) {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19);
  const { createdAt } = getTaskById(newTask.id);
  const checkCreatedAt = newTask.id ? createdAt : formattedDate;
  const id = newTask.id ? newTask.id : genId();

  const preparedNewTask = {
    ...newTask,
    id,
    createdAt: checkCreatedAt,
  };

  mockupDB.push(preparedNewTask);
  renderTasksTable();
  renderSummaryTable();
  console.log(mockupDB);
}

function getTaskById(id) {
  return mockupDB.find((task) => task.id === +id);
}

function deleteFromDB(id, db) {
  const i = db.findIndex((task) => task.id === +id);
  if (i === -1) return;

  db.splice(i, 1);
}

function moveTaskBetweenDatabases(id, sourceDB, targetDB) {
  const i = sourceDB.findIndex((task) => task.id === +id);
  if (i === -1) return;

  const task = sourceDB.splice(i, 1)[0];
  targetDB.push(task);

  console.log(mockupDB);
  console.log(archiveDB);
}

// done
function attachListenersToBtns(rowElement) {
  const editBtn = rowElement.querySelector(`button[id^="edit_"]`);
  const archiveBtn = rowElement.querySelector(`button[id^="archive_"]`);
  const unarchiveBtn = rowElement.querySelector(`button[id^="unarchive_"]`);
  const deleteBtn = rowElement.querySelector(`button[id^="delete_"]`);
  const archDeleteBtn = rowElement.querySelector(`button[id^="arch_delete_"]`);

  const id = rowElement.id;

  editBtn && editBtn.addEventListener('click', () => handleEdit(id));
  archiveBtn && archiveBtn.addEventListener('click', () => handleArchive(id));
  deleteBtn && deleteBtn.addEventListener('click', () => handleDelete(id));
  unarchiveBtn &&
    unarchiveBtn.addEventListener('click', () => handleUnarchive(id));
  archDeleteBtn &&
    archDeleteBtn.addEventListener('click', () => handleArchiveDelete(id));
}

// Tasks
export function renderTasksTable() {
  tasksTable.innerHTML = '';

  mockupDB.forEach((item) => {
    const elem = createTableRow(item);
    attachListenersToBtns(elem);

    tasksTable.appendChild(elem);
  });
}

// ARCHIVE
export function renderArchiveTable() {
  archiveTable.innerHTML = '';

  if (archiveDB.length === 0) {
    archiveTable.innerHTML =
      '<tr><td colspan="8" class="text-xl text-center font-semibold">Empty!</td></tr>';
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

  const activeCategoryCounts = countCategories(mockupDB);
  const archivedCategoryCounts = countCategories(archiveDB);

  categories.forEach((category) => {
    const newRow = document.createElement('tr');

    const activeCount = activeCategoryCounts[category] || 0;
    const archivedCount = archivedCategoryCounts[category] || 0;

    newRow.innerHTML = `
      <tr>
      <td>${category}</td>
      <td>${activeCount}</td>
      <td>${archivedCount}</td>
      </tr>
      `;

    summaryTable.append(newRow);
  });
}
