import { Bot } from "grammy";

const bot = new Bot(process.env.token); 

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.start();
