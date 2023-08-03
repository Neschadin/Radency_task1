import DOMPurify from 'dompurify';

import { saveTaskToDB, categories } from './data';
import { renderTasksTable, renderSummaryTable } from './render';

const modal = document.getElementById('modal');

const archiveTableBtn = document.getElementById('show-archive-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

const contentArchiveTable = document.getElementById('archive-table');
const contentAddTaskForm = document.getElementById('add-task-form');

const addTaskForm = document.getElementById('modal-form');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalContent = document.getElementById('modal-content');
const modalTaskId = document.getElementById('modal-taskId');

addTaskForm.addEventListener('submit', submit);
archiveTableBtn.addEventListener('click', () =>
  showContent(contentArchiveTable)
);
addTaskBtn.addEventListener('click', () => showContent(contentAddTaskForm));
closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalOnEsc);

function closeModalOnEsc(e) {
  if (modal.classList.contains('hidden')) return;
  if (e.key === 'Escape' || e.key === 'Esc') closeModal();
}

function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  contentArchiveTable.classList.add('hidden');
  contentAddTaskForm.classList.add('hidden');
}

function submit(e) {
  e.preventDefault();

  const newTask = {
    id: +modalTaskId.value || null,
    name: DOMPurify.sanitize(modalName.value),
    content: DOMPurify.sanitize(modalContent.value),
    category: DOMPurify.sanitize(modalCategory.value),
  };

  closeModal();

  modalTaskId.value = null;
  e.target.reset();

  saveTaskToDB(newTask);
  renderTasksTable();
  renderSummaryTable();
}

export function handlerEditTask(editTask) {
  const { id, name, category, content } = editTask;

  modalTaskId.value = id;
  modalName.value = name;
  modalCategory.value = category;
  modalContent.value = content;

  contentAddTaskForm.classList.remove('hidden');
  openModal();
}

function showContent(content) {
  content.classList.remove('hidden');
  openModal();
}

(function modalCategoryOptions() {
  const selectElement = document.getElementById('modal-category');

  categories.forEach((category) => {
    const optionElement = document.createElement('option');
    optionElement.value = category;
    optionElement.textContent = category;
    selectElement.appendChild(optionElement);
  });
})();
