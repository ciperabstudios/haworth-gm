import Command from "@commands/Command";
//import { BaseVehicle, showInfoForPlayer } from "@/modules";
//import { Dialog, DialogStylesEnum, Player } from "@infernus/core";

/*
export const ShowPlayerVehicleStatus = async (player: Player, vehicleId: number, dialogId: number): Promise<any> => {
    switch (dialogId) {
      case 0: {
        const MainDialogData = {
          style: DialogStylesEnum.LIST,
          caption: "{FF6359} Mecánico > Revisión automotriz",
          info: "Revisar carrocería\nRevisar motor",
          button1: "Seleccionar",
          button2: "Cancelar"
        };
  
        const MainDialog = new Dialog(MainDialogData);
  
        const { response: main_res, listItem: main_items } = await MainDialog.show(player);
  
        if (!main_res) return showInfoForPlayer(player, "~r~Has cancelado la revisión.", 3000);
  
        switch (main_items) {
          case 0: {
  
            const status = BaseVehicle.getInstance(vehicleId)?.getDamageStatus();
  
            const getVehicleDoorsDamageStatus = (vehicleId?: number) => {
             // const veh = BaseVehicle.getInstance(vehicleId)?.getDamageStatus;
             if (!status) {
              console.warn(`El vehículo con ID ${vehicleId} no tiene un estado válido de puertas.`);
              return {
                bonnet: 0,
                boot: 0,
                frontLeft: 0,
                frontRight: 0,
                rearLeft: 0,
                rearRight: 0,
              };
            }
              return {
                bonnet: status?.doors & 7,
                boot: status?.doors >> 8 & 7,
                frontLeft:  status?.doors >> 16 & 7,
                frontRight: status?.doors >> 24 & 7,
                rearLeft: status?.doors >> 32 & 7,
                rearRight: status?.doors >> 40 & 7
              };
            };
  
            
            
  
            type TireStatus = {
              frontLeft: string;
              frontRight: string;
              rearLeft: string;
              rearRight: string;
            };
            
            function getTireStatus(tires: number): TireStatus {
              let tiresStatus: TireStatus = {
                frontLeft: "{2E9629}Buen estado",
                frontRight: "{2E9629}Buen estado",
                rearLeft: "{2E9629}Buen estado",
                rearRight: "{2E9629}Buen estado"
              };
            
              switch (tires) {
                case 0o0: // Todas infladas
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o1: // Derecha abajo pinchada
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                case 0o2: // Derecha arriba pinchada
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o3: // Derecha arriba y abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                case 0o4: // Izquierda abajo pinchada
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o5: // Izquierda y derecha abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                case 0o6: // Izquierda abajo y derecha arriba pinchadas
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o7: // Derecha arriba, izquierda abajo y derecha abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{2E9629}Buen estado",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                case 0o10: // Izquierda arriba pinchada
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o11: // Izquierda arriba y derecha abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                case 0o12: // Izquierda arriba y derecha arriba pinchadas
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{2E9629}Buen estado",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o13: // Izquierda arriba, derecha arriba e izquierda abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o14: // Izquierda arriba e izquierda abajo pinchadas
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{2E9629}Buen estado",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{2E9629}Buen estado"
                  };
                  break;
            
                case 0o15: // Todas pinchadas
                  tiresStatus = {
                    frontLeft: "{B12222}Deteriorada",
                    frontRight: "{B12222}Deteriorada",
                    rearLeft: "{B12222}Deteriorada",
                    rearRight: "{B12222}Deteriorada"
                  };
                  break;
            
                default:
                  console.warn("Estado de las ruedas no reconocido.");
                  break;
              }
            
              return tiresStatus;
            }          
  
            const { bonnet, boot } = getVehicleDoorsDamageStatus();
            const bonnetFormatted = ((bonnet == (1 << 1))?("{B12222}Dañado"):("{2E9629}Sano"));
            const bootFormatted = ((boot == (1 << 1))?("{B12222}Dañado"):("{2E9629}Sano"));
            
            const tiresFormatted = getTireStatus(status?.tires as number);
            const InfoData = `Parte\tEstado\n{AFAFAF}_______________________________________________________\n{FFFFFF}Estado de las ruedas:\n{AFAFAF}___ DELANTERAS ___\n{B1D9E7}Izquierda\t${tiresFormatted.frontLeft}\n{B1D9E7}Derecha\t${tiresFormatted.frontRight}\n{AFAFAF}___ TRASERAS ___\n{B1D9E7}Izquierda\t${tiresFormatted.rearLeft}\n{B1D9E7}Derecha\t${tiresFormatted.rearRight}\n{AFAFAF}_______________________________________________________\n{FFFFFF}Estado de chapa:\n{B1D9E7}Capó\t${bonnetFormatted}\n{B1D9E7}Baúl\t${bootFormatted}\n`;
            const BodyDialogData = {
              style: DialogStylesEnum.TABLIST_HEADERS,
              caption: "{FF6359} Revisión automotriz > Carrocería",
              info: InfoData,
              button1: "Volver",
              button2: "Cerrar"
            }
  
            const BodyDialog = new Dialog(BodyDialogData);
            const { response: body_res, listItem: body_items } = await BodyDialog.show(player);
  
            if (!body_res) return ShowPlayerVehicleStatus(player, vehicleId, 0);
  
          }
          case 1: {
            const veh = BaseVehicle.getInstance(vehicleId);
            const healthVehicle = veh?.getHealth().health;
            if (!veh || !healthVehicle) return;
            const healthVehicleEx = healthVehicle / 10;
  
            const EngineInfo = `Característica\tValor\n{B1D9E7}Estado del motor:\t{FFFFFF}${Math.round(healthVehicleEx)}/100\n{AFAFAF}_______________________________________________\n{B1D9E7}Kilometraje:\t{FFFFFF}0000137\n{AFAFAF}_______________________________________________\n{B1D9E7}Medidor de gasolina:\t{FFFFFF}157/200 L\n{AFAFAF}_______________________________________________\n{B1D9E7}Medidor de aceite:\t{FFFFFF}291/300 cL\n`;
  
            const EngineDialogData = {
              style: DialogStylesEnum.TABLIST_HEADERS,
              caption: "{FF6359} Revisión automotriz > Motor",
              info: EngineInfo,
              button1: "Volver",
              button2: "Cerrar"
            }
            const EngineDialog = new Dialog(EngineDialogData);
            const { response: engine_res, listItem: engine_items } = await EngineDialog.show(player);
            if (!engine_res) return Dialog.close(player);
             
            ShowPlayerVehicleStatus(player, vehicleId, 0);
             
            break;
          }
        }
        break;
      }
    }
};
*/