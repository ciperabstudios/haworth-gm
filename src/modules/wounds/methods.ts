import { Player } from "@infernus/core";
import { playerHealthArmor } from "./globals";

const originalSetHealth = Player.prototype.setHealth;

Player.prototype.setHealth = function(health: number) {
    playerHealthArmor.get(this)!.health = health;
    return originalSetHealth.call(this, health);
};


const originalSetArmour = Player.prototype.setArmour;

Player.prototype.setArmour = function(armour: number) {
    playerHealthArmor.get(this)!.kevlar = armour;
    return originalSetArmour.call(this, armour);
};



/*
const originalGetHealth = Player.prototype.getHealth;


Player.prototype.getHealth = function() {


    return playerHealthArmor.get(this)!.health;
};


const originalGetArmour = Player.prototype.getArmour;

Player.prototype.getArmour = function() {


    return playerHealthArmor.get(this)!.kevlar;
};
*/