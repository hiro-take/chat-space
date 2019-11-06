
# json.content @message.content
# json.image @message.image.url

# json.user_name @message.user.name
# json.created_at  @message.created_at

json.(@message, :content, :image)
json.created_at @message.created_at
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id