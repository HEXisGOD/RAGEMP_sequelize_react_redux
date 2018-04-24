const Sequelize = require('sequelize');
const mysql = require('mysql2');

global.database = 'sequalize';

global.sequelize = new Sequelize(global.database, 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: false
});

global.checkDataBaseTables = function(data) {
	try {

		sequelize.query("CREATE TABLE IF NOT EXISTS `users` (`id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, `name` varchar(24) NOT NULL, `password` varchar(64) NOT NULL, `ip` varchar(18) NOT NULL, `email` varchar(64) NOT NULL, `money` int(11) NOT NULL, `createdAt` DATE NOT NULL, `updatedAt` DATE NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;", (err) => {
	        if (err) console.log("[SEQUALIZE][checkDataBaseTables]: " + err);
	    });
		  
	} catch(error) {
		console.log("[ERROR][checkDataBaseTables]: " + error);
	}
};
