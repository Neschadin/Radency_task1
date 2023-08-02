import { renderArchiveTable, renderTasksTable } from './render';
import { data } from '../data.json';
import { openModalForAdd } from './modal';

const categories = ['Task', 'Random Thought', 'Idea'];

const notesTableContainer = document.getElementById('notes-table-container');
const summaryTableContainer = document.getElementById(
  'summary-table-container'
);



function modalCategoryOptions() {
  const selectElement = document.getElementById('modal-category');

  categories.forEach((category) => {
    const optionElement = document.createElement('option');
    optionElement.value = category;
    optionElement.textContent = category;
    selectElement.appendChild(optionElement);
  });
}

renderTasksTable();
renderArchiveTable()
// renderSummaryTable();
// buildTasksList();
modalCategoryOptions();
// openModalForAdd();
