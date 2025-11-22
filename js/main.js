function randomArray(length, min, max) {
  return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}


async function copyCode(section, btn) {
  btn.textContent = "Loading...";
  
  try {
    const response = await fetch(`https://plotify-backend-production.up.railway.app/get-code/${section}`);
    const data = await response.json();

    const code = data.code;

    const tempInput = document.createElement("textarea");
    document.body.appendChild(tempInput);
    tempInput.value = code;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    btn.textContent = "✅ Copied!";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = "Copy Code";
      btn.classList.remove("copied");
    }, 1500);

  } catch (error) {
    console.error(error);
    btn.textContent = "Error!";
  }
}


function toggleFolder(folderId) {
  const folder = document.getElementById(folderId);
  folder.classList.toggle("open");
}

function showAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
  document.getElementById("password-input").focus();
}

function hideAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
  document.getElementById("password-input").value = "";
  document.getElementById("error-msg").style.display = "none";
}

function authenticate() {
  const password = document.getElementById("password-input").value;
  const errorMsg = document.getElementById("error-msg");
  
  // Simple authentication - in a real app, this would be more secure
  if (password === "pl0tify") {
    document.getElementById("lock-overlay").style.display = "none";
    document.getElementById("ds-folder").classList.remove("locked");
    hideAuthModal();
  } else {
    errorMsg.style.display = "block";
    document.getElementById("password-input").value = "";
    document.getElementById("password-input").focus();
  }
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById("auth-modal");
  if (event.target === modal) {
    hideAuthModal();
  }
}

// Handle Enter key in password field
document.getElementById("password-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    authenticate();
  }
});
