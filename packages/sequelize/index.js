
require('./modules/db');

global.MAX_PLAYERS = 100;

global.sequelize.authenticate().then(() => {

	require('./events.js');
	require('./modules/players.js');
	require('./modules/commands.js');

	/*Информируем о подключении к БД*/
	console.log (`[SEQUALIZE] Connect excellent to ( ${global.database} )`);

	checkDataBaseTables(global.database);

}).catch(err => {

	/*Информируем о подключении к БД*/
	console.log (`[SEQUALIZE] Connect error ( ${err} )`); 

	
});
