console.log('chat script executed...');

//front end make connection to server socket (differ from server variable)
const socket = io.connect("http://localhost:3000");
console.log(io);
console.log('connection established...');


//elements we'll be using to send a message
const message = document.getElementById('message'), 
        handle = document.getElementById('handle'), 
        button = document.getElementById('button'),
        output = document.getElementById('output'),
        feedback = document.getElementById('feedback');



//emit event when someone hits send
button.addEventListener('click',()=>{
   

    //emit a message down the server
    socket.emit('chatmessage', {
        message:message.value,
        handle:handle.value,
    })

})

//listen to received data from server, if received, callback fires, and we output message to front end
socket.on('chatmessage',(data)=>{
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + "</p>";

    //set the feedback message to an empty string to remove feedback message
    feedback.innerHTML=''
})

//emiting feedback message on kepress
message.addEventListener('keypress',()=>{
    socket.emit('typing', handle.value);
})

//listen to the typing message sent from server, output it to front end
socket.on('typing', (data)=>{
        feedback.innerHTML = '<p><em>' + data + 'is typing a message...</em></p>' 
})