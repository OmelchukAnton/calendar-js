import { openFormAdd } from './EventForm.js';
import { deleteClass, closeQuickAddEvent, closeAddEventForm, positionForm } from './actions.js';
// build calendar table
function showCalendar(month, year) {
    let today = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body"); // body of the calendar
    // clearing all previous cells
    tbl.innerHTML = "";
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let day = `${year}-${month < 10 ? '0' + (month + 1) 
                    : (month + 1)}-${date < 10 ? '0' + date : date}`;
                cell.onclick = function() {
                    deleteClass();
                	openFormAdd(day);
                    positionForm(cell);
                    cell.classList.add('selected');
                }
                let cellText = document.createTextNode(date);
                if (date === today.getDate() 
                    && year === today.getFullYear() 
                    && month === today.getMonth()) {
                    cell.classList.add("today");
                } // color today's date
                cell.appendChild(cellText);
                // --------------------------------------------------------------
                let events;
                let eventDate;
                if (localStorage.getItem('event') !== null) {
                    events = JSON.parse(localStorage.getItem("event"));
                }
                if (events !== undefined) {
                    events.forEach((event) => {
                        eventDate = event.date;
                        if (day === eventDate) {
                            let eventContainer = createEventUI(event);
                            cell.appendChild(eventContainer);
                        }
                    });
                }
                // --------------------------------------------------------------
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
    closeQuickAddEvent();
    closeAddEventForm();
}
// create div in td 
let createEventUI = function(event) {
    let div = document.createElement('div');
    div.classList.add('event-container');
    div.innerHTML = `${event.name} </br> ${event.part} </br> ${event.desc}`;
    div.onclick = function(e) {
        e.stopPropagation();
        positionForm(div);
        openFormAdd(event);
        deleteClass();
    }
    return div;
}

export { showCalendar }