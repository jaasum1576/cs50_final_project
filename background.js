// Pomodoro Timer Variables
let timerInterval;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorking = false;

function startTimer() {
  if (!isWorking) {
    timerInterval = setInterval(function () {
      // Code to update the timer display in the extension popup
      // and handle work and break intervals
      // Example: send a message to the popup with remaining time
      chrome.runtime.sendMessage({ type: 'timer', time: workTime });
      // Decrement workTime each second
      workTime--;
      if (workTime < 0) {
        clearInterval(timerInterval);
        isWorking = false;
        // Start break time
        startBreakTimer();
      }
    }, 1000);
    isWorking = true;
  }
}

function startBreakTimer() {
  // Code to update the timer display in the extension popup for break time
  // Example: send a message to the popup with remaining break time
  chrome.runtime.sendMessage({ type: 'break-timer', time: breakTime });

  // Your break time logic here
  // ...
}

function stopTimer() {
  clearInterval(timerInterval);
  isWorking = false;
  // Code to reset the timer display in the extension popup
  // Example: send a message to the popup to reset the timer display
  chrome.runtime.sendMessage({ type: 'reset-timer' });
}

// Tab Management Functions
function saveSession(sessionName, tabIds) {
  // Code to save the session using chrome.storage.local or other storage methods
  // Example: Save the session with sessionName and tabIds
}

function groupTabs(tabIds) {
  // Code to group tabs using chrome.tabs.group or other tab grouping methods
  // Example: Group tabs using tabIds
}

function suspendInactiveTabs() {
  // Code to suspend inactive tabs using chrome.tabs.discard or other tab management methods
  // Example: Suspend inactive tabs
}

// Message Listener
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Handle messages from the popup
  if (message.type === 'start-timer') {
    startTimer();
  } else if (message.type === 'stop-timer') {
    stopTimer();
  } else if (message.type === 'save-session') {
    saveSession(message.sessionName, message.tabIds);
  } else if (message.type === 'group-tabs') {
    groupTabs(message.tabIds);
  } else if (message.type === 'suspend-inactive-tabs') {
    suspendInactiveTabs();
  }
});

// Optionally, you can add other listeners or background tasks as needed

function setDarkMode(enableDarkMode) {
    chrome.tabs.query({}, function (tabs) {
      for (const tab of tabs) {
        chrome.tabs.executeScript(tab.id, {
          code: `document.body.style.backgroundColor = '${enableDarkMode ? '#333' : '#f0f5f7'}';`
        });
      }
    });
  }

  