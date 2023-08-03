import { addTaskToDB } from './render';
import { genId } from './utils';

const categories = ['Task', 'Random Thought', 'Idea'];

const showArchiveTableBtn = document.getElementById('show-archive-btn');
const contentArchiveTable = document.getElementById('archive-table');

const modal = document.getElementById('modal');
const addTaskForm = document.getElementById('modal-form');
const contentAddTaskForm = document.getElementById('add-task-form');

const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalContent = document.getElementById('modal-content');
const modalTaskId = document.getElementById('modal-taskId');
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

showArchiveTableBtn.addEventListener('click', handleArchiveTable);
addTaskBtn.addEventListener('click', handleAddTask);
closeModalBtn.addEventListener('click', closeModal);
addTaskForm.addEventListener('submit', handlerSubmit);

export function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  contentArchiveTable.classList.add('hidden');
  contentAddTaskForm.classList.add('hidden');

  modalName.value = '';
  modalCategory.value = 'Task';
  modalContent.value = '';
}

function handlerSubmit(e) {
  e.preventDefault();
  console.log(+modalTaskId.value);
  const newTask = {
    id: +modalTaskId.value,
    name: modalName.value,
    content: modalContent.value,
    category: modalCategory.value,
  };

  addTaskToDB(newTask);
  closeModal();
  e.target.reset();
}

function handleArchiveTable() {
  contentArchiveTable.classList.remove('hidden');
  openModal();
}

function handleAddTask() {
  contentAddTaskForm.classList.remove('hidden');
  openModal();
}

export function handleEditTask(editTask) {
  console.log(editTask);
  const { id, name, category, content } = editTask;

  modalTaskId.value = id;
  modalName.value = name;
  modalCategory.value = category;
  modalContent.value = content;

  contentAddTaskForm.classList.remove('hidden');
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

// {const notesTable = document
//   .getElementById('notes-table-container')
//   .getElementsByTagName('table')[0];
// notesTable.addEventListener('click', (event) => {
//   if (event.target && event.target.id.startsWith('edit_')) {
//     const taskId = event.target.id.replace('edit_', '');
//     openModalForEdit(taskId);
//   }
// });
// }
