const { Bot, InlineKeyboard } = require("grammy");
const f = require('f-droid')

const bot = new Bot(process.env.TOKEN); 

bot.command("start", (ctx) =>{
    const keyboard = new InlineKeyboard().text('Help', 'help')                                                    
    ctx.reply("Hey! I m bot to search apk at f-droid.org. click help buton for more.", {reply_markup: keyboard })
})

bot.callbackQuery('help',(ctx)=>{                                                                                                  
    const keyboard = new InlineKeyboard().text('Back', 'back')                                                                            
    ctx.api.editMessageText(ctx.chat.id, ctx.msg.message_id, 'How to search apk?\n Just use command /se (apkname). bot just send title url description and license', {reply_markup: keyboard})
})

bot.callbackQuery("back", (ctx) =>{
    const keyboard = new InlineKeyboard().text('Help', 'help')                                                                                                              
    ctx.api.editMessageText(ctx.chat.id, ctx.msg.message_id, "Hey! I m bot to search apk at f-droid.org. click help buton for more.", {reply_markup: keyboard })
})

bot.command('se',  (ctx) => {          
          //var pesan = ctx.message.text;
          let input = ctx.message.text
           let inputArray = input.split(" ")
          inputArray.shift()
          pesan = inputArray.join(" ")
         f.fsearch(pesan).then(ok => {
            const res = ok[Math.floor(Math.random() * (ok.length))]
              const title = res.title
              const link = res.link
              const desc = res.desc
              const license = res.license
              const key = new InlineKeyboard().url('Apk Link', link)
          return ctx.reply(`Apk Name: ${title}\nDescription: ${desc}\nLicense: ${license}\n__[Download F-Droid](https://f-droid.org/F-Droid.apk)__`, {
            parse_mode: 'markdown', reply_markup: key
           })
        }).catch(e => {
         console.log(e);
    })
})

bot.start();
