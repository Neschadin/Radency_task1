import data from '../data.json';
import { extractDatesFromContent, formatDate } from './utils';

const tasksTable = document.getElementById('notes-table-container');
const summaryTable = document.getElementById('summary-table-container');
const archiveTable = document.getElementById('archive-table-container');
const categories = ['Task', 'Random Thought', 'Idea'];
const mockupData = data.data;
let archiveData = [];

function createBtn(id, iconAlt, iconSrc) {
  return `
    <div class="flex justify-center">
    <button id="${id}">
    <img src="${iconSrc}" alt="${iconAlt}" />
    </button>
    </div>
  `;
}

export function createTableRow(data, isArchive = false) {
  const { id, name, createdAt, content, category } = data;
  const newRow = document.createElement('tr');
  newRow.id = id;

  const action = isArchive ? 'restore' : 'archive';
  const deleteAction = isArchive ? 'arch_delete' : 'delete';
  const icon = isArchive ? '/restore.svg' : '/archive.svg';
  const editBtnCell = isArchive
    ? ''
    : `<td>${createBtn('edit_' + id, 'edit', '/edit.svg')}</td>`;

  newRow.innerHTML = `
    <td></td>
    <td>${name}</td>
    <td>${formatDate(createdAt)}</td>
    <td>${content}</td>
    <td>${category}</td>
    <td>${extractDatesFromContent(content) || ''}</td>
    ${editBtnCell}
    <td>${createBtn(action + '_' + id, action, icon)}</td>
    <td>${createBtn(deleteAction + '_' + id, 'delete', '/delete.svg')}</td>
  `;

  return newRow;
}

function handleEdit(id) {
  const elemToEdit = document.getElementById(id);
}

function handleArchive(id) {
  const elemToArchive = document.getElementById(id);
  elemToArchive.remove();

  moveToArchiveDB(id);
  deleteFromDB(id, mockupData);
  renderArchiveTable();
  // updateSummaryTables();
}

function handleDelete(id) {
  const elemToDelete = document.getElementById(id);
  if (!elemToDelete) return;

  elemToDelete.remove();
  deleteFromDB(id, mockupData);
  // updateSummaryTables();
}

function handleArchDelete(id) {
  const elemToDelete = document.getElementById(id);
  if (!elemToDelete) return;

  elemToDelete.remove();
  deleteFromDB(id, archiveData);
  // updateSummaryTables();
}

function deleteFromDB(id, db) {
  const i = db.findIndex((task) => task.id === +id);
  if (i === -1) return;

  db.splice(i, 1);
}

function moveToArchiveDB(id) {
  const i = mockupData.findIndex((task) => task.id === +id);
  if (i === -1) return;
  const archivedTask = mockupData.splice(i, 1)[0];
  archiveData.push(archivedTask);
  console.log(archiveData);
}

// done
function attachListenersToBtns(rowElement) {
  const editBtn = rowElement.querySelector(`button[id^="edit_"]`);
  const archiveBtn = rowElement.querySelector(`button[id^="archive_"]`);
  const restoreBtn = rowElement.querySelector(`button[id^="restore_"]`);
  const deleteBtn = rowElement.querySelector(`button[id^="delete_"]`);
  const archDeleteBtn = rowElement.querySelector(`button[id^="arch_delete_"]`);

  const id = rowElement.id;

  editBtn && editBtn.addEventListener('click', () => handleEdit(id));
  archiveBtn && archiveBtn.addEventListener('click', () => handleArchive(id));
  restoreBtn && restoreBtn.addEventListener('click', () => handleRestore(id));
  deleteBtn && deleteBtn.addEventListener('click', () => handleDelete(id));
  archDeleteBtn &&
    archDeleteBtn.addEventListener('click', () => handleArchDelete(id));
}

// Tasks
export function renderTasksTable() {
  // tasksTable.innerHTML = '';

  mockupData.forEach((item) => {
    const elem = createTableRow(item);
    attachListenersToBtns(elem);

    tasksTable.appendChild(elem);
  });
}

// ARCHIVE
const archiveTableContainer = document.getElementById('archive-table');

export function renderArchiveTable() {
  // Remove the max-h-0 and overflow-hidden classes to make sure the table is visible
  archiveTableContainer.classList.remove('max-h-0', 'overflow-hidden');
  archiveTableContainer.classList.add('h-full');
  
  archiveTable.innerHTML = '';

  archiveData.forEach((item) => {
    const elem = createTableRow(item, true);
    attachListenersToBtns(elem);

    archiveTable.appendChild(elem);
  });

  // Add the max-h-0 and overflow-hidden classes back to hide the table
  archiveTableContainer.classList.add('max-h-0', 'overflow-hidden');
}


function renderSummaryTable() {
  // summaryTable.innerHTML = '';
  let summaryTableHTML = '';

  for (const category of categories) {
    const activeCount = countNotesByCategory(notesData, category, false);
    const archivedCount = countNotesByCategory(notesData, category, true);

    summaryTableHTML += `<tr>`;
    summaryTableHTML += `<td>${category}</td>`;
    summaryTableHTML += `<td>${activeCount}</td>`;
    summaryTableHTML += `<td>${archivedCount}</td>`;
    summaryTableHTML += `</tr>`;
  }

  summaryTableHTML += '</table>';
  summaryTableContainer.innerHTML = summaryTableHTML;
}

// trash

// export function renderTasksTableRow(data) {
//   const { id, name, createdAt, content, category } = data;
//   const newRow = document.createElement('tr');
//   newRow.id = id;

//   newRow.innerHTML = `
//     <td></td>
//     <td>${name}</td>
//     <td>${formatDate(createdAt)}</td>
//     <td>${content}</td>
//     <td>${category}</td>
//     <td>${extractDatesFromContent(content) || ''}</td>
//     <td>${createBtn('edit_' + id, 'edit', '/edit.svg')}</td>
//     <td>${createBtn('archive_' + id, 'archive', '/archive.svg')}</td>
//     <td>${createBtn('delete_' + id, 'delete', '/delete.svg')}</td>
//   `;

//   return newRow;
// }
