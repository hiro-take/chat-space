class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:last_id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
    respond_to do |format| 
      format.html 
      format.json
  end
end
end