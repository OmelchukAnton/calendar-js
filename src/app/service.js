function setLocalStorage(event) {
	let eventsArray;
    if (localStorage.getItem('event') !== null) {
        eventsArray = JSON.parse(localStorage.getItem("event"));
        if (event.id !== Date.parse(new Date())) {
        	for (let i = 0; i < eventsArray.length; i++) {
	        	if (eventsArray[i].id === event.id) {
	        		eventsArray.splice(i, 1, event);
	        	}
        	}
        } else {
	        eventsArray.push(event);
        }
    } else {
    	eventsArray = [];
    	eventsArray.push(event);
    }
	let eventsData = JSON.stringify(eventsArray);
	localStorage.setItem('event', eventsData);
}

export { setLocalStorage }