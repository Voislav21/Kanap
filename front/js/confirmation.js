// Access the unique Id //
const idCommand = new URL(window.location.href).searchParams.get("id");

// Display the unique Id created to the DOM //
document.getElementById('orderId').textContent = idCommand;

// Clear the local Storage //
localStorage.clear();