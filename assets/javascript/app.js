  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBamIdiwSRdCZDOI0AvWWOkWexahejy04E",
    authDomain: "traindatabasev1.firebaseapp.com",
    databaseURL: "https://traindatabasev1.firebaseio.com",
    projectId: "traindatabasev1",
    storageBucket: "",
    messagingSenderId: "834299824713"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-button").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "hh:mm").format("X");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      role: destination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);

    // alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(trainStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * trainRate;
    // console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(trainRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });