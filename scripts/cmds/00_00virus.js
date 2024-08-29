const fs = require('fs');

module.exports = {
	config: {
		name: "set",
		author: "cliff",
		version: "1.5",
		countDown: 5,
		role: 0,
		category: "Admin",
		shortDescription: {
			en: "[setcredits, setcategory, setversion, setLongDescription, setshortDescription, setauthor, setrole, sethasPermission, setusePrefix in all commands]"
		}
	},

	onStart: async function ({ api, event, args }) {
		const permission = ["100092500544975"];
		if (!permission.includes(event.senderID)) {
			return api.sendMessage("✦ 𝐀𝐭𝐭𝐞𝐧𝐝𝐬 ✦... 𝐓𝐞𝐬 𝐦𝐚𝐢𝐧𝐬 𝐬𝐨𝐧𝐭 𝐭𝐫𝐨𝐩 𝐟𝐚𝐢𝐛𝐥𝐞𝐬 𝐩𝐨𝐮𝐫 𝐦𝐚𝐧𝐢𝐩𝐮𝐥𝐞𝐫 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞. 𝐦𝐨𝐫𝐭𝐞𝐥, 𝐧𝐞 𝐭𝐞 𝐩𝐫𝐞𝐧𝐝 𝐩𝐚𝐬 𝐩𝐨𝐮𝐫 𝐮𝐧 𝐬𝐡𝐚𝐝𝐨𝐰 𝐦𝐚𝐬𝐭𝐞𝐫 ✧. 𝐓𝐞𝐬 𝐩𝐫𝐢𝐯𝐢𝐥𝐞̀𝐠𝐞𝐬 𝐬𝐨𝐧𝐭 𝐥𝐢𝐦𝐢𝐭𝐞́𝐬, 𝐭𝐨𝐮𝐫𝐧𝐞-𝐭𝐨𝐢 𝐝𝐞𝐦𝐢-𝐭𝐮𝐞𝐫 𝐚𝐯𝐚𝐧𝐭 𝐪𝐮𝐞 𝐥'𝐨𝐦𝐛𝐫𝐞 𝐧𝐞 𝐭'𝐞𝐧𝐠𝐥𝐨𝐮𝐭𝐢𝐬𝐬𝐞 ✪.", event.threadID, event.messageID);
		}
		const {
			setCredits,
			setCategory,
			setVersion,
			setLongDescription,
			setShortDescription,
			setAuthor,
			setRole,
			setHasPermission,
			setUsePrefix
		} = args;

		const newCredits = setCredits || "";
		const newCategory = setCategory || "";
		const newVersion = setVersion || "1.5.2";
		const newLongDescription = setLongDescription || "";
		const newShortDescription = setShortDescription || "";
		const newAuthor = setAuthor || "";
		const newRole = setRole === "true" || false;
		const newHasPermission = setHasPermission || "";
		const newUsePrefix = setUsePrefix === "true" || false;

		const commandsPath = './scripts/cmds/';

		fs.readdir(commandsPath, (err, files) => {
			if (err) return api.sendMessage("An error occurred while reading the commands directory.", event.threadID, event.messageID);

			files.forEach(fileName => {
				if (fileName.toLowerCase().includes("cache") || fileName.toLowerCase().includes("noprefix") || fileName.toLowerCase().includes("tmp")) {
					return;
				}

				const filePath = `${commandsPath}${fileName}`;

				fs.readFile(filePath, 'utf-8', (err, data) => {
					if (err) return api.sendMessage(`An error occurred while reading the file ${fileName}`, event.threadID, event.messageID);

					const lines = data.split('\n');
					let creditsLineIndex = -1;
					let categoryLineIndex = -1;
					let versionLineIndex = -1;
					let longDescriptionLineIndex = -1;
					let shortDescriptionLineIndex = -1;
					let authorLineIndex = -1;
					let roleLineIndex = -1;
					let hasPermissionLineIndex = -1;
					let usePrefixLineIndex = -1;

					for (let i = 0; i < lines.length; i++) {
						if (lines[i].includes("credits:")) creditsLineIndex = i;
						if (lines[i].includes("category:")) categoryLineIndex = i;
						if (lines[i].includes("version:")) versionLineIndex = i;
						if (lines[i].includes("setLongDescription:")) longDescriptionLineIndex = i;
						if (lines[i].includes("setshortDescription:")) shortDescriptionLineIndex = i;
						if (lines[i].includes("setauthor:")) authorLineIndex = i;
						if (lines[i].includes("set role:")) roleLineIndex = i;
						if (lines[i].includes("set hasPermission:")) hasPermissionLineIndex = i;
						if (lines[i].includes("set usePrefix:")) usePrefixLineIndex = i;
					}

					if (creditsLineIndex !== -1) lines[creditsLineIndex] = `  credits: "${newCredits}",`;
					else lines.splice(versionLineIndex + 1, 0, `  credits: "${newCredits}",`);

					if (categoryLineIndex !== -1) lines[categoryLineIndex] = `  category: "${newCategory}",`;
					else lines.splice(versionLineIndex + 1, 0, `  category: "${newCategory}",`);

					if (versionLineIndex !== -1) lines[versionLineIndex] = `  version: "${newVersion}",`;
					else lines.splice(versionLineIndex + 1, 0, `  version: "${newVersion}",`);

					if (longDescriptionLineIndex !== -1) lines[longDescriptionLineIndex] = `  setLongDescription: "${newLongDescription}",`;
					else lines.splice(versionLineIndex + 1, 0, `  setLongDescription: "${newLongDescription}",`);

					if (shortDescriptionLineIndex !== -1) lines[shortDescriptionLineIndex] = `  setshortDescription: "${newShortDescription}",`;
					else lines.splice(versionLineIndex + 1, 0, `  setshortDescription: "${newShortDescription}",`);

					if (authorLineIndex !== -1) lines[authorLineIndex] = `  setauthor: "${newAuthor}",`;
					else lines.splice(versionLineIndex + 1, 0, `  setauthor: "${newAuthor}",`);

					if (roleLineIndex !== -1) lines[roleLineIndex] = `  set role: ${newRole},`;
					else lines.splice(versionLineIndex + 1, 0, `  set role: ${newRole},`);

					if (hasPermissionLineIndex !== -1) lines[hasPermissionLineIndex] = `  set hasPermission: "${newHasPermission}",`;
					else lines.splice(versionLineIndex + 1, 0, `  set hasPermission: "${newHasPermission}",`);

					if (usePrefixLineIndex !== -1) lines[usePrefixLineIndex] = `  set usePrefix: ${newUsePrefix},`;
					else lines.splice(versionLineIndex + 1, 0, `  set usePrefix: ${newUsePrefix},`);

					const updatedContent = lines.join('\n');

					fs.writeFile(filePath, updatedContent, 'utf-8', (err) => {
						if (err) return api.sendMessage(`An error occurred while updating the file ${fileName}`, event.threadID, event.messageID);
					});
				});
			});

			api.sendMessage(`Commands updated with specified settings.`, event.threadID, event.messageID);
		});
	},
};
