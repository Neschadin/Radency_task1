const addTaskBtn = document.getElementById('add-task-btn');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modal-name');
const modalCategory = document.getElementById('modal-category');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');
const addTaskForm = document.getElementById('modal-form');

addTaskBtn.addEventListener('click', openModalForAdd);
closeModalBtn.addEventListener('click', closeModal);
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closeModal()
});

export function openModalForAdd() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

export function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');

  modalName.value = '';
  modalCategory.value = 'Task';
  modalContent.value = '';
}

export function openModalForEdit(taskId) {
  const taskData = getTaskById(taskId);

  if (taskData) {
    modal.classList.remove('hidden');
    modal.style.display = 'flex';

    modalName.value = taskData.name;
    modalCategory.value = taskData.category;
    modalContent.value = taskData.content;
  }
}




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
