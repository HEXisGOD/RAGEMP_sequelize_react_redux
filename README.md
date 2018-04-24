# RAGEMP_sequelize_react_redux
This resource will help many newcomers in the development of the server.

At this gamemode, used the sequelize framework, for easy work with the database. Also used frameworks ReactJS + ReduxJS special for CEF.

Installing
1. Download this archive, unpack it in RAGE:MP new server folder.
2. To work with the database locally I suggest using Denwer.
3. Config connection data at packages\sequelize\modules\db.js
4. Import example database into phpMyAdmin
5. Then start server, and test it !)

Needed node modules
1. MySQL2 -  [ npm install mysql2 -save ]
2. Sequelize - [ npm install sequelize -save ] 
- Thanks @kemperrr for make "pleaseCallCEF" function and event on ReactJS!! 

#version 0.0.2

Update:

1. Added autocreate database if it not exists
2. Added money system [ using drawText ]

Fixes:
1. Fixed but with chat, when client register 
