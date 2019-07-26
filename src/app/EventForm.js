import { showCalendar } from './ShowCalendar.js';
import { setLocalStorage } from './service.js';
import { deleteClass, closeQuickAddEvent, closeAddEventForm } from './actions.js';
// open a form for adding event
function openFormAdd(data) {
	closeQuickAddEvent();
	let eventName = document.getElementById("event-name");
	let eventDate = document.getElementById("event-date");
	let eventPart = document.getElementById("event-participant");
	let eventDesc = document.getElementById("event-description");
	if (typeof data === 'object') {
		eventName.value = data.name;
		eventName.readOnly = true;
		eventDate.value = data.date;
		eventDate.readOnly = true;
		eventPart.value = data.part;
		eventPart.readOnly = true;
		eventDesc.value = data.desc;
	} else {
		eventName.value = '';
		eventName.readOnly  = false;
		eventDate.value = data;
		eventDate.readOnly = false;
		eventPart.value = '';
		eventPart.readOnly = false;
		eventDesc.value = '';
	}
	// clear inputs in form
	document.getElementById('btn-delete').onclick = function(e) {
		eventName.value = '';
		eventDate.value = '';
		eventPart.value = '';
		eventDesc.value = '';
	}
	// save event
	document.getElementById('btn-send').onclick = function(e) {
		let ID;
		let event;
		let eventsArray;
		let eventsData;
		if (data.id == undefined) {
			ID = Date.parse(new Date());
		} else {
			ID = data.id;
		}
		event = {
			id: ID,
			name: eventName.value,
			date: eventDate.value,
			part: eventPart.value,
			desc: eventDesc.value
		}
		setLocalStorage(event);
		closeAddEventForm();
		showCalendar(new Date().getMonth(), new Date().getFullYear());
	}
}

export { openFormAdd };