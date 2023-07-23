document.addEventListener("DOMContentLoaded", function () {
    // Task and Todo List Manager
    const taskList = document.getElementById("task-list");
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerText = taskText;
        taskList.appendChild(taskItem);
        taskInput.value = "";
  
        // Add a checkbox to mark tasks as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        taskItem.prepend(checkbox);
  
        // Add a delete button to remove tasks
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10006;";
        deleteButton.classList.add("delete-button");
        taskItem.appendChild(deleteButton);
  
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            taskItem.style.textDecoration = "line-through";
            checkCompletedTasks();
          } else {
            taskItem.style.textDecoration = "none";
            checkCompletedTasks();
          }
        });
  
        deleteButton.addEventListener("click", function () {
          taskList.removeChild(taskItem);
          checkCompletedTasks();
        });
      }
    }
  
    function checkCompletedTasks() {
      const tasks = document.querySelectorAll("#task-list li");
      const completedTasks = document.querySelectorAll("#task-list li input:checked");
      if (completedTasks.length === tasks.length) {
        // All tasks are completed, show congratulations message
        showCongratulations();
      }
    }
  
    function showCongratulations() {
      const congratulations = document.createElement("div");
      congratulations.innerText = "Congratulations! All tasks completed!";
      congratulations.classList.add("congratulations");
      document.body.appendChild(congratulations);
  
      // Remove the congratulations message after a few seconds
      setTimeout(function () {
        document.body.removeChild(congratulations);
      }, 3000);
    }
  
    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  
    // Pomodoro Timer
  // Pomodoro Timer
  const timerDisplay = document.getElementById("timer-display");
  const startTimerBtn = document.getElementById("start-timer-btn");
  const stopTimerBtn = document.getElementById("stop-timer-btn");
  const workDurationInput = document.getElementById("work-duration");
  const breakDurationInput = document.getElementById("break-duration");
  let isTimerRunning = false;
  let currentTimer;
  let timerInterval;

  function startTimer() {
    if (isTimerRunning) return;
    const minutes = parseInt(workDurationInput.value, 10);
    if (Number.isNaN(minutes) || minutes <= 0) return;
    let seconds = minutes * 60;
    isTimerRunning = true;
    currentTimer = "work";
    timerInterval = setInterval(function () {
      const minutesRemaining = Math.floor(seconds / 60);
      const secondsRemaining = seconds % 60;
      const displayMinutes = minutesRemaining.toString().padStart(2, "0");
      const displaySeconds = secondsRemaining.toString().padStart(2, "0");
      timerDisplay.innerText = `${displayMinutes}:${displaySeconds}`;
      seconds--;
      if (seconds < 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        // Trigger the break timer
        showBreakOverMessage();
      }
    }, 1000);
  }

  function startBreakTimer() {
    const minutes = parseInt(breakDurationInput.value, 10);
    if (Number.isNaN(minutes) || minutes <= 0) return;
    let seconds = minutes * 60;
    isTimerRunning = true;
    currentTimer = "break";
    timerDisplay.innerText = "Take a break!";
    timerInterval = setInterval(function () {
      seconds--;
      if (seconds < 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        // Timer completed, reset the timer display
        timerDisplay.innerText = "00:00";
        // Show message "Time to start working again!"
        setTimeout(function () {
          startTimer();
        }, 3000); // Continue the work timer after 3 seconds
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerDisplay.innerText = "00:00";
  }
  startTimerBtn.addEventListener("click", startTimer);
  stopTimerBtn.addEventListener("click", stopTimer);  
  
    // Add a red cross button to delete tasks
    const taskItems = document.querySelectorAll("#task-list li");
  
    function createDeleteButton() {
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "&#10006;";
      deleteButton.classList.add("delete-button");
      return deleteButton;
    }
  
    taskItems.forEach(taskItem => {
      const deleteButton = createDeleteButton();
      taskItem.appendChild(deleteButton);
  
      deleteButton.addEventListener("click", function () {
        taskList.removeChild(taskItem);
        checkCompletedTasks();
      });
    });
  
    // "Take a break" message when the break is over
    function showBreakOverMessage() {
      timerDisplay.innerText = "Take a break!";
      setTimeout(function () {
        startTimer();
      }, 3000); // Continue the work timer after 3 seconds
    }
    function showCongratulations() {
        const congratulationsContainer = document.querySelector(".congratulations-container");
        congratulationsContainer.innerHTML = '<div class="congratulations">Congratulations! All tasks completed!</div>';
        // Remove the congratulations message after a few seconds
        setTimeout(function () {
          congratulationsContainer.innerHTML = '';
        }, 3000);

          // Function to show congratulations message
  function showCongratulationsMessage() {
    const congratulations = document.createElement("div");
    congratulations.innerText = "Congratulations! All tasks completed!";
    congratulations.classList.add("congratulations-message");
    const taskListHeader = document.querySelector(".task-list h2");
    taskListHeader.parentNode.insertBefore(congratulations, taskListHeader.nextSibling);

    // Remove the congratulations message after a few seconds
    setTimeout(function () {
      congratulations.parentNode.removeChild(congratulations);
    }, 3000);
  }

  // Function to check completed tasks and display congratulations if all tasks are completed
  function checkCompletedTasks() {
    const tasks = document.querySelectorAll("#task-list li");
    const completedTasks = document.querySelectorAll("#task-list li input:checked");
    if (completedTasks.length === tasks.length) {
      showCongratulationsMessage();
    }
  }

  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
      }
    // Tab Management
    const tabList = document.getElementById("tab-list");
    const viewAllTabsBtn = document.getElementById("view-all-tabs-btn");
    const searchInput = document.getElementById("search-input");
    let isTabListVisible = false;
  
    function toggleTabListVisibility() {
      if (!isTabListVisible) {
        // View all open tabs
        chrome.tabs.query({}, function (tabs) {
          displayTabs(tabs);
        });
        isTabListVisible = true;
      } else {
        // Hide the tab list
        tabList.innerHTML = '';
        isTabListVisible = false;
      }
    }
  
    viewAllTabsBtn.addEventListener("click", toggleTabListVisibility);
  
    // Function to display open tabs in a list
    function displayTabs(tabs) {
      tabList.innerHTML = '';
  
      for (const tab of tabs) {
        const listItem = document.createElement("li");
        const tabTitle = document.createElement("span");
        tabTitle.textContent = tab.title;
        listItem.appendChild(tabTitle);
        tabList.appendChild(listItem);
  
        // Open the tab when clicked
        listItem.addEventListener("click", function () {
          chrome.tabs.update(tab.id, { active: true });
        });
  
        // Hover effect to change the text color when hovering over a tab
        listItem.addEventListener("mouseover", function () {
          tabTitle.style.color = "#e74c3c"; // Change text color on hover
        });
  
        listItem.addEventListener("mouseout", function () {
          tabTitle.style.color = "#000"; // Reset text color when not hovering
        });
      }
    }
  
    // Function to search for tabs
    function searchTabs() {
      const query = searchInput.value.toLowerCase();
      chrome.tabs.query({}, function (tabs) {
        const filteredTabs = tabs.filter(tab => tab.title.toLowerCase().includes(query));
        if (filteredTabs.length > 0) {
          displayTabs(filteredTabs);
        } else {
          tabList.innerHTML = "<li>Sorry, you do not have that tab open.</li>";
        }
      });
    }
  
    searchInput.addEventListener("input", searchTabs);
  });
  