import StaffCommand from "@commands/StaffCommand";
import { StaffRole, StaffService } from "@modules/staff/core";
import { staffRoleRepository } from "@modules/staff/repositories";


new StaffCommand({
    name: "createstaffrole",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        
        const role = new StaffRole({
            name: "Lead Developer",
            translatedName: "Líder de desarrollo",
            priority: 20,
            ownPermissions: ["ADMINISTRATOR", "DEVELOPER"]
        });

        const document = await staffRoleRepository.create(role);

        return next();
    }
});



new StaffCommand({
    name: "assignstaffrole",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        
        const role = staffRoleRepository.getInstance(1)!;

        await staffRoleRepository.assignToPlayerAccount(player, role);
        
        return next();
    }
});



new StaffCommand({
    name: "deletestaffrole",
    requiredFlag: "DEVELOPER",
    loggable: true,
    description: "",
    run: async ({ player, subcommand, next }) => {
        
        await staffRoleRepository.delete(1);

        StaffService.removeAdmin(player);
        
        return next();
    }
});