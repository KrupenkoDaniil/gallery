import * as consts from './variables.js';
import { applyFilters } from './create-desk.js';
import { showMessage } from './work-with-modal-window.js';

// Get Data from the server
export const getData = (onSuccess) => {
    const requests = consts.GET_URLS.map(url => fetch(url));
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(data => onSuccess(data)); // Понять
}

// Send Data to the server
const sendData = (postName, onSuccess, body) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', consts.POST_URLS[postName]);

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
        showMessage(postName, xhr.status);
    });
    xhr.addEventListener('error', () => {
        console.log('error');
    })

    xhr.send(body);

}

export const setForm = (postName, postForm, additionalIds, onSuccess, eventName = 'submit') => {
    postForm.addEventListener(eventName, (event) => {
        event.preventDefault();
        let data = new FormData(postForm);
        additionalIds.map((idName) => {
            data.append(`${idName[0]}`, idName[1])
        });



        sendData(postName, onSuccess, data);
    }, { once: true });
}

// Delete Data from server
export const deleteData = (deleteURL) => {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", deleteURL);

    xhr.addEventListener('load', () => {
        if (xhr.status == 201) {
            onSuccess(JSON.parse(xhr.response));
        }
    })

    xhr.send();
}

// Set WebSocket
const socket = new WebSocket('ws://127.0.0.1:2346');

socket.addEventListener('open', () => {
    getData((response) => {
        let message = JSON.stringify(applyFilters.pictures);
        socket.send(message);
    });
});
socket.addEventListener('message', (event) => {
    applyFilters('1');
});