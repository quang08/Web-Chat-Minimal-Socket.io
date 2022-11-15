
//create the connection between client side and backend side by pointing the io library to localhost8080
const socket = io('ws://localhost:8080');

//receiving the message from the server: 
//listen to the 'message' event that is emitted by the server
socket.on('message', text => {
    const element = document.createElement('li'); //create the listings for the unordered list
    element.innerHTML = text; //spreading the message to the listings
    document.querySelector('ul').appendChild(element); //add the listings to the UL


});

//user interaction:
//listen to the click event to send message
document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value; //grabbing the value from input
    socket.emit('message', text);
    document.querySelector('input').value = '';//clear input field
}
