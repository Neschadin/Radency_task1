import data from '../data.json';
import { extractDatesFromContent, formatDate } from './utils';

const notesTable = document.getElementById('notes-table-container');
const summaryTable = document.getElementById('summary-table-container');
const categories = ['Task', 'Random Thought', 'Idea'];
const mockupData = data.data;
const archiveData = [];

function createButton(id, iconAlt, iconSrc) {
  return `
    <div class="flex justify-center">
    <button id="${id}">
    <img src="${iconSrc}" alt="${iconAlt}" />
    </button>
    </div>
  `;
}

export function createNotesTableRow(data) {
  const { id, name, createdAt, content, category } = data;
  const newRow = document.createElement('tr');
  newRow.id = id;

  newRow.innerHTML = `
    <td></td>
    <td>${name}</td>
    <td>${formatDate(createdAt)}</td>
    <td>${content}</td>
    <td>${category}</td>
    <td>${extractDatesFromContent(content) || ''}</td>
    <td>${createButton('edit_' + id, 'edit', '/edit.svg')}</td>
    <td>${createButton('archive_' + id, 'archive', '/archive.svg')}</td>
    <td>${createButton('delete_' + id, 'delete', '/delete.svg')}</td>
  `;

  return newRow;
}

function handleEdit(id) {
  const elemToEdit = document.getElementById(id);
}
function handleArchive(id) {
  const elemToArchive = document.getElementById(id);
  elemToArchive.remove();
}
function handleDelete(id) {
  const elemToDelete = document.getElementById(id);
  elemToDelete.remove();
}

function attachHandlersToButtons(rowElement) {
  const editButton = rowElement.querySelector(`button[id^="edit_"]`);
  const archiveButton = rowElement.querySelector(`button[id^="archive_"]`);
  const deleteButton = rowElement.querySelector(`button[id^="delete_"]`);

  const id = rowElement.id;

  editButton.addEventListener('click', () => handleEdit(id));
  archiveButton.addEventListener('click', () => handleArchive(id));
  deleteButton.addEventListener('click', () => handleDelete(id));
}

export function buildTasksList() {
  // notesTable.innerHTML = '';

  mockupData.forEach((item) => {
    const elem = createNotesTableRow(item);
    attachHandlersToButtons(elem);
    // addListenerToElem(elem);

    notesTable.appendChild(elem);
  });
}

function renderNotesTable() {}

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
