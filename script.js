// --- DOM Elements ---
const timeEl = document.getElementById('time');
const greetingEl = document.getElementById('greeting');
const focusInput = document.getElementById('focus-input');
const focusDisplay = document.getElementById('focus-display');
const focusContainer = document.querySelector('.focus-container');

// --- Sidebar Navigation Elements ---
const navLinks = document.querySelectorAll('.navigation .list');
const views = document.querySelectorAll('.view');


// --- Sidebar Navigation Logic ---
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Handle the active class for the link itself
        navLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        // Handle switching the content view
        const targetId = this.getAttribute('data-target');
        views.forEach(view => {
            if (view.id === targetId) {
                view.classList.add('active-view');
            } else {
                view.classList.remove('active-view');
            }
        });
    });
});


// --- Time and Greeting Logic (for Home view) ---
function updateTimeAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Format time to be always two digits
    if(timeEl) {
       timeEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    // Set greeting based on the time of day
    if(greetingEl){
         if (hours < 12) {
            greetingEl.textContent = 'Good Morning, User.';
        } else if (hours < 18) {
            greetingEl.textContent = 'Good Afternoon, User.';
        } else {
            greetingEl.textContent = 'Good Evening, User.';
        }
    }
}

// --- Home view new clock
let hour = document.getElementById("hour")
function clock() {
    
}

// --- Daily Focus Logic (for Home view) ---
function getFocus() {
    chrome.storage.sync.get(['focus'], function(result) {
        if (result.focus && focusInput && focusDisplay) {
            focusInput.style.display = 'none';
            focusDisplay.textContent = result.focus;
            focusDisplay.style.display = 'block';
            if(focusContainer) focusContainer.querySelector('h2').style.display = 'none';
        }
    });
}

if(focusInput) {
    focusInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const newFocus = focusInput.value;
            if(newFocus) {
                 chrome.storage.sync.set({ focus: newFocus }, function() {
                    focusInput.style.display = 'none';
                    focusDisplay.textContent = newFocus;
                    focusDisplay.style.display = 'block';
                    if(focusContainer) focusContainer.querySelector('h2').style.display = 'none';
                });
            }
        }
    });
}

if(focusDisplay){
    focusDisplay.addEventListener('click', () => {
        focusDisplay.style.display = 'none';
        focusInput.value = focusDisplay.textContent;
        focusInput.style.display = 'block';
        focusInput.focus();
        if(focusContainer) focusContainer.querySelector('h2').style.display = 'block';
    });
}


// --- Initial Load ---
updateTimeAndGreeting();
getFocus();
setInterval(updateTimeAndGreeting, 1000);
