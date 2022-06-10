const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Tells your more information about yourself.'),
	async execute(interaction) {
		interaction.reply({
            embeds: [{
                "title": "User Information",
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
                        "name": "Username",
                        "value": interaction.user.username,
                    },
                    {
                        "name": "Tag",
                        "value": interaction.user.tag,
                    },
                    {
                        "name": "User ID",
                        "value": interaction.user.id,
                    }
                ]
            }]
        })
    }
};