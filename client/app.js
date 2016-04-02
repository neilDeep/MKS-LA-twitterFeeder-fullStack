var app = {

  init: function(){
    $('#send').on('submit', function(e){
   e.preventDefault();
   var username = $('#username').val();
   console.log("Within displayMessages, data: ",username);
   app.send(username);
  });
  },
  send: function(data){
   console.log('Inside app.send');
   $.ajax({
     url: 'http://127.0.0.1:3000/',
     type: 'POST',
     data: JSON.stringify(data),
     success: function(data){ // from server.js 35
       app.displayTweets(JSON.parse(data));
       console.log("Recieved ",JSON.parse(data)," from Server");
     },
     error: function(data){
       console.log("Error in Sending "+ data);
     }
   });
  },
  displayTweets: function(data){

   for(var i =0; i<25; i++) {
        $('#tweets').append(data.statuses[i].text);
       }
  },
  // Wasn't working with the handleSubmit reference...
  // So I brought the code ^ to app.init.
  // handleSubmit: function(e){
  //  e.preventDefault();
  //  var username = $('#username').val();
  //  console.log("Within displayMessages, data: ",username);
  //  app.send(username);
  // }

};