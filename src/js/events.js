import { handlerEditTask } from './modal';
import { deleteFromDB, getTaskById, moveTaskBetweenDatabases } from './data';
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

function handleEdit(id) {
  const editTask = getTaskById(id);
  handlerEditTask(editTask);
}

function handleArchive(id) {
  const elemToArchive = document.getElementById(id);
  elemToArchive.remove();

  moveTaskBetweenDatabases(id, 'archive');
  deleteFromDB(id, 'mockupDB');
  renderArchiveTable();
  renderSummaryTable();
}

function handleUnarchive(id) {
  moveTaskBetweenDatabases(id, 'unarchive');
  deleteFromDB(id, 'archiveDB');
  renderArchiveTable();
  renderTasksTable();
  renderSummaryTable();
}

function handleDelete(id) {
  const elemToDelete = document.getElementById(id);
  if (!elemToDelete) return;

  elemToDelete.remove();
  deleteFromDB(id, 'mockupDB');
  renderSummaryTable();
}

function handleArchiveDelete(id) {
  deleteFromDB(id, 'archiveDB');
  renderArchiveTable();
  renderSummaryTable();
}
