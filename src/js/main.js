import {
  renderArchiveTable,
  renderSummaryTable,
  renderTasksTable,
} from './render';
import { data } from '../data.json';

const notesTableContainer = document.getElementById('notes-table-container');
const summaryTableContainer = document.getElementById(
  'summary-table-container'
);

renderTasksTable();
renderArchiveTable();
renderSummaryTable();
