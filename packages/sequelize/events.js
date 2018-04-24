
mp.events.add("playerJoin", (player) => {
	try {

		setAuthorized(player, false);
		player.dimension = player.id + 2000;
		player.position = new mp.Vector3(-605.11, -600.36, 34.50);

		mp.players.forEach(_player => {
			if (_player.id != player.id) {
        		player.outputChatBox(`Player ${player.name}(${player.id}) connected to the server`);
			}
		});

		console.log("[LOGS][playerJoin]: Player " + player.name);
	} catch(error) {
		console.log("[ERROR][playerJoin]: " + error);
	}
});

mp.events.add("playerReady", (player) => {
	try {

		Account.findOne({ where: { name: player.name } })
		.then(instanceAccount => {
		    if (instanceAccount) player.iWantLoadInformation(instanceAccount);
		    else {
		    	player.call('OnPlayerAccountGUI', [2]);
		    }
		}).catch(console.log);

		player.iWantLoadInformation = (information) => {
			player.info = information;

	    	console.log(player.info.password);

	        if(player.info.ip == player.ip) {
		    	setAuthorized(player, true);

		    	player.call('OnPlayerAccountGUI', [3]);
		    	player.call('showMoneyHUD',[player.info.money, 0]);
		    	player.outputChatBox(`You were automatically authorized`);
		    } else {
		    	player.call('OnPlayerAccountGUI', [1, player.info.password]);
	    	}
		}


	} catch(error) {
		console.log("[ERROR][playerReady]: " + error);
	}
});

mp.events.add("playerQuit", (player) => {
	try {

		mp.players.forEach(_player => {
			if (_player.id != player.id) {
        		player.outputChatBox(`Player ${player.name}(${player.id}) leave from server`);
			}
		});

		if(getAuthorized(player) == true) {
			player.info.save();
		}

		console.log("[LOGS][playerQuit]: Player " + player.name);
	} catch(error) {
		console.log("[ERROR][playerQuit]: " + error);
	}
});

mp.events.add("registerClient", (player, _password, _email) => {
	try {

		Account.create({ name: player.name, password: _password, email: _email, ip: player.ip })
		.then(() => Account.findOne({ where: { name: player.name } }))
		.then(instanceAccount => {

			if (instanceAccount) {
				setAuthorized(player, true);
				
		        player.info = instanceAccount;

		        player.dimension = 0;
		        player.position = new mp.Vector3(-605.11, -600.36, 34.50);

		        player.outputChatBox(`You have successfully registered`);
		    } else {
		    	console.log("ERROR createUser");
		    }
		});

	} catch(error) {
		console.log("[ERROR][registerClient]: " + error);
	}
});

mp.events.add("authClient", (player, password) => {
	try {

		player.dimension = 0;
		player.position = new mp.Vector3(-605.11, -600.36, 34.50);

		
		player.info.ip = player.ip;
		player.info.save();

		player.call('showMoneyHUD',[player.info.money, 0]);
		player.outputChatBox(`You have been successfully authorized`);

	} catch(error) {
		console.log("[ERROR][authClient]: " + error);
	}
});
