const axios = require("axios");
const premiumNodes = [31, 33, 34, 35, 39];

exports.run = async (client, message, args) => {
    var arr = [];
    let userid = args[1]?.match(/[0-9]{17,19}/)?.[0] || message.author.id;
    let user = userPrem.fetch(userid);
    if (!user) user = {};

    if(!userData.get(userid).consoleID) return message.reply(`<@\u200B${userid}> has no panel account linked!`);

    message.reply("Loading servers...");

    axios({
        url:
            "https://panel.danbot.host" +
            "/api/application/users/" +
            userData.get(userid).consoleID +
            "?include=servers",
        method: "GET",
        followRedirect: true,
        maxRedirects: 5,
        headers: {
            Authorization: "Bearer " + config.Pterodactyl.apikey,
            "Content-Type": "application/json",
            Accept: "Application/vnd.pterodactyl.v1+json",
        },
    })
        .then((response) => {
            const preoutput = response.data.attributes.relationships.servers.data;
            arr.push(...preoutput);
            const premiumServers = arr.filter((x) => premiumNodes.includes(x.attributes.node)).length;
            setTimeout(() => {
                const embed = new Discord.MessageEmbed().setDescription(
                    [
                        `**<@${userid}> owns ${arr.length} server${arr.length === 1 ? "" : "s"}.**\n`,
                        `:free: ${arr.length - premiumServers} free server${arr.length - premiumServers === 1 ? "" : "s"}`,
                        `:money_with_wings: ${premiumServers} premium server${premiumServers === 1 ? "" : "s"}`,
                    ].join("\n")
                );
                message.reply(embed);
            }, 1000);
        })
        .catch(() => message.reply("<:No:768256005426511912> An error occurred while loading servers."));
};
