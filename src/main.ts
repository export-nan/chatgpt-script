#!/usr/bin/env node

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { ChatGPTAPI, SendMessageOptions} from 'chatgpt'
import * as dotenv from 'dotenv'
import * as fs from 'node:fs';
import * as path from 'node:path';
dotenv.config()

const CONFIG_PATH = '../config.json'

const rl = readline.createInterface({ input, output });

async function chat(chatgpt: ChatGPTAPI, opt?:SendMessageOptions) {

    const answer = await rl.question('>|:');

    const res = await chatgpt.sendMessage(answer, opt)

    console.log("AI: " + res.text);

    opt = {
        ...opt,
        conversationId: res.conversationId,
        parentMessageId: res.id
    }

    chat(chatgpt,opt)
}

(()=>{
    const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, CONFIG_PATH),'utf-8'))
    const apiKey = config.OPENAI_API_KEY
    if(apiKey === undefined){
        throw new Error('环境变量的 OPENAI_API_KEY 未设置')
    }
    const chatgpt = new ChatGPTAPI({
        apiKey
    })
    chat(chatgpt)
})()


