$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    
    var image = message.image.url? `<img src= ${message.image.url} , size: "200x200">`: "";
    

    var html = `<div class="message" data-message-id="${message.id}">
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

        $("form")[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $(".form__submit").prop("disabled", false);
      })
      .fail(function(){
        alert('error');
      })
    })

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
          url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'GET',
          dataType: 'json',
        //dataオプションでリクエストに値を含める
          data: {last_id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          console.log(messages);
          if(messages[0]){
            console.log(messages)
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML); 
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }) 
        }
        })
        .fail(function () {
          alert('自動更新に失敗しました');//ダメだったらアラートを出す
        });
      };
    };
    setInterval(reloadMessages, 5000);
 
  });
