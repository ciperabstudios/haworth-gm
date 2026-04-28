import Command from "@commands/Command";
import StaffCommand from "@commands/StaffCommand";
import Character from "@database/schemas/character";
import { DynamicCheckpoint, DynamicCheckPointEvent, Vehicle, type Player } from "@infernus/core";
import { showInfoForPlayer } from "@modules/filterscripts";

type JobType = "NONE" | "SWEEPER" | "PIZZA_BOY";

export interface IPlayerJobData {
    jobType: JobType;

    /* Stats */
    shiftsCompleted: number;
}

interface IJob {
    name: string;
    description: string;

    /* Salary stats */
    salary: {
        min: number;
        max: number;
    }
}

// --------------------------------------------------------------------------------

abstract class BaseJob {
    abstract readonly type: JobType;
    abstract readonly info: IJob;

    // -------------------------------------------------------------------

    /** Se ejecuta cuando el jugador inicia turno. */
    abstract onStartShift(player: Player): Promise<void>;

    /** Se ejecuta cuando el jugador termina turno */
    abstract onEndShift(player: Player): Promise<void>;

    abstract onCheckpointEnter(player: Player, cpId: number): void;

    // -------------------------------------------------------------------

    protected paySalary(player: Player) {
        const minSalary = Math.ceil(this.info.salary.min);
        const maxSalary = Math.floor(this.info.salary.max);

        const amount = Math.floor(Math.random() * (maxSalary - minSalary) + maxSalary);

        player.giveMoney(amount);
        player.sendClientMessage(-1, `Terminaste de trabajar y se te pagaron $${amount} dólares.`);
    }
}


// --------------------------------------------------------------------------------


const SWEEPER_ROUTE_EXAMPLE = [
    { x: 2244.33, y: -1665.12, z: 15.47 }, // Inicio
    { x: 2244.15, y: -1605.22, z: 15.47 }, // Mitad cuadra
    { x: 2244.20, y: -1565.10, z: 15.47 }, // Esquina 1
    { x: 2200.50, y: -1565.10, z: 15.47 }, // Mitad cuadra
    { x: 2150.10, y: -1565.10, z: 15.47 }, // Esquina 2 (Obliga a no cortar)
    // ... más puntos ...
];

const SWEEPER_ROUTE_1 = [
  { "x": 2012.128, "y": -1271.753, "z": 23.623 },
  { "x": 1945.29, "y": -1264.393, "z": 19.942 },
  { "x": 1874.89, "y": -1264.541, "z": 13.116 }, 
  { "x": 1855.237, "y": -1229.817, "z": 16.658 },
  { "x": 1869.938, "y": -1160.763, "z": 23.407 },
  { "x": 1914.913, "y": -1139.107, "z": 24.406 },
  { "x": 1953.729, "y": -1139.278, "z": 25.377 },
  { "x": 1965.455, "y": -1174.79, "z": 25.686 },
  { "x": 1967.995, "y": -1218.303, "z": 24.874 },
  { "x": 2012.128, "y": -1271.753, "z": 23.623 },
];

interface SweeperJobState {
    routeIndex: number;
    vehicleId: number;
    dirtCollected: number;
}

class SweeperJob extends BaseJob {
    readonly type: JobType = "SWEEPER";
    readonly info: IJob = {
        name: "Barrendero",
        description: "Limpia las calles de Los Santos.",
        salary: {
            min: 50,
            max: 200
        }
    }

    // -------------------------------------------------------------------

    private activeStates = new Map<number, SweeperJobState>();
    private activePlayerCp = new Map<number, DynamicCheckpoint>();

    // -------------------------------------------------------------------

    override async onStartShift(player: Player): Promise<void> {
        const vehicle = player.getVehicle();

        if (!vehicle || vehicle.getModel() !== 574 /* Sweeper */) {
            player.sendClientMessage(-1, `[Barrendero] Debes estar subido a un vehículo Sweeper.`);
            return;
        }

        player.sendClientMessage(-1, "[Barrendero] Sigue los puntos rojos para limpiar.");

        this.activeStates.set(player.id, {
            routeIndex: 0,
            vehicleId: vehicle.id,
            dirtCollected: 0
        });

        this.setNextCheckpoint(player);
    }

    override async onEndShift(player: Player): Promise<void> {
        const cp = this.activePlayerCp.get(player.id);
        if (cp && cp.isValid()) cp.destroy();
        this.activePlayerCp.delete(player.id);

        const state = this.activeStates.get(player.id);

        if (state) {
            player.sendClientMessage(-1, `[Barrendero] Turno finalizado. Basura total recolectada: ${state.dirtCollected} kg.`);
            this.paySalary(player);
            // TODO: aumentar el shiftsCompleted del jugador.
        }

        this.activeStates.delete(player.id);
    }

    // -------------------------------------------------------------------

    override onCheckpointEnter(player: Player, cpId: number): void {
        const state = this.activeStates.get(player.id);
        if (!state) return;

        const assignedVehicle = Vehicle.getInstance(state.vehicleId);
        if (!assignedVehicle) return;

        if (!assignedVehicle.isPlayerIn(player)) {
            player.sendClientMessage(-1, `[Barrendero] Debes estar en tu Sweeper asignado.`);
            return;
        }

        state.dirtCollected += Math.floor(Math.random() * 5) + 1;
        state.routeIndex++;

        if (state.routeIndex >= SWEEPER_ROUTE_1.length) { 
            this.onEndShift(player);
            return;
        };

        if (state.routeIndex !== 1 && state.routeIndex !== SWEEPER_ROUTE_1.length) {
            player.toggleControllable(false);
            showInfoForPlayer(player, "~b~~h~Limpiando la basura...", 2000);

            setTimeout(() => {
                player.toggleControllable(true);
                showInfoForPlayer(player, "~g~~h~Puedes seguir.", 2000);
            }, 2000);
        }

        return this.setNextCheckpoint(player);

        return;
    }

    private setNextCheckpoint(player: Player) {
        const state = this.activeStates.get(player.id);
        if (!state) return;

        const previousCp = this.activePlayerCp.get(player.id);
        if (previousCp && previousCp.isValid()) previousCp.destroy();

        const nextCoords = SWEEPER_ROUTE_1[state.routeIndex];

        const cp = new DynamicCheckpoint({
            x: nextCoords.x, y: nextCoords.y, z: nextCoords.z,
            playerId: player.id,
            worldId: 0,
            interiorId: 0,
            size: 4,
            streamDistance: 300,
        }).create();

        this.activePlayerCp.set(player.id, cp);
    }
}



// --------------------------------------------------------------------------------


/*
    Trabajo de barrendero: Punto A a punto B, limpiar basura con un Sweeper (574).
*/

/*
Una barredora
Y ir a varios checkpoints
Podrías hacer que en ese checkpoint
Se genere basura cuando aparezca
Y al llegar al checkpoint
Se congele en ese lugar 5 segundos mientras limpia
O hacer un recorrido o varios recorridos
De punto a 
A punto B
Pasando por todos los checkpoints
Como si fuese una ruta obligatoria
*/

class JobService {
    private jobs: Map<JobType, BaseJob> = new Map();

    // Jugadores trabajando actualmente.
    private activeWorkers: Map<number, JobType> = new Map();

    // -------------------------------------------------------------------

    constructor() {
        this.registerJob(new SweeperJob());
    }

    private registerJob(job: BaseJob) {
        this.jobs.set(job.type, job);
    }

    getJob(type: JobType): BaseJob | undefined {
        return this.jobs.get(type);
    }

    // -------------------------------------------------------------------

    async startWork(player: Player) {
        const playerJob = (await Character.findOne({ name: player.getName().name }))?.job;
        if (!playerJob) return;

        const playerJobType = playerJob.jobType;

        if (playerJobType === "NONE") return false;

        const jobInstance = this.jobs.get(playerJobType);
        if (!jobInstance) return false;

        this.activeWorkers.set(player.id, playerJobType);

        await jobInstance.onStartShift(player);

        return true;
    }

    async stopWork(player: Player) {
        const jobType = this.activeWorkers.get(player.id);
        if (!jobType) return;

        const jobInstance = this.jobs.get(jobType);
        if (jobInstance) await jobInstance.onEndShift(player);

        this.activeWorkers.delete(player.id);
    }

    handleCheckpoint(player: Player, cp: DynamicCheckpoint) {
        const jobType = this.activeWorkers.get(player.id);
        if (!jobType) return;

        const job = this.jobs.get(jobType);
        job?.onCheckpointEnter(player, cp.id);
    }

}

// --------------------------------------------------------------------------------

export const jobService = new JobService();

// --------------------------------------------------------------------------------


DynamicCheckPointEvent.onPlayerEnter(({ player, cp, next }) => {
    jobService.handleCheckpoint(player, cp);
    return next();
});