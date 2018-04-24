
let player = mp.players.local;
/* updateData */
var updateValue = null;
var valueCount = null;
/* updateTimers */
var moneyTimer;
var updateTimer;


function hideMoneyValue() {
    updateValue = null;
}

function hideMoneyAdd(){
    valueCount = null;
}

mp.events.add("showMoneyHUD", (money, changeValue) => {

    player.dataMoney = money;
    player.dataMoneyAdd = changeValue;

    clearTimeout(moneyTimer);
    clearTimeout(updateTimer);

    moneyTimer = setTimeout(hideMoneyValue, 10000);
    updateValue = true;

    if(changeValue != 0) {
        valueCount = true;    
        updateTimer = setTimeout(hideMoneyAdd, 5000);
    }
    
});

mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(3);

    let safeZone = mp.game.graphics.getSafeZoneSize();
    let finalDrawX = 0.9799 - (1.0 - safeZone) * 0.5;
    let finalDrawY = 0.04 + (1.0 - safeZone) * 0.5;

    if(updateValue != undefined || updateValue != null) {

        if(player.dataMoney < 0) {
            mp.game.graphics.drawText(`-$${player.dataMoney}`, [finalDrawX, finalDrawY], {scale: [0.56, 0.56], color:[224, 50, 50, 255], font: 7});
        } else {
            mp.game.graphics.drawText(`$${player.dataMoney}`, [finalDrawX, finalDrawY], {scale: [0.56, 0.56], color:[114, 204, 114, 255], font: 7});
        }
    }

    if(valueCount != undefined || valueCount != null) {
        if(player.dataMoneyAdd < 0) {
            mp.game.graphics.drawText(`-$${Math.abs(player.dataMoneyAdd)}`, [finalDrawX, finalDrawY + 0.038], {scale: [0.56, 0.56], color:[224, 50, 50, 255], font: 7});
        } else {
            mp.game.graphics.drawText(`+$${player.dataMoneyAdd}`, [finalDrawX, finalDrawY + 0.038], {scale: [0.56, 0.56], color:[114, 204, 114, 255], font: 7})
        }
    }

});
