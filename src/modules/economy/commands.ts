import Command from "@commands/Command";

new Command({
    name: "money",
    description: "Revisa tu dinero.",
    aliases: ["dinero"],
    run: async ({ player, subcommand, next }) => {
        player.sendClientMessage(-1, `Cuentas con ${player.getMoney()} dólares actualmente.`);
        return next();
    }
});

new Command({
    name: "setmoney",
    description: "Añade dinero en tu cuenta (DEV).",
    aliases: ["dinero"],
    run: async ({ player, subcommand, next }) => {
        if (!subcommand.at(0)) return player.sendClientMessage(-1, "/setmoney money");

        const money = +subcommand[0];
        player.giveMoney(money);

        player.sendClientMessage(-1, `Te ${money > 0 ? 'añadiste' : 'descontaste'} ${money} dólares en tu cuenta. Cuentas con ${player.getMoney()} dólares ahora.`);
        return next();
    }
});