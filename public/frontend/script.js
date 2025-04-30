const btn = document.querySelector('#emitter')
const connect = document.querySelector('#connect')

const inputLocalUserId = document.querySelector('#userId')
const inputReceiverUserId = document.querySelector('#receiverId')
const inputMessage = document.querySelector('#message')

let userId = null
let receiverId = null
let message = null
let socket = null
let socketConnected = null
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlZWQ0OTkzNC1jM2IzLTQ3ZTctYjQ1ZC0yM2RhODFkMGE5NmEiLCJlbWFpbCI6Im1ldUBnbWFpbC5jb20iLCJpYXQiOjE3NDU0MjQ4ODB9.NQ-8KzCMO0hfitNe4KxZ94dVQjJnco8hPBZ7jEB3FAk'

const socketConnect = () => {
    if (socketConnected) return
    if (!userId) return
    socket = io({ auth: { userId, token } })
    socketConnected = true
    socket.on('connect', () => console.log('Conectado!'))
    socket.on('connect_error', (msg) => {
        console.log('Erro ao conectar', msg)
        socketConnected = false
    })
    socket.on('disconnect', () => {
        console.log('Desconectado!')
        socketConnected = false
    })
    socket.on('message:received', (msg) => renderMessageOnDOM(msg.from, msg.message, msg.date))
}

const renderMessageOnDOM = (id, message, date) => {
    const container = document.querySelector('#messages')
    container.innerHTML += messageModel(id, message, date)
}

const messageModel = (id, message, date) => {
    return `
    <div
    style="background-color: grey; padding: 0.5rem; border-radius: 10px; margin-top: 1rem; display: flex; gap: 0.5rem;">
    <p>${id}</p>
    <p>${message}</p>
    <p>${date}</p>
    </div>
    `
}

btn.addEventListener('click', () => {
    if (!userId || !receiverId || !message) return
    socket.emit('message:sended', { senderId: userId, receivedId: receiverId, msg: message, date: Date.now() })
    console.log('Evento emitido')
}
)
inputLocalUserId.addEventListener('change', () => {
    userId = inputLocalUserId.value
}
)
inputReceiverUserId.addEventListener('change', () => {
    receiverId = inputReceiverUserId.value
}
)
inputMessage.addEventListener('change', () => {
    message = inputMessage.value
})
connect.addEventListener('click', socketConnect)