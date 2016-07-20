require "kemal"
require "pg"
require "./app/message"

conn = PG.connect "postgres://user:password@localhost:5432/db_name"

sockets = [] of HTTP::WebSocket

public_folder "src/assets"

get "/" do
  render "src/views/index.ecr"
end

ws "/" do |socket|
  sockets.push socket

  # Dispatch list of messages to the current socket
  socket.send Message.all(conn).to_json

  # Handle incoming message and dispatch it to all connected clients
  socket.on_message do |message|
    # Insert message into the Database
    Message.from_json(message).insert(conn)

    # Dispatch list of messages to all connected clients
    sockets.each do |a_socket|
      begin
        a_socket.send Message.all(conn).to_json
      rescue
        sockets.delete(a_socket)
        puts "Closing Socket: #{socket}"
      end
    end
  end

  # Handle disconnection and clean sockets
  socket.on_close do |_|
    sockets.delete(socket)
    puts "Closing Socket: #{socket}"
  end
end

Kemal.run
