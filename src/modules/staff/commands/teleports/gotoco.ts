import StaffCommand from "@commands/StaffCommand";


new StaffCommand({
    name: "gotoco",
    requiredFlag: "TELEPORTS",
    loggable: true,
    description: "description",
    run: async ({ player, subcommand, next }) => {

        const [x, y, z, int] = subcommand;

        if (!x || !y || !z || !int) return player.sendClientMessage(-1, "/gotoco [x] [y] [z] [int]");

        player.setPos(+x, +y, +z);
        player.setInterior(+int);
        player.sendClientMessage(-1, "Teletransportado.");
        
        return next();
    }
});