const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Tells your more information about the server.'),
	async execute(interaction) {
		interaction.reply({
            embeds: [{
                "title": "Server Information",
                "color": 0,
                "timestamp": Date.now(),
                "image": {},
                "thumbnail": {},
                "footer": {
                    "text": interaction.user.tag,
                    "icon_url": interaction.user.avatarURL()
                },
                "fields": [
                    {
                        "name": "Server name",
                        "value": interaction.guild.name,
                    },
                    {
                        "name": "Server ID",
                        "value": interaction.guild.id,
                    }
                ]
            }]
        })
	},
};