# Kanban Task Board

this is my sprint 5 deliverable for prodesk IT internship called Kanban Task Board i built it using react js vite and vanilla css


## what this project does

its a trello-style task management kanban board where you can organize tasks across three columns to do in progress and done you can add new tasks with priority high medium low move tasks across columns with action buttons or physical drag and drop edit task titles inline and filter tasks in real time with search and priority dropdown all tasks persist across page refreshes using browser localstorage


## what i used

react js 19 for component architecture state management and prop drilling
vite for build tool and local dev server
vanilla css for custom dark slate theme and priority styling
html5 drag and drop api for smooth physical dragging between columns
localstorage for persisting tasks across hard reloads


## features i added

three column layout with to do in progress and done columns
add task form with text input and priority selector
universal delete button on each task card
move action buttons on each card to transition between columns
inline editing toggle where double clicking task title opens editable input
priority system with conditional border colors red for high yellow for medium green for low
priority badge tag on top of each card
localstorage integration to persist board state across page refreshes
default sample tasks loaded when localstorage is empty
native html5 drag and drop between columns with visual drag over highlight
real time search input to filter tasks by title
priority filter dropdown to view all high medium or low tasks
clear filters button when search or priority is active
reset demo data button to restore original sample tasks
header stats counters showing total to do in progress and done counts
fully responsive layout that stacks cleanly on mobile screens


## component structure

App jsx is the parent component holding main tasks state and localstorage sync
TaskForm jsx captures new task title and priority and sends it up to App
TaskFilters jsx handles search query priority filter and reset button
Column jsx manages column dropzone task count and renders card list
TaskCard jsx handles draggable card inline editing priority borders and move delete buttons


## how to run

1 clone the repo and open folder
2 run npm install
3 run npm run dev
4 open the localhost link in browser
5 run npm run build to create production bundle

## Video



https://drive.google.com/file/d/1iV0rjLN0yfzSRR-eCo8vy810_HmLenRj/view?usp=sharing
