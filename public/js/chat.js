window.addEventListener("load", () => {
  console.log("loaded");
  const socket = io("http://localhost:8000");
  window.addEventListener("unload", () => {
    socket.disconnect();
    //redirect to another page
  });
  const messageinput = document.getElementById("messageInput");
  const messageform = document.getElementById("messageForm");
  const messagesContainer = document.getElementById("messagesContainer");
});
