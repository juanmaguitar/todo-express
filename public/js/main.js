$('.remove').on('click', function(e) {
  const idTask = $(this).siblings('input[type="hidden"]').val()
  const url = `/task/${idTask}`
  const method = 'DELETE'

  $.ajax({
      url,
      method
    })
    .then(() => {
      $(this).parent('.task-row').remove()
    })

})