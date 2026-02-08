document.addEventListener("DOMContentLoaded", () => {
    // 1. SELECT ELEMENTS
    const screens = document.querySelectorAll(".screen");
    const nextBtn = document.getElementById("button2");
    const backBtn = document.getElementById("button1");
    const exitBtn = document.getElementById("button3");
    const passwordInput = document.getElementById("passwordInput");
    const errorMsg = document.getElementById("errorMsg");
    const chatbox = document.getElementById("chatbox");
    const options = document.getElementById("options");
    const chatFooter = document.querySelectorAll(".chatfooter");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // 2. STATE VARIABLES
    let noCount = 0;
    const correctPassword = "Saicey Saclag Sanglitan Nollora";
    const normalize = str => str.toLowerCase().replace(/\s+/g, " ").trim();

    // 3. MESSAGES ARRAY (You can add your 100 lines here)
    const messages = [
        "Hi Saicey...",
        "I've been thinking about how to say this.",
        "I wanted to make something special for you.",
        "Something that shows how much I care.",
        "Every moment since we met has been a blessing.",
        "I couldn't imagine my days without you.",
        "You make everything a little bit brighter.",
        "So, I spent some time building this for you...",
        "Just to ask one simple question.",
        "You mean the world to me.",
        "And so...",
        "Will you be my valentine?" 
    ];

    const noResponses = [
        "Why not? :(",
        "Please think about it...",
        "Are you sure?",
        "Give me a chance?",
        "You're breaking my heart!"
    ];

    // 4. CORE FUNCTIONS
    function showScreen(id) {
        screens.forEach(s => {
            s.classList.remove("active");
            s.style.display = "none";
        });

        const el = document.getElementById(id);
        if (el) {
            el.classList.add("active");
            if (id === "chat") el.style.display = "flex";
            else if (id === "password") el.style.display = "grid";
            else el.style.display = "block";
        }
        updateNavButtons(id);
    }

    function updateNavButtons(currentId) {
        nextBtn.disabled = false;
        backBtn.disabled = false;
        exitBtn.disabled = false;
        nextBtn.style.opacity = "1";
        backBtn.style.opacity = "1";

        if (currentId === "lockscreen") {
            backBtn.disabled = true;
            exitBtn.disabled = true;
            backBtn.style.opacity = "0.3";
        } else if (currentId === "password") {
            nextBtn.disabled = true;
            nextBtn.style.opacity = "0.3";
        }
    }

    async function startTyping() {
        chatbox.innerHTML = ""; 
				chatbox.scrollTop = chatbox.scrollHeight;
        options.style.visibility = "hidden";
        
        // Loop through messages
        for (let i = 0; i < messages.length; i++) {
            const msg = document.createElement("p");
            msg.textContent = messages[i];
            msg.style.marginBottom = "8px";
            chatbox.appendChild(msg);
            chatbox.scrollTop = chatbox.scrollHeight;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Show buttons after last message
        options.style.visibility = "visible";
    }

    // 5. EVENT LISTENERS

    // Password Submit
    document.getElementById("submitPassword").addEventListener("click", () => {
        const value = passwordInput.value;
        if (normalize(value) === normalize(correctPassword)) {
            showScreen("chat");
            startTyping(); // Trigger typing only on success
        } else if (normalize(value) === "saicey sanglitan") {
            errorMsg.textContent = "Where's your middle name?";
        } else if (normalize(value) === "saicey saclag sanglitan") {
            errorMsg.textContent = "Why not try adding my surname there?";
        } else {
            errorMsg.textContent = "Try again.";
        }
    });

    // Header Navigation
    nextBtn.addEventListener("click", () => {
        const activeScreen = document.querySelector(".screen.active").id;
        if (activeScreen === "lockscreen") showScreen("password");
        else if (activeScreen === "chat") showScreen("final");
    });

    backBtn.addEventListener("click", () => {
        const activeScreen = document.querySelector(".screen.active").id;
        if (activeScreen === "password") showScreen("lockscreen");
        else if (activeScreen === "chat") showScreen("password");
        else if (activeScreen === "final") showScreen("chat");
    });

    exitBtn.addEventListener("click", () => {
        passwordInput.value = "";
        errorMsg.textContent = "";
        noCount = 0;
        noBtn.style.display = "inline-block";
        chatFooter[1].textContent = "";
				yesBtn.classList.remove("only-choice");
        showScreen("lockscreen");
    });

    // Lockscreen Button
    document.getElementById("unlockBtn").addEventListener("click", () => showScreen("password"));

    // Chat Buttons
		noBtn.addEventListener("click", () => {
				if (noCount < 5) {
						chatFooter[1].textContent = noResponses[noCount];
						noCount++;
				}

				if (noCount >= 5) {
						noBtn.style.display = "none";
						yesBtn.classList.add("only-choice");
						chatFooter[1].textContent = "You have to say yes now! <3";
				}
		});

    yesBtn.addEventListener("click", () => showScreen("final"));

    // 6. INITIALIZE
    showScreen("lockscreen");
});