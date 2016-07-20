class Chat extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.sendMessageWithEnter = this.sendMessageWithEnter.bind(this)
  }

  componentDidMount () {

    const self = this
    const random = (min, max) => Math.floor(Math.random()*(max-min+1)+min)
    const server = new WebSocket(`ws://${location.hostname}:${location.port}`)
    const user = localStorage.getItem('user') || `${prompt("What is your name, sir?").replace(/\:|\@/g, "")}@${randomColor({luminosity: 'dark'})}@${random(1000, 2000)}`

    this.sendable = true
    localStorage.setItem('user', user)

    server.onmessage = event => {
      const messages = JSON.parse(event.data)

      self.setState({messages: messages})
      self.refs.message.focus()

      window.scrollTo(0, document.body.scrollHeight)
      new Beep(random(18000, 22050)).play(messages[messages.length - 1].username.split('@')[2], 0.05, [Beep.utils.amplify(8000)]);
    }

    server.onopen = () => {
      const payload = 
        JSON.stringify({username: user, message: "joined the room."})

      server.send(payload)
    }

    server.onclose = () => {
      const payload = 
        JSON.stringify({username: user, message: "left the room."})

      server.send(payload)
    }

    this.server = server
    this.user = user
    this.refs.message.focus()
  }

  sendMessage () {
    if (!this.sendable) {
      return false
    }
    const self = this
    setTimeout(function () {
      self.sendable = true;
    }, 100)

    const payload = 
      JSON.stringify({username: this.user, message: this.refs.message.value})

    this.server.send(payload)
    this.refs.message.value = ''
    this.sendable = false
  }

  sendMessageWithEnter (e) {
    if (e.keyCode == 13) {
     this.sendMessage();
    }
  }

  render () {
    const messages = this.state.messages.map( message => {
      const user = message.username.split("@")
      const color = user[1]
      const name = user[0]
      const $message = 
        <li>
          <span style={{color: color}}>{name}[{message.created_at}]:</span>
          <span>{message.message}</span>
        </li>

      return $message
    })

    const $chat = 
      <div>
        <ul>{messages}</ul>
        <input autofocus='true' placeholder='write your message!'
               type='text' ref='message' onKeyUp={this.sendMessageWithEnter}>
        </input>
      </div>

    return $chat
  }
}

ReactDOM.render(<Chat />, document.getElementById('chat'))
