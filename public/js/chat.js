window.addEventListener("load", () => {
  console.log("loaded");
  const socket = io("http://localhost:8000");
  window.addEventListener("unload", () => {
    socket.disconnect();
    //redirect to another page
  });
  const $messageInput = document.getElementById("messageInput");
  const $form = document.getElementById("messageForm");
  const $messagesContainer = document.getElementById("messagesContainer");
  // send message
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    let message = $messageInput.value;
    $messageInput.value = "";
    //send
    socket.emit("msg", message);
  });
  // receive message
  socket.on("msg", (data) => {
    console.log("happened");
    console.log(data);
    if (data.from != socket.id) {
      say(data.from, data.message);
    } else {
      say("me", data.message);
    }
  });
  function say(name, message) {
    $messagesContainer.innerHTML += `<div class="chat-message">
        <span style="color: red; font-weight: bold;">${name}:</span> ${message}
    </div>`;
    // Scroll down to last message
    $messagesContainer.scrollTop = $messagesContainer.scrollHeight;
  }
});
