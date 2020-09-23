import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import io from 'socket.io-client'
import Header from './Header/Header'
import TopicInfo from './TopicInfo/TopicInfo'
import Messages from './Messages/Messages'
import Input from './Input/Input'
let socket
const ENDPOINT = 'localhost:5000'
const Topic = props => {
    const [valid, SetValid] = useState(true)
    const [disp, setDisp] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        fetch('https://localhost:5000', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                data.user !== 'authenticated' ? SetValid(false) : setDisp(true)
            })
    }, [])

    useEffect(() => {
        if (disp === true) {
            const data = props.location.state.data
            socket = io(ENDPOINT)
            socket.emit('join', data, (error) => {})
            return () => {
                // alert('you will be disconnected!!')
                socket.disconnect()
                socket.off()
            }
        }
    }, [disp, props.location.state.data])

    useEffect(() => {
        if (disp) {
            socket.on('message', msg => {
                setMessages([...messages, msg])
            })
        }
    }, [disp, messages])

    const sendMessage = e => {
        e.preventDefault()
        console.log(message)
        if (message) {
            socket.emit('sendmessage', message, () => setMessage(''))
        }
    }
    return (
        <React.Fragment>
            {valid === false ? <Redirect to={{ pathname: '/' }} /> : disp &&
                <>
                    <Header />
                    <TopicInfo
                        heading={props.location.state.data.heading}
                        description={props.location.state.data.description}
                        admin={props.location.state.data.CreatedBy}
                        Members={props.location.state.data.Members}
                        Viewers={props.location.state.data.Viewers}
                        timeremf={props.location.state.data.timerem}
                    />
                    <Messages messages={messages} name={props.location.state.data.CreatedBy}/>
                    <Input  message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </>
            }
        </React.Fragment>
    )
}

export default Topic