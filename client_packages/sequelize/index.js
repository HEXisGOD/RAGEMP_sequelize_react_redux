
require('./sequelize/moneyHUD.js');

mp.events.add('guiReady', () => {
	global.browser = mp.browsers.new('package://sequelize/browser/index.html');

    mp.gui.chat.activate(true);
});

/*
//--------------------------------------------------------------------------------
    --- Thanks kemperrr for this function ---
//--------------------------------------------------------------------------------   
*/
global.pleaseCallCEF = (eventName, ...args) => { 
    let argumentsString = '';

    for(let arg of args) {
        switch(typeof arg) {
            case 'string': {
                argumentsString += `'${arg}', `;
                break;
            }
            case 'number': {
                argumentsString += `${arg}, `;
                break;
            }
            case 'boolean': {
                argumentsString += `${arg}, `;
                break;
            }
            case 'object': {
                argumentsString += `${JSON.stringify(arg)}, `;
                break;
            }
        }
    }

    global.browser.execute(`mp.events.call('${eventName}', ${argumentsString})`);
}
//--------------------------------------------------------------------------------


mp.events.add("OnPlayerAccountGUI", (params, data) => {

    mp.players.local.dimension = mp.players.local.id + 2000;

    mp.gui.chat.activate(false);
    mp.gui.cursor.show(true, true);
    global.browser.execute(`mp.invoke('focus', true)`);

	if(params == 1) {
		pleaseCallCEF('showClientAuth', { password: data });
	} else if(params == 2) {
        pleaseCallCEF('showClientRegister', { data: 'null' });
	} else if(params == 3) {
        mp.gui.chat.activate(true);
        mp.gui.cursor.show(false, false);
        pleaseCallCEF('clearCEF', { data: 'null' });
        global.browser.execute(`mp.invoke('focus', false)`); 
    }
});

mp.events.add('registerClient', function() {

    mp.players.local.dimension = 0;

    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);

    pleaseCallCEF('clearCEF', { data: 'null' });
    global.browser.execute(`mp.invoke('focus', false)`); 
    mp.events.callRemote('registerClient', arguments[0], arguments[1]);

});

mp.events.add('authClient', function() {

    mp.players.local.dimension = 0;

    mp.gui.cursor.show(false, false);
    mp.gui.chat.activate(true);
    pleaseCallCEF('clearCEF', { data: 'null' });
    global.browser.execute(`mp.invoke('focus', false)`); 
    mp.events.callRemote('authClient', arguments[0]);
});

mp.events.add('initialized', function() {

    mp.game.graphics.notify(`Browser was initialized`);
});
