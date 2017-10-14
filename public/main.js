$(function() {

  let $body = $('body');
  let $uiTargets = $('#ui-targets');
  let $dataDisplay = $('#data-display');

  let sharedData = "";

  let target = $('<form>message:<br><input type="text" name="message"><input type="submit" value="Submit"></form>');

  target.submit(function( event ) {
    event.preventDefault();
    sharedData = target.find('input[name="message"]').val();
    updateData(sharedData);
  });

  $body.add(target);
  $uiTargets.append(target);

  var socket = io();

  console.log(socket);

  let myClientIndex;

  socket.on('connection', function (clientIndex) {
    myClientIndex = clientIndex;
    console.log('you are connected, client ',clientIndex);
  });

  socket.on('new data', function (data) {
    $dataDisplay.html(data);
  });

  socket.on('disconnect', function () {
    socket.emit('disconnect');
  });

  function updateData (data) {
    socket.emit('client action', data);
  }

});
