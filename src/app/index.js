import { showCalendar } from './ShowCalendar.js';
import { setLocalStorage } from './service.js';
import { deleteClass, closeQuickAddEvent, closeAddEventForm } from './actions.js';
import '../style/app.css';

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const monthAndYear = document.getElementById("monthAndYear");
// display the calendar
showCalendar(currentMonth, currentYear);
// move to the next month
document.getElementById('next-month').onclick = function(e) {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    setTodayButtonState(currentMonth, currentYear);
}
// move to the previous month
document.getElementById('previous-month').onclick = function(e) {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    setTodayButtonState(currentMonth, currentYear);
}
// switch month and year to current day
document.getElementById("btn-today").onclick = function() {
	refresh();
	setTodayButtonState(currentMonth, currentYear);
}
//update page
document.getElementById("update-page").onclick = function() {
	refresh();
}
// open the quick form
document.getElementById('quick-add-event').onclick = function(e) {
    document.getElementById("quickAddEvent").style.display = "block";
    document.getElementById("event-info").value = '';
	closeAddEventForm();
	deleteClass();
}
// close a quick form
document.getElementById('close-quickAddEvent').onclick = function(e) {
	e.preventDefault();
	closeQuickAddEvent();
}
// save event from quik form
document.getElementById("saveQuickEvent").onclick = function(e) {
    e.preventDefault();
    let info = document.getElementById("event-info").value;
    let re = /\s*,\s*/
    let infoList = info.split(re);
    let dateToken = parseInt(infoList[0].split(' '));
    let eventDate = `${currentYear}-${currentMonth < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)}-${dateToken < 10 ? '0' + dateToken : dateToken}`;
    infoList.splice(0, 1);
    let eventDesc = infoList.join();
    let event = {
        id: Date.parse(new Date()),
        name: '   ',
        date: eventDate,
        part: '',
        desc: eventDesc
    }
    setLocalStorage(event);
    refresh();
}
// refresh calendar
let refresh = function() {
	showCalendar(today.getMonth(), today.getFullYear());
	// set current value
	currentMonth = today.getMonth();
	currentYear = today.getFullYear();
}
// change Today state
let setTodayButtonState = function(currentMonth, currentYear) {
	let todayMonth = today.getMonth();
	let todayYear = today.getFullYear();
	if (currentMonth === todayMonth && currentYear === todayYear) {
		document.getElementById("btn-today").disabled = true;
	} else {
		document.getElementById("btn-today").disabled = false;
	}
    showCalendar(currentMonth, currentYear);
}
