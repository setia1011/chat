/* eslint-disable no-undef */
/**
 * For more information about the protocol you can read to protocol information
 * document at our wiki.
 *
 * @see {@link https://github.com/johnnymast/mysql_websocket_chat/wiki/Protocol|GitHub}
 */

const RECONNECT_IN_SEC = 10
const ws = {
  /**
   * Start the connection
   * @type {WebSocket}
   */
  conn: null
}

/**
 * Handle automatically reconnecting to a websocket server
 * if the connection was interrupted.
 *
 * @param {function} callback - The callback called upon reconnection
 */
WebSocket.prototype.reconnect = (callback) => {
  if (this.readyState === WebSocket.OPEN || this.readyState !== WebSocket.CONNECTING) {
    this.close()
  }

  let seconds = RECONNECT_IN_SEC
  const container = dom('.connection_alert .error_reconnect_countdown')
  const countHandle = setInterval(() => {
    if (--seconds <= 0) {
      clearInterval(countHandle)
      callback()
      return
    }
    container.text(seconds.toString())
  }, 1000)
}

/**
 * Connect to the websocket server.
 */
const connect = () => {
  if (ws.conn) {
    if (ws.conn.readyState === WebSocket.OPEN || ws.conn.readyState === WebSocket.CONNECTING) {
      ws.conn.close()
    }
    delete ws.conn
  }

  ws.conn = new WebSocket('ws://' + socketHost + ':' + socketPort)

  /**
   * Connection has been established
   *
   * @param {Event} event - The onopen event.
   */
  ws.conn.onopen = (event) => {
    dom('.client_chat').removeAttr('disabled')
    dom('.connection_alert').hide();

    /**
     * Register te client to the
     * server. This allows the server
     * to return a list of chat clients
     * to list on the side.
     */
    registerClient()

    /**
     * Request the user list from
     * the server. If the server replies the user list
     * will be populated.
     */
    requestUserlist()
  }

  /**
   * A new message (read package) has been received.
   *
   * @param {Event} event - The onmessage event.
   */
  ws.conn.onmessage = (event) => {
    const pkg = JSON.parse(event.data)

    if (pkg.type === 'message') {
      dialogOutput(pkg)
    } else if (pkg.type === 'userlist') {
      usersOutput(pkg.users)
    } else if (pkg.type === 'typing') {
      typingOutput(pkg)
    }
  }

  /**
   * Notify the user that the connection is closed
   * and disable the chat bar.
   *
   * @param {Event} event - The onclose event.
   */
  ws.conn.onclose = (event) => {
    console.log('Connection closed!')

    dom('.client_chat').prop('disabled', true)
    dom('.connection_alert').show()
    // clearUserlist();
    clearUserlistx();

    if (event.target.readyState === WebSocket.CLOSING || event.target.readyState === WebSocket.CLOSED) {
      event.target.reconnect(connect)
    }
  }

  /**
   * Display a message in the terminal if
   * we run into an error.
   *
   * @param {Event} event - The error event.
   */
  ws.conn.onerror = (event) => {
    console.log('We have received an error!', event)
  }
}

/**
 * Remove all users from the users on the
 * side of the screen.
 */
// clearUserlist = () => {
//   /**
//    * First of all clear the current userlist
//    */
//   while (userList.firstChild) {
//     userList.removeChild(userList.firstChild)
//   }
// }

clearUserlistx = () => {
  /**
   * First of all clear the current userlist
   */
  while (userListx.firstChild) {
    userListx.removeChild(userListx.firstChild)
  }
}

/**
 * Put a package (message) on the screen
 * for you or others to read.
 *
 * @param {object} pkg - The package object to display.
 */
dialogOutput = (pkg) => {
  if (pkg.to_user) {
    if (pkg.to_user.id === chat_user.id) {
      // dom('.chat_dialog').append('<b class="priv_msg">(Private from &lt;&lt; ' + pkg.user.username + '</b>)  ' + pkg.message + '<br/>')
      dom('.chat_dialog').append('<div class="chat is-me"><div class="chat-content"><div class="chat-bubbles"><div class="chat-bubble"><div class="chat-msg">'+pkg.message+'</div></div></div><ul class="chat-meta"><li>'+pkg.user.username+'</li><li>29 Apr, 2020 4:28 PM</li></ul></div></div>');
    } else {
      // dom('.chat_dialog').append('<b class="priv_msg">(Private to &gt;&gt; ' + pkg.to_user.username + '</b>): ' + pkg.message + '<br/>');
      dom('.chat_dialog').append('<div class="chat is-you"><div class="chat-content"><div class="chat-bubbles"><div class="chat-bubble"><div class="chat-msg">'+pkg.message+'</div></div></div><ul class="chat-meta"><li>'+pkg.user.username+'</li><li>29 Apr, 2020 4:28 PM</li></ul></div></div>');
    }
  } else {
    dom('.chat_dialog').append('<div class="chat is-me"><div class="chat-content"><div class="chat-bubbles"><div class="chat-bubble"><div class="chat-msg">'+pkg.message+'</div></div></div><ul class="chat-meta"><li>'+pkg.user.username+'</li><li>29 Apr, 2020 4:28 PM</li></ul></div></div>');
  }
}

/**
 * Update the user list in the UI
 *
 * @param {array} users - Array of uses to display in the chatroom.
 */
usersOutput = (users) => {
  /**
   * First get the current select value
   * on the list. This is so we can restore
   * the selected list item after requesting
   * fow new users.
   */
  // const selectedUser = userList.value
  const selectedUserx = userListx;
  // console.log(selectedUserx);

  /**
   * Before we start adding users
   * to the userlist make sure we erase
   * all the old users of the screen.
   */
  // clearUserlist();
  clearUserlistx();

  for (const index in users) {
    if (typeof users[index] !== 'undefined') {
      const user = users[index]
      // const elm = document.createElement('OPTION');

      // elm.value = user.id
      // elm.appendChild(document.createTextNode(user.username))

      // if (elm.value === chat_user.id) {
      //   elm.classList = ['client_user_you']
      //   elm.disabled = 'disabled'
      // }

      // if (selectedUser.length > 0 && elm.value === selectedUser) {
      //   elm.selected = 'selected'
      // }

      // userList.appendChild(elm);
      let tox = localStorage.getItem("to");
      

      // extended
      const elmUserList = ""+
      "<div class='chat-link chat-open'>" +
          "<div class='chat-media user-avatar avatar-color'>" +
              "<span><em class='icon ni ni-user-circle'></em></span>" +
          "</div>" +
          "<div class='chat-info'>" +
              "<div class='chat-from'>" +
                  "<div class='name'>"+user.username+"</div>" +
                  "<span class='time'>4:49 AM</span>" +
              "</div>" +
              "<div class='chat-context'>" +
                  "<div class='text'>" +
                      "<p>Client</p>" +
                  "</div>" +
                  "<div class='status unread'>" +
                      "<em class='icon ni ni-bullet-fill'></em>" +
                  "</div>" +
              "</div>" +
          "</div>" +
      "</div>";
      const elmx = document.createElement('li');
      
      
      
      elmx.setAttribute('id', user.id);
      elmx.setAttribute("username", user.username);
      elmx.classList.add('chat-item', 'is-unread');

      if (tox === elmx.getAttribute('id')) {
        console.log(tox);
        elmx.classList.add('chat-item', 'is-unread', 'current');
      }

      elmx.innerHTML = elmUserList;
      // elmx.appendChild(document.createTextNode(user.username));
      // if (elmx.getAttribute('id') === chat_user.id) {
      //   elmx.classList = ['client_user_you']
      //   elmx.disabled = 'disabled'
      // }

      // if (selectedUserx.length > 0 && elmx.value === selectedUserx) {
      //   elmx.selected = 'selected'
      // }

      
      if (elmx.getAttribute('id') !== chat_user.id) {
        // elmx.classList = ['client_user_you']
        // elmx.disabled = 'disabled'
        userListx.appendChild(elmx);
      }
      
    }
  }
}

/**
 * Display a message on the screen indicating some is typing a message.
 *
 * @param {object} pkg - The received package from the server
 */
typingOutput = (pkg) => {
  if (typeof pkg === 'object') {
    const user = pkg.user
    const isTyping = pkg.value

    const indicator = dom('.typing_indicator').get()
    const typingMessage = dom(`.typing_indicator li[data-userid="${user.id}"]`).get()

    if (typingMessage) {
      typingMessage.parentNode.removeChild(typingMessage)
    }

    if (isTyping) {
      const msg = `${user.username} is typing a message`
      const li = document.createElement('LI')
      li.dataset.userid = user.id
      li.innerText = msg

      indicator.appendChild(li)
    }
  }
}

/**
 * We need to register this browser window (client)
 * to the server. We do this so we can sent private
 * messages to other users.
 */
registerClient = () => {
  /**
   * Create a registration package to send to the
   * server.
   */
  let pkg = {
    user: chat_user, /* Defined in index.php */
    type: 'registration'
  }

  pkg = JSON.stringify(pkg)

  /**
   * Send the package to the server
   */
  if (ws.conn && ws.conn.readyState === WebSocket.OPEN) {
    ws.conn.send(pkg)
  }
}

/**
 * Request a list of current active
 * chat users. We do this every x seconds
 * so we can update the ui.
 */
requestUserlist = () => {
  setInterval(() => {
    if (ws.conn.readyState !== WebSocket.CLOSING && ws.conn.readyState !== WebSocket.CLOSED) {
      /**
       * Create a package to request the list of users
       */
      let pkg = {
        user: chat_user, /* Defined in index.php */
        type: 'userlist'
      }

      /**
       * We need a object copy of package
       * to send to dialog_output() but we
       * also want to turn the original package
       * into a string so we can send it over the
       * socket to the server.
       *
       * @type {Object}
       */
      pkg = JSON.stringify(pkg)
      if (ws.conn && ws.conn.readyState === WebSocket.OPEN) {
        ws.conn.send(pkg)
      }
    }
  }, 2000)
}

/**
 * Register user is typing yes or no.
 *
 * @param {boolean} currently - Is this user currently typing?
 */
registerTyping = (currently) => {
  /**
   * Create a package to send to the
   * server.
   */
  let pkg = {
    user: chat_user, /* Defined in index.php */
    type: 'typing',
    value: currently || false
  }

  pkg = JSON.stringify(pkg)

  /**
   * Send the package to the server
   */
  if (ws.conn && ws.conn.readyState === WebSocket.OPEN) {
    ws.conn.send(pkg)
  }
}

/**
 * Send a chat message to the server
 */
sendMessage = () => {
  /**
   * Catch the chat text
   *
   * @type {string}
   */
  const chatMessage = dom('.client_chat').val()

  if (typeof chatMessage === 'undefined' || chatMessage.length === 0) {
    dom('.client_chat ').addClass('error')
    setTimeout(() => {
      dom('.client_chat ').removeClass('error')
    }, 500)
  }

  registerTyping(false)

  /**
   * When to_user is empty the
   * message will be sent to all users
   * in the chat room.
   *
   * @type {Object}
   */
  let toUser = null

  /**
   *  If a user is selected in the
   *  userlist this will mean send messages
   *  to that user.
   */
  // if (userList.value) {
  //   toUser = {
  //     id: userList.value,
  //     username: userList.options[userList.selectedIndex].text
  //   }
  // }

  let tox = localStorage.getItem("to");
  let usernamex = localStorage.getItem("username");
  if (tox !== null) {
    toUser = {
      id: tox,
      username: usernamex
    }
  }

  /**
   * Create a package to send to the
   * server.
   */
  let pkg = {
    user: chat_user, /* Defined in index.php */
    message: chatMessage,
    to_user: toUser,
    type: 'message'
  }

  console.log(pkg);
  /**
   * We need a object copy of package
   * to send to dialog_output() but we
   * also want to turn the original package
   * into a string so we can send it over the
   * socket to the server.
   *
   * @type {Object}
   */
  const pkgObject = pkg
  pkg = JSON.stringify(pkg)

  /**
   * Send the package to the server
   */
  if (ws.conn && ws.conn.readyState === WebSocket.OPEN) {
    ws.conn.send(pkg);
    // console.log(ws.conn.send(pkg));
  }

  /**
   * Display the message we just wrote
   * to the screen.
   */
  dialogOutput(pkgObject)

  /**
   * Empty the chat input bar
   * we don't need it anymore.
   */
  dom('.client_chat').val('')
}

// const userList = dom('.user_list').get();
const userListx = dom('.user-list-x').get();
// console.log(userListx);

document.addEventListener('DOMContentLoaded', connect)
/* eslint-enable no-undef */
