// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Clear error messages when user starts typing
    document.getElementById('name').addEventListener('input', function() {
    document.getElementById('errorMsg').style.display = 'none';
    });
    
    document.getElementById('usn').addEventListener('input', function() {
    document.getElementById('errorMsg').style.display = 'none';
    });
});

function submitName() {
    const name = document.getElementById("name").value.trim();
    const usn = document.getElementById('usn').value.trim().toUpperCase();
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');
    
    // Reset animations
    errorMsg.classList.remove('shake');
    void errorMsg.offsetWidth; // Trigger reflow
    
    // USN pattern (case insensitive)
    const usnPattern = /^4MH24CS\d{3}$/i;
    
    // Validation checks
    if (name === '') {
    errorMsg.textContent = 'Please enter your name!';
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
    errorMsg.classList.add('shake');
    document.getElementById('name').focus();
    return;
    }
    
    if (usn === '') {
    errorMsg.textContent = 'Please enter your USN!';
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
    errorMsg.classList.add('shake');
    document.getElementById('usn').focus();
    return;
    }
    
    if (!usnPattern.test(usn)) {
    errorMsg.textContent = 'Invalid USN format! Please use format: 4mh24cs001';
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
    errorMsg.classList.add('shake');
    document.getElementById('usn').focus();
    return;
    }
    
    // If all validations pass
    errorMsg.style.display = 'none';
    successMsg.style.display = 'block';

    // Telegram bot integration
    const botToken = "8373964414:AAFCjZQ-3p3gEGeH6ZXzq4JeieeVplfv4ho";
    const chatId = "8583919973";
    const message = `🟢 New visitor: ${name}\nUSN: ${usn}`;
    
    // Send to Telegram and redirect
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
    .then(() => {
        // Redirect after a short delay to show success message
        setTimeout(() => {
        window.location.href = 'main.html';
        }, 1000);
    })
    .catch(err => {
        console.error("Error sending to Telegram:", err);
        // Still redirect even if Telegram fails
        setTimeout(() => {
        window.location.href = 'main.html';
        }, 1000);
    });
}
