package me.demoniacdeath.springdemo.chat

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import java.util.*
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

@Controller
class ChatMessageController(private val template: SimpMessagingTemplate) {

    @MessageMapping("/message-was-sent")
    @SendTo("/topic/chat")
    fun onSentMessage(message: Message): Message {
        if (message.body.startsWith("/handler ")) {
            val newUser = User(
                    message.fromUserId,
                    message.body.removePrefix("/handler ")
            )
            template.convertAndSend(
                    "/topic/user",
                    newUser
            )
            return Message(
                    "*Is now known as "+newUser.handler+"*",
                    message.timestamp,
                    message.fromUserId
            );
        }
        return message
    }

    @MessageMapping("/user-joined")
    @SendTo("/topic/chat")
    fun joinMessage(user: User): Message = Message(
            user.handler + " has joined the chat",
            Date().time,
            ""
    )

    @MessageMapping("/user-left")
    @SendTo("/topic/chat")
    fun leaveMessage(user: User): Message = Message(
            user.handler + " has left the chat",
            Date().time,
            ""
    )

    @MessageMapping("/send-user")
    @SendTo("/topic/user")
    fun sendUser(user: User): User {
        return user
    }

    @MessageMapping("/ping")
    @SendTo("/topic/ping")
    fun pingAll(): String = "ping"

}