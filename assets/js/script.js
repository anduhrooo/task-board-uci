// // Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = $("#task-modal")


// // Todo: create a function to create a task card
function createTaskCard(task) {  
    const taskCard = $(`<div>`)
    const cardTitle = $('<h4>')
    cardTitle.text(project.name)
    const cardDueDate = $(`<p>`)
    cardDueDate.text(project.date)
    const cardDescription = $(`<p>`)
    cardDescription.text(project.description)
    const cardBody = $(`<div>`)
    const cardDelete = $(`<button>`)
    cardDelete.text("Delete")

    taskCard.append(cardTitle, cardDueDate, cardDescription, cardDelete);
    console.log(createTaskCard)
}


// when add task is clicked, function runs
function handleAddTask(event){
    // prevents default action of button
    event.preventDefault();
    // takes in values from form inputs
    const taskName = $("#title").val()
    const taskDate = $("#dueDate").val()
    const taskDescription =$("#description").val()

    const newCard = $("<div class='card'>" + taskName + "<br>" + taskDate + "<br>" + taskDescription + "<span class='deleteTask'>X</span></div>"); 

    newCard.draggable({
        revert: "invalid",
        cursor: "move"
    });

    $("#to-do").append(newCard)

    // clears form
    $("#title").val("")
    $("#dueDate").val("")
    $("#description").val("")

}

$(".droppable").droppable({
    accept: ".card",
});


// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
//    opens modal
    $("#createTask").click(function(){
    modal.show();
   })

//    closes modal
   $(".btn-close").click(function(){
    modal.hide();
   })

// add event listener for modal when adding a task
   $("#task-form").on("submit", handleAddTask)

//    add event listener to delete card
   $(".card").on("click", ".deleteTask", function(){
    $(this).parent().remove();
   })
});

