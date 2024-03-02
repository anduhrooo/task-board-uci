// // Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = $("#task-modal")

//loads from local storage
loadFromLocalStorage()


// when add task is clicked, function runs
function handleAddTask(event){
    // prevents default action of button
    event.preventDefault();
    // takes in values from form inputs
    const taskName = $("#title").val()
    const taskDate = $("#dueDate").val()
    const taskDescription =$("#description").val()

    const newCard = $("<div class='card'>" + taskName + "<br>" + taskDate + "<br>" + taskDescription + "<span class='deleteTask'>X</span></div>"); 
saveToLocalStorage()
    newCard.draggable({
        revert: "invalid",
        cursor: "move"
    });
    // places item on top of lane classes
    newCard.css("z-index", "10")
    
    // changes the color of the card based on when it is
    const today = dayjs();
    const taskDueDate = dayjs(taskDate, "DD/MM/YYYY")
    if (today.isSame(taskDueDate, "day")) {
        newCard.addClass("bg-warning text-white");
      } else if (today.isAfter(taskDueDate)) {
        newCard.addClass("bg-danger text-white");}
    

    $("#to-do").append(newCard)
    // saves card to local storage
    

    // clears form
    $("#title").val("")
    $("#dueDate").val("")
    $("#description").val("")

}
//sets lanes to droppable
$(".droppable").droppable({
    accept: ".card",
});



function saveToLocalStorage() {
    const cards = $(".card").map(function() {
        return $(this).prop('outerHTML');
    }).get();
    localStorage.setItem("toDoList", JSON.stringify(cards));
}

function loadFromLocalStorage() {
    const cards = JSON.parse(localStorage.getItem("toDoList")) || [];
    cards.forEach(function(cardHTML) {
        var card = $(cardHTML);
        card.draggable({
            revert: "invalid",
            cursor: "move"
        });
        $("#" + card.data("section")).append(card);
    });
}




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
    saveToLocalStorage();
   })

//    makes each section
   $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
});

