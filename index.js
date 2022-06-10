const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const buttons = []
const buttonsPath = path.join(__dirname, 'buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if(command.start != undefined) {
		command.start();
	}

    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
	const filePath = path.join(buttonsPath, file);
	const button = require(filePath);
	const newButton = {
		id: file.replace(".js", ""),
		button: button
	}

	buttons.push(newButton);
}

client.on('interactionCreate', async interaction => {
	// console.log(interaction.isCommand()); // normal
	// console.log(interaction.isAutocomplete()) // 
	// console.log(interaction.isApplicationCommand()) // normal
	// console.log(interaction.isButton()) // button
	// console.log(interaction.isContextMenu()) // 
	// console.log(interaction.isMessageComponent()) //  button
	// console.log(interaction.isMessageContextMenu()) // 
	// console.log(interaction.isModalSubmit()) // 
	// console.log(interaction.isSelectMenu()) // 
	// console.log(interaction.isUserContextMenu()) // 

	if(interaction.isButton() && interaction.isMessageComponent()) {
		const button = buttons.find(button => button.id === interaction.customId);

		if(button != undefined) {
			button.button.execute(interaction, client);
		}
	}

	if (!interaction.isCommand()) return;

    const command = commands.find(command => command.name === interaction.commandName);
    
	if (!command) return;

	try {
		await client.commands.get(command.name).execute(interaction, client);
	} catch (error) {
		console.error(error);

		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.once('ready', () => {
	console.log(`Ready to have some fun! (${client.user.tag})`);
});

client.login(token);