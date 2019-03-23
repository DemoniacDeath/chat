package me.demoniacdeath.springdemo.chat

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import org.webjars.RequireJS

@RestController
class WebJarsLocator {
    @ResponseBody
    @RequestMapping(value = ["/webjars/config"], produces = ["application/javascript"])
    fun webJarsJs(): String = RequireJS.getSetupJavaScript("/webjars/")
}