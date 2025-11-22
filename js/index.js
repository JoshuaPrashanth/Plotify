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

let students = [];

async function loadCSV(file) {
    const res = await fetch(file);
    const text = await res.text();
    
    const rows = text.trim().split("\n").slice(1);

    return rows.map(row => {
        const [USN, NAME, SECTION] = row.split(",");
        return {
            usn: USN.trim().toUpperCase(),
            name: NAME.trim(),
            section: SECTION.trim()
        };
    });
}

async function loadAllCSVs() {
    const files = [
        "Student_database/a.csv",
        "Student_database/b.csv",
        "Student_database/c.csv"
    ];

    let allData = [];

    for (const f of files) {
        const csvData = await loadCSV(f);
        allData = allData.concat(csvData);
    }

    students = allData;
    console.log("Loaded students:", students);
}


document.addEventListener("DOMContentLoaded", loadAllCSVs);


// function submitName() {
//     const name = document.getElementById("name").value.trim();
//     const usn = document.getElementById('usn').value.trim().toUpperCase();
//     const errorMsg = document.getElementById('errorMsg');
//     const successMsg = document.getElementById('successMsg');
    
//     // Reset animations
//     errorMsg.classList.remove('shake');
//     void errorMsg.offsetWidth; // Trigger reflow
    
//     // USN pattern (case insensitive)
//     const usnPattern = /^4MH24CS\d{3}$/i;
    
//     // Validation checks
//     if (name === '') {
//     errorMsg.textContent = 'Please enter your name!';
//     errorMsg.style.display = 'block';
//     successMsg.style.display = 'none';
//     errorMsg.classList.add('shake');
//     document.getElementById('name').focus();
//     return;
//     }
    
//     if (usn === '') {
//     errorMsg.textContent = 'Please enter your USN!';
//     errorMsg.style.display = 'block';
//     successMsg.style.display = 'none';
//     errorMsg.classList.add('shake');
//     document.getElementById('usn').focus();
//     return;
//     }
    
//     if (!usnPattern.test(usn)) {
//     errorMsg.textContent = 'Invalid USN format! Please use format: 4mh24cs001';
//     errorMsg.style.display = 'block';
//     successMsg.style.display = 'none';
//     errorMsg.classList.add('shake');
//     document.getElementById('usn').focus();
//     return;
//     }
    
//     // If all validations pass
//     errorMsg.style.display = 'none';
//     successMsg.style.display = 'block';

//     // Telegram bot integration
//     const botToken = "8373964414:AAFCjZQ-3p3gEGeH6ZXzq4JeieeVplfv4ho";
//     const chatId = "8583919973";
//     const message = `🟢 New visitor: ${name}\nUSN: ${usn}`;
    
//     // Send to Telegram and redirect
//     fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
//     .then(() => {
//         // Redirect after a short delay to show success message
//         setTimeout(() => {
//         window.location.href = 'main.html';
//         }, 1000);
//     })
//     .catch(err => {
//         console.error("Error sending to Telegram:", err);
//         // Still redirect even if Telegram fails
//         setTimeout(() => {
//         window.location.href = 'main.html';
//         }, 1000);
//     });
// }


// function submitName() {
//     const name = document.getElementById("name").value.trim();
//     const usn = document.getElementById('usn').value.trim().toUpperCase();
//     const errorMsg = document.getElementById('errorMsg');
//     const successMsg = document.getElementById('successMsg');
    
//     // Reset animations
//     errorMsg.classList.remove('shake');
//     void errorMsg.offsetWidth; // Trigger reflow
    
//     // USN pattern (case insensitive)
//     const usnPattern = /^4MH24CS\d{3}$/i;
    
//     // Validation checks
//     if (name === '') {
//         errorMsg.textContent = 'Please enter your name!';
//         errorMsg.style.display = 'block';
//         successMsg.style.display = 'none';
//         errorMsg.classList.add('shake');
//         document.getElementById('name').focus();
//         return;
//     }
    
//     if (usn === '') {
//         errorMsg.textContent = 'Please enter your USN!';
//         errorMsg.style.display = 'block';
//         successMsg.style.display = 'none';
//         errorMsg.classList.add('shake');
//         document.getElementById('usn').focus();
//         return;
//     }
    
//     if (!usnPattern.test(usn)) {
//         errorMsg.textContent = 'Invalid USN format! Please use format: 4mh24cs001';
//         errorMsg.style.display = 'block';
//         successMsg.style.display = 'none';
//         errorMsg.classList.add('shake');
//         document.getElementById('usn').focus();
//         return;
//     }

//     // 🔍 Match USN from CSV database
//     const matchedStudent = students.find(s => s.usn === usn);

//     if (!matchedStudent) {
//         errorMsg.textContent = 'USN not found in student database!';
//         errorMsg.style.display = 'block';
//         successMsg.style.display = 'none';
//         errorMsg.classList.add('shake');
//         return;
//     }
    
//     // If all validations pass
//     errorMsg.style.display = 'none';
//     successMsg.style.display = 'block';

//     // Telegram bot integration
//     const botToken = "8373964414:AAFCjZQ-3p3gEGeH6ZXzq4JeieeVplfv4ho";
//     const chatId = "8583919973";

//     const message = `🟢 New visitor:
// Name: ${matchedStudent.name}
// USN: ${matchedStudent.usn}
// Section: ${matchedStudent.section}`;

//     // Send to Telegram and redirect
//     fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
//     .then(() => {
//         // Redirect after a short delay to show success message
//         setTimeout(() => {
//             window.location.href = 'main.html';
//         }, 1000);
//     })
//     .catch(err => {
//         console.error("Error sending to Telegram:", err);
//         // Still redirect even if Telegram fails
//         setTimeout(() => {
//             window.location.href = 'main.html';
//         }, 1000);
//     });
// }


function submitName() {
    const name = document.getElementById("name").value.trim();
    const usn = document.getElementById('usn').value.trim().toUpperCase();
    const errorMsg = document.getElementById('errorMsg');
    const successMsg = document.getElementById('successMsg');

    // Reset animations
    errorMsg.classList.remove('shake');
    void errorMsg.offsetWidth;

    // USN pattern
    const usnPattern = /^4MH24CS\d{3}$/i;

    // ========== VALIDATION ==========
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

    // ========== FIND STUDENT BY USN ==========
    const matchedStudent = students.find(s => s.usn === usn);

    if (!matchedStudent) {
        errorMsg.textContent = 'USN not found in student database!';
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        errorMsg.classList.add('shake');
        return;
    }

    // ========== MATCH NAME WITH CSV ==========
    const csvName = matchedStudent.name.replace(/\s+/g, " ").trim().toLowerCase();
    const inputName = name.replace(/\s+/g, " ").trim().toLowerCase();

    if (csvName !== inputName) {
        errorMsg.textContent = 'Name does not match records for this USN!';
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        errorMsg.classList.add('shake');
        return;
    }

    // ========== SUCCESS ==========
    errorMsg.style.display = 'none';
    successMsg.style.display = 'block';

    // ========== TELEGRAM SEND ==========
    const botToken = "8373964414:AAFCjZQ-3p3gEGeH6ZXzq4JeieeVplfv4ho";
    const chatId = "8583919973";

    const message =
`🟢 New visitor:
Name: ${matchedStudent.name}
USN: ${matchedStudent.usn}
Section: ${matchedStudent.section}`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .then(() => {
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        })
        .catch(err => {
            console.error("Error sending to Telegram:", err);
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 1000);
        });
}
