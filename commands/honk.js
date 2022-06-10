const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Interaction, MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('honk')
		.setDescription('sends a random goose meme'),
	async execute(interaction) {
		const files = await fs.readdirSync('./memes');
		const randomFile = files[Math.floor(Math.random() * files.length)];
		const meme = await fs.readFileSync(`./memes/${randomFile}`);
		
		const attachment = new MessageAttachment(meme, randomFile);
		
		await interaction.reply({
			files:[attachment]
		});
	},
};