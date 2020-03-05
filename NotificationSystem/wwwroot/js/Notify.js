"use strict";
var count=0;
var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "You have message from " + user +"      as     " + msg;
    
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    count = count + 1;
    document.getElementById("messages").appendChild(li);
    document.getElementById("cc").innerHTML=count;
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    var user = document.getElementById("user").value;
    var message = document.getElementById("message").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
  
    event.preventDefault();
});