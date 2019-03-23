package me.demoniacdeath.springdemo.chat

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler

val logger: Logger = LoggerFactory.getLogger(ConnectionHandler::class.java)

@Component
class ConnectionHandler: TextWebSocketHandler() {

    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        logger.info("Message received! ({}, {})", message.payload, session.id)
        session.sendMessage(TextMessage(message.payload))
    }
}