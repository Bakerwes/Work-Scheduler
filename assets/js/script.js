$(function () {

    // Function to show the current day and current time
    function updateTime() {
      $("#currentDay").text(dayjs().format("dddd, MMMM D, h:mm A"));
    }
    // Displays the current day and current time at the top of the page
    updateTime();
  
    // Sets interval to update the current time every minute
    setInterval(updateTime, 60000);
  
    // Function to compare time and set appropriate class for each time block
    function updateTimeBlocks() {
      var currentHour = dayjs().hour();
      $(".time-block").each(function () {
        var hour = parseInt($(this).attr("id").split("-")[1]);
        if (hour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (hour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    // Calls the updateHourBlocks function to set classes on initial load
    updateTimeBlocks();
  
    // Sets the interval to call updateHourBlocks function every 15 minutes
    setInterval(updateTimeBlocks, 900000);
    // By updating the classes every 15 minutes, the user will see more accurate 
    // color coding of the time blocks, which will help them manage their schedule 
    // more effectively. The updates are frequent enough to be useful but not too 
    // frequent to cause unnecessary page refreshes.
  
    // Loads saved events from local storage
    $(".description").each(function () {
      var id = $(this).parent().attr("id");
      $(this).val(localStorage.getItem(id));
    });
  
    // Saves the user input to local storage when save button is clicked
    $(".saveBtn").on("click", function () {
      var id = $(this).parent().attr("id");
      var event = $(this).siblings(".description").val().trim();
      localStorage.setItem(id, event);
    });
  
    // Adds a "Start New Day" button below the updateTime function
    $("<button>")
      .attr("id", "startNewDay")
      .text("Start New Day")
      .insertAfter("#currentDay");
  
    // Clears all user input and local storage when the "Start New Day" button is clicked
    $("#startNewDay").on("click", function () {
      $(".description").val("");
      localStorage.clear();
    });
  });