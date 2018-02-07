var config = {
  apiKey: "AIzaSyAt86Bgi5iQ9nOkZC24X_KpKgGfvTjad4Y",
  authDomain: "traintime-efbc8.firebaseapp.com",
  databaseURL: "https://traintime-efbc8.firebaseio.com",
  projectId: "traintime-efbc8",
  storageBucket: "traintime-efbc8.appspot.com",
  messagingSenderId: "273365151017"
};
firebase.initializeApp(config);


var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
  var frequency = $("#frequencyInput").val().trim();

  var newTrain ={
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  trainData.ref().push(newTrain);

  alert("Train Added!");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;

})

trainData.ref().on("child_added",function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</tr></td>");
})
