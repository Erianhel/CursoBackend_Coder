const socket = io();

socket.on('addProduct', ()=> document.location.reload());
socket.on('deleteProduct', ()=> document.location.reload());