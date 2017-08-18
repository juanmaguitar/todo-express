$(document).ready(function() {

  var $alert = $('.alert');
  $alert.hide();

  $alert.on('error', function(event, data){
    $alert.html(data)
    $alert.addClass('alert-danger');
    $alert.show();
  });

  $alert.on('success', function(event, data) {
    $alert.html(data);
    $alert.addClass('alert-info');
    $alert.show();
  })

  $('form[method="put"]').submit(function(event) {
    event.preventDefault();

    console.log(this.action);
    $.ajax({
      url: this.action,
      type: 'PUT',
      data: { _id: this.elements[0].value },
      success: function(response) {
        console.log(response)
        location.href = "/tasks"

      },
      error: function(error) {
        $alert.trigger('error', error);
      }
    })

  });

  $('.task-delete').click(function(event) {
    $target = $(event.target)
    $.ajax({
      type: 'DELETE',
      url: '/task/' + $target.attr('data-task-id'),
      success: function(response) {
        location.href = location.href
      },
      error: function(error) {
        $alert.trigger('error', error);
      }
    })
  });

})