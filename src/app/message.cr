class Message
  JSON.mapping(
    id: {type: Int64, nilable: true},
    created_at: {type: String, nilable: true},
    updated_at: {type: String, nilable: true},
    username: String,
    message: String
  )

  def self.all(conn)
    self.transform_messages(conn.exec(%{
      SELECT
      id, username, message,
      to_char(created_at, 'HH24:MI AM') as created_at,
      to_char(updated_at, 'HH24:MI AM') as updated_at
      FROM messages
      ORDER BY id;
    }))
  end

  def insert(conn)
    conn.exec(%{
      INSERT INTO messages (username, message, created_at, updated_at)
      VALUES ($1, $2, current_timestamp, current_timestamp)
    }, [self.username, self.message])
  end

  def self.transform_messages(messages_table)
    messages_table.to_hash.map do |message|
      {
        id:         message["id"].as(Int),
        username:   message["username"].as(String),
        message:    message["message"].as(String),
        created_at: message["created_at"].as(String),
        updated_at: message["updated_at"].as(String),
      }
    end
  end
end
