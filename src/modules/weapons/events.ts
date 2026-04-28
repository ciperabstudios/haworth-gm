import Character from "@database/schemas/character";
import { getWeaponDamage } from "@modules/weapons/functions";
import { BodyPartsEnum, PlayerEvent } from "@infernus/core";
import { checkMessagesQueryForPlayer, playerDamageReceived, playerHealthArmor } from "@modules/wounds";



PlayerEvent.onGiveDamage(async ({ player: issuer, damage: victim, amount, weapon, bodyPart, next }) => {
    const receivedDamage = getWeaponDamage(weapon, BodyPartsEnum[bodyPart] as keyof typeof BodyPartsEnum);
    let damageLeft = receivedDamage;

    const [userHealth, userKevlar] = [victim.getHealth().health, victim.getArmour().armour];

    const { health: serverHealth, kevlar: serverKevlar } = playerHealthArmor.get(victim)!;


    if (!playerDamageReceived.has(victim)) {
        playerDamageReceived.set(victim, []);
    }

    const defaultValue = { health: userHealth, kevlar: userKevlar };

    let after = playerDamageReceived.get(victim)?.at(-1)?.after || defaultValue;

    
    const modifiedAfterData = () => {
        let health = serverHealth;
        let kevlar = serverKevlar;

        if (after.kevlar > 0 && bodyPart === 3 /* TORSO */) {
            damageLeft = Math.max(receivedDamage - after.kevlar, 0);
            kevlar = Math.max(after.kevlar - receivedDamage, 0);
        }

        health = after.health - damageLeft;

        return { health, kevlar };
    }

    const before = after;
    after = modifiedAfterData();


    const data = { issuer, receivedDamage, before, after };

    if (!playerDamageReceived.has(victim)) {
        playerDamageReceived.set(victim, []);
        playerDamageReceived.get(victim)!.push(data);
    }

    playerDamageReceived.get(victim)!.push(data);


    return next();
});


PlayerEvent.onUpdate(({ player, next }) => {
    if (!player.isSpawned()) return next();

    const testData = playerDamageReceived.get(player);

    if (!testData?.at(-1)) return next();

    const { issuer, after: { health: afterHealth, kevlar: afterKevlar } } = testData.at(-1)!;
    const { health: serverHealth, kevlar: serverKevlar } = playerHealthArmor.get(player)!;

    // BUG: ESTO SPAMMEA IN-GAME. 
    // ""SOLVED""" GG

    const healthTolerance = 5;
    const kevlarTolerance = 5;

    if (Math.abs(afterHealth - serverHealth) > healthTolerance || Math.abs(afterKevlar - serverKevlar) > kevlarTolerance) {
        /* return checkMessagesQueryForPlayer({
            player: issuer,
            message: `Posible uso de cheats de vida/chaleco (o desincronización del servidor) por parte de ${player.getName().name} (ID ${player.id}).`
        }); */
        return next();
    }

    return next();
});


PlayerEvent.onTakeDamage(async ({ player: victim, damage: issuer, amount:_, weapon, bodyPart, next }) => {

    if (!playerHealthArmor.has(victim)) {
        const data = await Character.findOne({ name: victim.getName().name });

        if (!data) {
            playerHealthArmor.set(victim, { health: 100, kevlar: 0 });
            return next();
        }

        const { health, kevlar } = data;

        playerHealthArmor.set(victim, { health, kevlar });

        return next();
    }

    
    const { health, kevlar } = playerHealthArmor.get(victim)!;

    const damage = getWeaponDamage(weapon, BodyPartsEnum[bodyPart] as keyof typeof BodyPartsEnum);
    let damageLeft = damage;

    /*
    if (health - damage <= 0) {
        
        victim.setHealth(10);

        if (injuredUsers.has(victim)) return next();

        woundPlayer(victim, "dead");
        return next();
    }
    */

    if (kevlar > 0 && bodyPart === 3 /* TORSO */) {
        damageLeft = Math.max(damage - kevlar, 0);
        victim.setArmour(Math.max(kevlar - damage, 0));
        playerHealthArmor.get(victim)!.kevlar = Math.max(kevlar - damage, 0);
    }

    
    victim.setHealth(health - damageLeft);
    playerHealthArmor.get(victim)!.health -= damageLeft;
        
    return next();
});