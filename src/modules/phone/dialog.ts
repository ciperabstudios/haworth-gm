import type { Player } from "@infernus/core";
import type { Phone } from "./domain";
import { phoneService } from "./core";
import { Colors, redString } from "@modules/server/colors";
import { DialogManager, type DialogsData } from "@managers/DialogManager";
import moment from "moment";
import { formatBytes } from "@utils/formatBytes";

interface PhoneMenuState {
    phone: Phone;
    
    // Contactos
    selectedContactIndex?: number; // Para saber a quién editar/borrar
    tempNewContact: { name: string; number: string }; // Para el wizard de creación

    // Llamadas
    //selectedCallIndex?: number;

    // Aplicaciones
    selectedAppIndex?: number;
}


const PHONE_UI_STEPS = {
    MAIN_MENU: 0,

    // Contactos
    CONTACTS_LIST: 1,
    CONTACT_OPTIONS: 2,
    EDIT_CONTACT_NAME: 3,
    EDIT_CONTACT_NUMBER: 4,
    CONFIRM_CONTACT_DELETE: 5,
    ADD_CONTACT_NAME: 6,
    ADD_CONTACT_NUMBER: 7,

    // Historial de llamadas
    CALL_HISTORY_LIST: 8,
    //REMOVE_CALL_FROM_LIST: 9,

    // Aplicaciones
    APPS_INSTALLED_LIST: 9,
    INSTALL_APP: 10,
    UNINSTALL_APP: 11,
    APP_INFO: 12

} as const;

export class PhoneInterfaceService {
    static async open(player: Player, phone: Phone) {

        // 30% de chances de bajar 1% de batería al interactuar.
        if (Math.random() < 0.3) {
            await phoneService.modify(phone.id, (p) => p.decreaseBattery(1));
        }

        // Apagar el teléfono si se quedó sin batería al querer interactuar.
        if (phone.battery <= 0) {
            await phoneService.modify(phone.id, (p) => p.turnOff());
            return player.sendClientMessage(Colors.Red, "Tu teléfono se ha quedado sin batería y se apagó.");
        }


        const manager = new DialogManager<PhoneMenuState>({
            player,
            state: {
                phone,
                tempNewContact: { name: "", number: "" }
            }
        });

        const steps: DialogsData<PhoneMenuState>[] = [
            { // 0 -> Menú principal.
                dialog: (state) => {
                    const batteryColor = state.phone.battery > 20 ? "{00FF00}" : "{FF0000}";

                    const options = [
                        "Contactos",
                        "Aplicaciones",
                        "Historial de llamadas",
                        "Apagar",
                    ].join("\n");

                    return {
                        style: "LIST",
                        caption: `H. ${redString(">")} ${state.phone.brand} | ${state.phone.name} ${redString(">")} ${batteryColor}${state.phone.battery}%`,
                        info: options,
                        button1: "Seleccionar",
                        button2: "Cerrar"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return;

                    switch (listItem) {
                        case 0: return { step: PHONE_UI_STEPS.CONTACTS_LIST };
                        case 1: return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };
                        case 2: return { step: PHONE_UI_STEPS.CALL_HISTORY_LIST };
                        case 3: 
                            await phoneService.modify(manager.state.phone.id, (p) => p.turnOff());
                            player.sendClientMessage(-1, "{CBA9E4} * Apagas tu teléfono.");
                            return manager.stop();
                        default: return { step: PHONE_UI_STEPS.MAIN_MENU };
                    }
                }
            },
            { // 1 -> Lista de contactos.
                dialog: (state) => {
                    let contactList = `{0D85A7}Agregar nuevo contacto\n`;
                    
                    if (state.phone.contacts.length > 0) {
                        const contactsData = state.phone.contacts.map(c => `${c.name}\t${c.phoneNumber}`).join("\n");
                        contactList += contactsData;
                    }

                    return {
                        style: "TABLIST_HEADERS",
                        caption: `H. ${redString(">")} Agenda de contactos`,
                        info: "Nombre\tNúmero\n" + contactList,
                        button1: "Opción",
                        button2: "Atrás"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return;

                    const ADD_NEW_CONTACT_OPTION = 0;

                    if (listItem === ADD_NEW_CONTACT_OPTION) return { step: PHONE_UI_STEPS.ADD_CONTACT_NAME };

                    const index = listItem - 1;
                    if (index < 0 || index >= manager.state.phone.contacts.length) return { step: PHONE_UI_STEPS.CONTACTS_LIST };

                    manager.state.selectedContactIndex = index;
                    return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };
                }
            },
            { // 2 -> Opciones de contacto.
                dialog: (state) => {
                    const contact = state.phone.contacts[state.selectedContactIndex!];
                    
                    return {
                        style: "LIST",
                        caption: `H. Contacto ${redString(">")} ${contact.name}`,
                        info: `Editar nombre\nEditar número\nEliminar`,
                        button1: "Elegir",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return;

                    switch (listItem) {
                        case 0: return { step: PHONE_UI_STEPS.EDIT_CONTACT_NAME };
                        case 1: return { step: PHONE_UI_STEPS.EDIT_CONTACT_NUMBER };
                        case 2: return { step: PHONE_UI_STEPS.CONFIRM_CONTACT_DELETE };
                        default: return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };
                    }
                },
            },
            { // 3 -> Editar nombre de contacto.
                dialog: (state) => {
                    const contact = state.phone.contacts[state.selectedContactIndex!];

                    return {
                        style: "INPUT",
                        caption: `H. ${redString(">")} Editar nombre de contacto`,
                        info: `Introduzca el nuevo nombre de contacto para ${contact.name}.`,
                        button1: "Aceptar",
                        button2: "Cancelar"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };

                    const sanitizedInput = inputText.trim();

                    if (sanitizedInput.length < 3) {
                        player.sendClientMessage(Colors.Red, "El nombre de contacto nuevo es muy corto, considere uno más largo (máximo de 20 caracteres).");
                        return { step: PHONE_UI_STEPS.EDIT_CONTACT_NAME };
                    }

                    if (sanitizedInput.length > 20) {
                        player.sendClientMessage(Colors.Red, "El nombre de contacto nuevo es muy largo, considere uno más corto (máximo de 20 caracteres).")
                        return { step: PHONE_UI_STEPS.EDIT_CONTACT_NAME };
                    }

                    const contactIdx = manager.state.selectedContactIndex!;
                    const contact = manager.state.phone.contacts[contactIdx];

                    const success = await phoneService.modify(manager.state.phone.id, (p) => p.changeContactName(contact.name, sanitizedInput));

                    if (!success) {
                        player.sendClientMessage(Colors.Red, "Error al cambiar el nombre del contacto. Es posible que ya haya un contacto con ese nombre.");
                        return { step: PHONE_UI_STEPS.EDIT_CONTACT_NAME };
                    }

                    return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };
                },
            },
            { // 4 -> Editar número de contacto.
                dialog: (state) => {
                    const contact = state.phone.contacts[state.selectedContactIndex!];

                    return {
                        style: "INPUT",
                        caption: `H. ${redString(">")} Editar número de contacto`,
                        info: `Introduzca el nuevo número de contacto para ${contact.name}\n\nFormato: 1234567.`,
                        button1: "Aceptar",
                        button2: "Cancelar"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };

                    const sanitizedInput = inputText.trim();

                    const contactIdx = manager.state.selectedContactIndex!;
                    const contact = manager.state.phone.contacts[contactIdx];

                    const success = await phoneService.modify(manager.state.phone.id, (p) => p.changeContactPhoneNumber(contact.name, sanitizedInput));

                    if (!success) {
                        player.sendClientMessage(Colors.Red, "Error al cambiar el número del contacto. El formato del nuevo número de teléfono es inválido.");
                        return { step: PHONE_UI_STEPS.EDIT_CONTACT_NUMBER };
                    }

                    return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };
                },
            },
            { // 5 -> Confirmación de borrado de contacto.
                dialog: (state) => {
                    const contact = state.phone.contacts[state.selectedContactIndex!];

                    return {
                        style: "MSGBOX",
                        caption: `H. ${redString(">")} Confirmar borrado de contacto`,
                        info: `¿Estás seguro de querer borrar al contacto ${contact.name}?`,
                        button1: "Confirmar",
                        button2: "Cancelar"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.CONTACT_OPTIONS };

                    const contactIdx = manager.state.selectedContactIndex!;
                    const contact = manager.state.phone.contacts[contactIdx];

                    await phoneService.modify(manager.state.phone.id, (p) => p.removeContact(contact.name));
                    
                    return { step: PHONE_UI_STEPS.CONTACTS_LIST };
                },
            },
            { // 6 -> Agregar nombre de contacto nuevo.
                dialog: (state) => {
                    return {
                        style: "INPUT",
                        caption: `H. Nuevo contacto ${redString(">")} Ingresar nombre`,
                        info: "Ingresa el nombre para el contacto nuevo.",
                        button1: "Aceptar",
                        button2: "Cancelar"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.CONTACTS_LIST };

                    const sanitizedInput = inputText.trim();

                    if (sanitizedInput.length < 3) {
                        player.sendClientMessage(Colors.Red, "El nombre de contacto es muy corto, considere uno más largo (máximo de 20 caracteres).");
                        return { step: PHONE_UI_STEPS.ADD_CONTACT_NAME };
                    }

                    if (sanitizedInput.length > 20) {
                        player.sendClientMessage(Colors.Red, "El nombre de contacto es muy largo, considere uno más corto (máximo de 20 caracteres).")
                        return { step: PHONE_UI_STEPS.ADD_CONTACT_NAME };
                    }

                    manager.state.tempNewContact.name = sanitizedInput;
                    return { step: PHONE_UI_STEPS.ADD_CONTACT_NUMBER };
                },
            },
            { // 7 -> Agregar número de teléfono de contacto nuevo.
                dialog: (state) => {
                    //const newContactName = manager.state.tempNewContact.name; 

                    return {
                        style: "INPUT",
                        caption: `H. Nuevo contacto ${redString(">")} Ingresar número de teléfono`,
                        info: `Ingresa el número de teléfono para el contacto nuevo.\n\nFormato: 1234657`, // (${newContactName})
                        button1: "Aceptar",
                        button2: "Cancelar"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.ADD_CONTACT_NAME };

                    const sanitizedInput = inputText.trim();

                    const success = await phoneService.modify(manager.state.phone.id, (p) => p.addContact({
                        name: manager.state.tempNewContact.name,
                        phoneNumber: sanitizedInput
                    }));

                    if (!success) {
                        player.sendClientMessage(Colors.Red, "El número de teléfono ingresado es inválido o ya existe en tus contactos.");
                        return { step: PHONE_UI_STEPS.ADD_CONTACT_NUMBER };
                    }

                    return { step: PHONE_UI_STEPS.CONTACTS_LIST };
                },
            },
            { // 8 -> Historial de llamadas
                dialog: (state) => {
                    const formattedCallHistoryList = state.phone.callHistory.map(call => {
                        const formattedDuration = moment.utc(call.duration * 1_000).format("HH:mm:ss");
                        const formattedState = call.state === "accepted" ? "Contestada" : "Rechazada";
                        const formattedType = call.type === "receive" ? "Recibida" : "Realizada";
                        
                        const members = call.members.map(memberNumber => state.phone.contacts.find(c => c.phoneNumber === memberNumber)!.name);
                        const formattedMembers = new Intl.ListFormat("es", { style: "long", type: "conjunction" }).format(members);

                        return `${formattedMembers}\t${formattedDuration}\t${formattedState}\t${formattedType}`;
                    });

                    return {
                        style: "TABLIST_HEADERS",
                        paginated: true,
                        caption: `H. ${redString(">")} Historial de llamadas`,
                        headers: "Integrantes\tDuración\tEstado de la llamada\tTipo de llamada",
                        info: !formattedCallHistoryList.length ? ["Sin llamadas..."] : formattedCallHistoryList,
                        button1: "Volver",
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    return { step: PHONE_UI_STEPS.MAIN_MENU };
                }
            },
            { // 9 -> Listado de aplicaciones instaladas.
                dialog: (state) => {
                    
                    const appNames = state.phone.listInstalledApps().map(app => app.name);
                    const appsInfo = ["Instalar aplicación..."];
                    if (appNames.length) appsInfo.push(...appNames);

                    return {
                        style: "LIST",
                        paginated: true,
                        caption: `H. ${redString(">")} Aplicaciones instaladas`,
                        info: appsInfo,
                        button1: "Entrar",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.MAIN_MENU };

                    if (listItem === 0) return { step: PHONE_UI_STEPS.INSTALL_APP };

                    const app = manager.state.phone.listInstalledApps().at(listItem - 1)!;
                    await manager.state.phone.runApplication(app.appId, player);

                    return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };
                }
            },
            { // 10 -> Instalar aplicación.
                dialog: (state) => {
                    return {
                        style: "TABLIST_HEADERS",
                        paginated: true,
                        caption: `H. ${redString(">")} Instalar aplicación`,
                        headers: "Nombre\tAutor\tVersión\tPeso",
                        info: ["En desarrollo..."],
                        button1: "Instalar",
                        button2: "Volver"
                    }
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };

                    return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };
                    // Nada por ahora.
                }
            },
            { // 11 -> Desinstalar aplicación.
                dialog: (state) => {
                    return {
                        style: "TABLIST_HEADERS",
                        paginated: true,
                        caption: `H. ${redString(">")} Desinstalar aplicación`,
                        headers: "Nombre\tPeso",
                        info: ["En desarrollo..."],
                        button1: "Desinstalar",
                        button2: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    if (!response) return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };

                    return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };
                    // Nada por ahora.
                }
            },
            { // 12 -> Información de aplicación.
                dialog: (state) => {
                    const app = state.phone.listInstalledApps().at(state.selectedAppIndex!)!;
                    const formattedApp = `AppId: ${app.appId}\nNombre: ${app.name}\nCreada por: ${app.author}\nVersión: ${app.version}\nTamaño: ${formatBytes(app.size)}`;

                    return {
                        style: "LIST",
                        caption: `H. ${redString(">")} Aplicaciones ${redString(">")} ${app.name}`,
                        info: formattedApp,
                        button1: "Volver"
                    };
                },
                run_logic: async ({ response, listItem, inputText }) => {
                    return { step: PHONE_UI_STEPS.APPS_INSTALLED_LIST };
                }
            },
        ];

        manager.setDialogs(steps);
        await manager.start();
    }
};