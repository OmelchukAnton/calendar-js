import { openFormAdd } from './EventForm.js';
// get the position of the element
let positionForm = function(coord) {
    let box = coord.getBoundingClientRect();
    let elemForm = document.getElementById("addEvent");
    elemForm.setAttribute('style', 
        `top: ${box.top + pageYOffset}px; left: ${box.right + pageXOffset + 10}px; display:block;`);
}
// delete className from selected element
let deleteClass = function() {
    let findClassSelected = document.getElementsByClassName("selected");
    if (findClassSelected.length !== 0) {
        findClassSelected[0].classList.remove('selected');
    }
}
// close quick add event form
let closeQuickAddEvent = function() {
    document.getElementById("quickAddEvent").style.display = "none";
}
// close add event form
let closeAddEventForm = function() {
    document.getElementById("addEvent").style.display = "none";
}
// close the form for adding the event
document.getElementById('close-addEvent-form').onclick = function(e) {
    closeAddEventForm();
    deleteClass();
}
// search events
document.getElementById("search").addEventListener('keydown', function(e) {
    let elemForm;
    closeQuickAddEvent();
    closeAddEventForm();
    deleteClass();
    if (e.keyCode === 13) {
        if (localStorage.getItem('event') !== null) {
            let eventsArray = JSON.parse(localStorage.getItem("event"));
            for(let obj in eventsArray) {
                if (eventsArray[obj].name == this.value) {
                    openFormAdd(eventsArray[obj]);
                    elemForm = document.getElementById("addEvent");
                    elemForm.setAttribute('style', 'position:absolute; right:5%; display:block;');
                } 
            }
        } 
    }
});

export { deleteClass, closeQuickAddEvent, closeAddEventForm, positionForm };