
mp.events.addCommand('money', (player, _, count) => {

    try {

        if(getAuthorized(player) == true && player.info) {

            player.info.money += parseInt(count);

            player.info.save();

            player.call('showMoneyHUD',[player.info.money, parseInt(count)]);
            player.outputChatBox(`You gave yourself ${parseInt(count)}$`);
        }

        
    } catch(error) {
        console.log("[ERROR][CMD:givemoney]: " + error);
    }

});
