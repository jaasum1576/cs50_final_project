# Chrome Extension - Task Manager & Tab Organizer
#### Video Demo: https://youtu.be/RwOVXbkGdPA <URL HERE>

## Introduction
This Chrome Extension is a flexible productivity tool made to assist users in task management, maintaining attention with a Pomodoro Timer, and effectively managing open tabs. The extension seeks to preserve an aesthetically beautiful design while offering a seamless and easy user experience.

## Features

### Manager of tasks and to-do lists:

By typing in the input area and pressing Enter or the "Add" button, users can add jobs to the list.
There is a checkbox next to each job item in the list that can be used to designate a task as finished, which results in a line-through effect.
By selecting the red cross icon next to each task, users can eliminate that particular work.
When all chores are finished, a "Congratulations! The phrase "All tasks finished!" flashes briefly at the top of the extension.

### Pomodoro Timer

Using the input area, users can specify the task length in minutes.
The timer countdown and remaining time are shown after clicking the "Start" button.
The user can specify the break duration using the input field once the work duration has expired and the "Take a break!" message has been displayed.
A "Time to start working again!" notification comes when the break period is up.

### Tab Management

By selecting the "View All Tabs" button, users can see every open tab on their computer.
Users can utilise the search input field to look up individual tabs in a list of open tabs.
A tab's text colour changes when it is hovered over, serving as a subtle yet sophisticated visual indication.

## File Description

### index.html
The primary popup interface for the Chrome Extension is this HTML file. When the extension icon is clicked, a popup window defining the extension's structure will display. The file contains a number of components that let users interact with the functionality of the extension, such as buttons, input fields, and tab lists. HTML elements and CSS classes are used to establish the popup interface's layout and style.

### popup.js
The functionality of the extension's popup interface is implemented in the JavaScript file popup.js. It manages how the user and the features of the extension interact.

#### main functions in this file
*addtask():* When a user selects the "Add Task" button or pushes the Enter key in the task input box, this function is in charge of adding the selected tasks to the task list. It adds the task as a new list item ( ) to the list of tasks. The task item has a checkbox for marking completed tasks and a delete button for eliminating chores. Tasks that have been completed have a line-through text decoration.

*checkCompletedTasks():* This function determines whether every item on the task list has been finished. It contrasts the overall number of tasks with the number of tasks that have been completed, as shown by the checked checkboxes. When all chores are finished, the "Congratulations! Using the showCongratulations() function, the extension's header displays the message "All tasks completed! ".

*showCongratulations():* Congratulations! message is created and shown by this function. When all jobs are marked as finished, a "All tasks completed!" notice appears. The message is added as a child of the body> element and has a style CSS class. The message is deleted from the DOM using setTimeout() after a brief interval.

*startTimer():* The Pomodoro Timer functionality is handled by this function. Based on the user-provided work duration (in minutes), it begins the work timer. The timerDisplay shows the amount of time left as it ticks down in seconds. The startBreakTimer() method is activated when the work timer expires.

*startBreakTimer():* Based on the break period the user has specified (in minutes), this function begins the break timer. The timerDisplay shows a "Take a break!" message while it counts down the remaining seconds. When the break timer expires, it runs startTimer() to restart the work timer and shows the message "Time to start working again!"

*displayTabs(tabs):* This function displays an array of tab objects in the tab list from an argument of tab objects. For each tab, it generates a list item (li>) and adds it to the tab list. The text content of the list item is shown as the tab title. This function also includes event listeners for hover and tab clicking effects.

*searchTabs():* The user's search phrase is used to filter the tabs in this function. It searches through all open tabs and filters them depending on whether they include the search term in their titles. It calls displayTabs(filteredTabs) to display the filtered results in the tab list if there are any matching tabs. If no matches are found, it says "Sorry, you do not have that tab open."

### styles.css
styles in the CSS file.The popup interface of the Chrome Extension is styled using CSS. It contains many CSS classes and rules that specify the extension's visual style and layout. 

The following topics are covered in the file:

1. The layout, font sizes, and colours of the task list and its elements are determined by the CSS rules. The chores are displayed on a light turquoise backdrop, and the ones that have been finished have text decorations with a line through them.
2. Pomodoro Timer Styles: For improved visibility, the Pomodoro Timer is configured with larger fonts. The "Start" and "Stop" buttons on the timer controls are circular in shape, with a black background and white writing.
3. Styles for Tab Management: A horizontal line and padding are used to style the tab list. For an aesthetically pleasing appearance, the search input box is designed with a border and border-radius.

### manifest.json
Every Chrome Extension needs a manifest.json file, which is an essential component. It includes the configuration data and metadata needed for the extension to function properly. The file contains information about the extension, including its name, description, version, icons, permissions (such as the ability to access tabs), and the location of the index HTML file. The background script file, which is crucial for managing the extension's background operations, is also defined.

### background.js
The JavaScript code for the background script, which functions separately from the popup and content scripts, is located in the background.js file. Tasks that do not require direct user contact can be carried out via background scripts. It may be used to manage data and state for the extension, handle API calls, or listen for events and reply to them. Since a background script is not specifically required for this extension, it might not be added or left empty. If this background script is needed, it would be specified in the manifest.json file.

# Conclusion
The purpose of the Chrome Extension is to help users increase productivity and keep their workspaces organised. Users can maintain attention, handle work effectively, and organise their open tabs with the help of its Task and Todo List Manager, Pomodoro Timer, and Tab Management capabilities.
