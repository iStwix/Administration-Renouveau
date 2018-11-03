const Discord = require('discord.js');
const express = require('express');
const app = express();
const token = process.env.token;
const client = new Discord.Client();

var prefix = "*";

bot.login("NTA2NDI4NTIwNjAwMzA1NjY0.DriASw.Ifl2fSUDJThZSu3Eo8zd-WhK0yA");
//EVENT PARAMETRE HEROKU
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`Bot en fonctionnement sur le port ${app.get('port')}`)
})


client.on("ready", () => {
    console.log("Fonctionnel !");
    client.user.setActivity("Vous surveille !");
});


client.on('message', message => {

    if(message.content === "Salut"){
        message.reply("Heureux de te voir parmis nous !");
        console.log('Le bot execute des interaction');
    }


    if(message.content === prefix + "Info"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#660000")
        .setTitle("Informations primaires")
        .setDescription("La maintenance ce termine dans environ : 2 Semaines; Comme vous avez pus le constaté des bots fait par notre équipe de développements")
        .addField("Des questions ?", "N'hésitez pas a demande au membres du staff !")
        .addField("Vous pensez être capable d'aider le serveur ?", "Contactez un Modérateur il vous redirigera jusqu'à un supérieur capable de vous faire passer les test !")
        .setFooter("Des nouveautés exclusif rester connectés !")
        message.channel.sendMessage(help_embed);
        console.log('La commande Info à était utiliser.')
    }

    if(message.content.startsWith(prefix + 'kick')){

        if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')){
        
        return message.reply("[Administration] : **❌ Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
        
        }
        
        if(message.mentions.users.size === 0){
        
        return message.reply("[Administration] : **❌ Veuillez mentionner l'utilisateur que vous voulez kick**")
        
        }
        
        if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')){
        
        return message.reply("[Administration] : **❌ Je n'ai pas la permission `ADMINISTRATOR` pour kick cet utilisateur**").catch(console.error);
        
        }
        
        let kickMember = message.guild.member(message.mentions.users.first());
        
        if(!kickMember){
        
        return message.channel.send("[Administration] : **❌ Cet utilisateur n'est certainement pas valide**")
        
        }
        
        kickMember.kick().then(member => {
        
        message.channel.send(`[Administration] : **${member.user.username}** a bien été kick**`);
        
        })
        
        }
       
        if(message.content.startsWith(prefix + "clear")) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");
            
            let args = message.content.split(" ").slice(1);
    
            if(!args[0]) return message.channel.send("Tu dois préciser un nombre de message à supprimer !")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} message ont étaient suprimés`)
            })
        }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send ("[Administration : **❌ Vous n'avez pas la permissions d'utiliser cette commande**");

        if(message.mentions.users.size === 0) {
            return message.channel.send("[Administration] : **❌ Veuillez mentionner l'utilisateur que vous voulez kick**");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if (!ban) {
            return message.channel.send("[Administration] : **❌ Cet utilisateur n'est certainement pas valide**");
        }
        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("[Administration] : **❌ Je n'ai pas la permission `KICK` pour kick cet utilisateur**");
        }
        ban.ban().then(member => {
            message.channel.send(`[Administration] : **${member.user.username}** a bien été ban !**`)
        }

        

        )
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('[Administration] : **❌ Vous devez mentionner un utilisateur**');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("[Administration] : **❌ Cet utilisateur n'est certainement pas valide**");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`[Administration] : ${mute.user.username} est unmute !`);
        })
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
 
        if(message.mentions.users.size === 0) {
            return message.channel.send('[Administration] : **❌ Vous devez mentionner un utilisateur**');
        }
 
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("[Administration] : **❌ Cet utilisateur n'est certainement pas valide**");
        }
 
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`[Administration : ${mute.user.username} est unmute !`);
        })
    }

    //NE PAS OUBLIER LES PREREQUIS DANS LA VIDEO :

var fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Bonjour, vous avez était avertis |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

}



  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }





  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

clientDiscord.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name --- ":white_check_mark: ")
    membre.guild.roles.find('Vérifié');
})


});
