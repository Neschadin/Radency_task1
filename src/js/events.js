import { closeModal, handlerEditTask } from './modal';
import {
  checkerArchiveTasks,
  deleteFromDB,
  getTaskById,
  toggleTaskArchivedStatus,
} from './data';
import {
  renderArchiveTable,
  renderSummaryTable,
  renderTasksTable,
} from './render';

export function attachListenersToBtns(rowElement) {
  const editBtn = rowElement.querySelector(`button[id^="edit_"]`);
  const archiveBtn = rowElement.querySelector(`button[id^="archive_"]`);
  const unarchiveBtn = rowElement.querySelector(`button[id^="unarchive_"]`);
  const deleteBtn = rowElement.querySelector(`button[id^="delete_"]`);

  const id = rowElement.id;

  editBtn && editBtn.addEventListener('click', () => handleEdit(id));
  archiveBtn && archiveBtn.addEventListener('click', () => handleArchive(id));
  deleteBtn && deleteBtn.addEventListener('click', () => handleDelete(id));
  unarchiveBtn &&
    unarchiveBtn.addEventListener('click', () => handleUnarchive(id));
}

function handleEdit(id) {
  const editTask = getTaskById(id);
  handlerEditTask(editTask);
}

function handleArchive(id) {
  toggleTaskArchivedStatus(id, 'archive');
  rerenderAllTables();
}

function handleUnarchive(id) {
  toggleTaskArchivedStatus(id, 'unarchive');
  rerenderAllTables();

  const checkArchiveTasks = checkerArchiveTasks();
  if (!checkArchiveTasks) closeModal();
}

function handleDelete(id) {
  deleteFromDB(id);
  rerenderAllTables();

  const checkArchiveTasks = checkerArchiveTasks();
  if (!checkArchiveTasks) closeModal();
}

function rerenderAllTables() {
  renderSummaryTable();
  renderArchiveTable();
  renderTasksTable();
}
