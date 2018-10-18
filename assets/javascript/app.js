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

  //fires when the submit button is clicked to add train
$("#add-train-button").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
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
  
  



function GetClock(){
var d=new Date();
var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;

var clocktext=""+nhour+":"+nmin+":"+nsec+ap+"";
document.getElementById('clockbox').innerHTML=clocktext;
}

GetClock();
setInterval(GetClock,1000);
  
  
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());
      
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().role;
      var trainStart = childSnapshot.val().start;
      var trainRate = childSnapshot.val().rate;

    console.log(trainStart)
      
      var now = moment()
      console.log(now)

      var trainTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
      console.log(trainTimeConverted);
  
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      // Difference between the times
      var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
  
      // Time apart (remainder)
      var tRemainder = diffTime % trainRate;
      console.log(tRemainder);
  
      // Minute Until Train
      var minAway = trainRate - tRemainder;
      console.log("MINUTES TILL TRAIN: " + minAway);
  
      // Next Train
      var nextTrain = moment().add(minAway, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


      // Prettify the employee start
      var displayTrainStart = moment.unix(trainStart).format("hh:mm a");
      
      
      // Create the new row
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destination),
          $("<td>").text(displayTrainStart),
          $("<td>").text(trainRate + " mins"),
          $("<td>").text(minAway + " mins"),
          );
          
          // Append the new row to the table
          $("#employee-table > tbody").append(newRow);
  });