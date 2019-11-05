$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    
    var image = message.image ? `<img src= ${message.image} , size: "200x200">`: "";
    

    var html = `<div class="message">
          <div class="message__upper-info">
            <p class="message__upper-info__talker">
            ${message.user_name}
            </p>
            <p class="message__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class="message__text">
              ${message.content}
          </div>
          <div class="message__text">
              ${image}
          </div>
        </div>`
    return html;
  }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
 
      var formData = new FormData(this);
      var url = $(this).attr('create');
      $.ajax({
        url: url, 
        type: 'POST',  
        data: formData,  
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        // $('#message_content').val('');
        $("form")[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $(".form__submit").prop("disabled", false);
      })
      .fail(function(){
        alert('error');
      })
    })
  })

