import { saveTaskToDB } from './render';
import { genId } from './utils';

const categories = ['Task', 'Random Thought', 'Idea'];

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

closeModalBtn.addEventListener('click', closeModal);
addTaskForm.addEventListener('submit', submit);
archiveTableBtn.addEventListener('click', () =>
  showContent(contentArchiveTable)
);
addTaskBtn.addEventListener('click', () => showContent(contentAddTaskForm));

export function openModal() {
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
    name: modalName.value,
    content: modalContent.value,
    category: modalCategory.value,
  };

  saveTaskToDB(newTask);
  closeModal();
  e.target.reset();
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
