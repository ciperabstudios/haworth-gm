import type { AnimationCategory, IAnimation } from "./constants";
import { deltaSpeed } from "./constants";


const animations: Record<AnimationCategory, IAnimation[]> = {
  SENTARSE: [
    { animId: 1, id: 1, library: "Attractors", name: "Stepsit_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 2, id: 2, library: "Attractors", name: "Stepsit_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 3, id: 3, library: "FOOD", name: "FF_Sit_Eat3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 4, id: 4, library: "FOOD", name: "FF_Sit_In", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 5, id: 5, library: "FOOD", name: "FF_Sit_In_L", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 6, id: 6, library: "FOOD", name: "FF_Sit_In_R", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 7, id: 7, library: "ped", name: "SEAT_down", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 717, id: 15, library: "INT_OFFICE", name: "OFF_Sit_Bored_Loop", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 339, id: 8, library: "JST_BUISNESS", name: "girl_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 603, id: 9, library: "TATTOOS", name: "TAT_Che_In_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 604, id: 10, library: "TATTOOS", name: "TAT_Back_Out_T", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 605, id: 11, library: "TATTOOS", name: "TAT_Back_In_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 606, id: 12, library: "TATTOOS", name: "TAT_Back_Sit_In_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 607, id: 13, library: "TATTOOS", name: "TAT_Idle_Loop_T", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 715, id: 14, library: "INT_HOUSE", name: "LOU_Loop", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  POSE_MODELO: [
    { animId: 11, id: 1, library: "Attractors", name: "Stepsit_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 12, id: 2, library: "Attractors", name: "Stepsit_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 13, id: 3, library: "Attractors", name: "Stepsit_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 442, id: 4, library: "ped", name: "car_hookertalk", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 456, id: 5, library: "ped", name: "Fight2Idle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 479, id: 6, library: "ped", name: "SHOT_leftP", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 482, id: 7, library: "ped", name: "woman_idlestance", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 485, id: 8, library: "PLAYIDLES", name: "shldr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 486, id: 9, library: "PLAYIDLES", name: "stretch", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 487, id: 10, library: "PLAYIDLES", name: "strleg", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 488, id: 11, library: "PLAYIDLES", name: "time", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 594, id: 12, library: "SUNBATHE", name: "SBATHE_F_LieB2Sit", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  MASTICAR: [
    { animId: 247, id: 1, library: "FOOD", name: "EAT_Burger", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 248, id: 2, library: "FOOD", name: "EAT_Chicken", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 249, id: 3, library: "FOOD", name: "EAT_Pizza", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  VOMITAR: [
    { animId: 250, id: 1, library: "FOOD", name: "EAT_Vomit_P", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ASUSTARSE: [
    { animId: 251, id: 1, library: "FOOD", name: "EAT_Vomit_SK", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 464, id: 2, library: "ped", name: "handscower", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SENTADO_BURGER: [
    { animId: 252, id: 1, library: "FOOD", name: "FF_Dam_Bkw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 253, id: 2, library: "FOOD", name: "FF_Die_Bkw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 254, id: 3, library: "FOOD", name: "FF_Die_Fwd", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 255, id: 4, library: "FOOD", name: "FF_Die_Left", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  BANDEJA: [
    { animId: 256, id: 1, library: "FOOD", name: "SHP_Tray_Lift", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 257, id: 2, library: "FOOD", name: "SHP_Tray_Lift_In", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CAER: [
    //{ animId: 8, id: 1, library: "AIRPORT", name: "NONE", vel: 0, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: 2 },
    { animId: 437, id: 1, library: "ped", name: "BIKE_fall_off", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 458, id: 2, library: "ped", name: "FLOOR_hit_f", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 472, id: 3, library: "ped", name: "KO_shot_face", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 473, id: 4, library: "ped", name: "KO_shot_stom", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  DORMIR: [
    { animId: 9, id: 1, library: "INT_HOUSE", name: "BED_Loop_L", vel: 0, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: 7 },
    { animId: 10, id: 2, library: "INT_HOUSE", name: "BED_Loop_R", vel: 0, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: 9 }
  ],
  BAR: [
    { animId: 14, id: 1, library: "BAR", name: "Barcustom_get", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 15, id: 2, library: "BAR", name: "Barcustom_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 16, id: 3, library: "BAR", name: "Barcustom_order", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 17, id: 4, library: "BAR", name: "Barserve_bottle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 18, id: 5, library: "BAR", name: "Barserve_give", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 19, id: 6, library: "BAR", name: "Barserve_glass", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 20, id: 7, library: "BAR", name: "Barserve_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 21, id: 8, library: "BAR", name: "Barserve_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 22, id: 9, library: "BAR", name: "Barserve_order", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 23, id: 10, library: "BAR", name: "dnk_stndF_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 24, id: 11, library: "BAR", name: "dnk_stndM_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 25, id: 12, library: "BAR", name: "BARman_idle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ESCUCHAR: [
    { animId: 26, id: 1, library: "BAR", name: "Barserve_order", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BATEAR: [
    { animId: 27, id: 1, library: "BASEBALL", name: "Bat_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 28, id: 9, library: "BASEBALL", name: "Bat_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 29, id: 2, library: "BASEBALL", name: "Bat_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 30, id: 10, library: "BASEBALL", name: "Bat_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 31, id: 3, library: "BASEBALL", name: "Bat_3", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 32, id: 11, library: "BASEBALL", name: "Bat_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 33, id: 4, library: "BASEBALL", name: "Bat_4", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 34, id: 5, library: "BASEBALL", name: "Bat_block", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 38, id: 6, library: "BASEBALL", name: "Bat_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 39, id: 7, library: "BASEBALL", name: "Bat_M", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 40, id: 8, library: "BASEBALL", name: "BAT_PART", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GOLPEADO: [
    { animId: 35, id: 1, library: "BASEBALL", name: "Bat_Hit_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 36, id: 2, library: "BASEBALL", name: "Bat_Hit_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 37, id: 3, library: "BASEBALL", name: "Bat_Hit_3", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 221, id: 5, library: "FIGHT_B", name: "HitB_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 222, id: 4, library: "FIGHT_B", name: "HitB_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 229, id: 6, library: "FIGHT_C", name: "HitC_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 230, id: 7, library: "FIGHT_C", name: "HitC_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 238, id: 8, library: "FIGHT_D", name: "HitD_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 239, id: 9, library: "FIGHT_D", name: "HitD_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 242, id: 10, library: "FIGHT_E", name: "Hit_fightkick", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 243, id: 11, library: "FIGHT_E", name: "Hit_fightkick_B", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 246, id: 12, library: "Flowers", name: "Flower_Hit", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 356, id: 13, library: "KNIFE", name: "knife_hit_1", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 357, id: 14, library: "KNIFE", name: "knife_hit_2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 358, id: 15, library: "KNIFE", name: "knife_hit_3", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "ADIÓS": [
    { animId: 41, id: 1, library: "BD_FIRE", name: "BD_GF_Wave", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 453, id: 4, library: "ped", name: "endchat_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 340, id: 2, library: "KISSING", name: "gfwave2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 341, id: 3, library: "KISSING", name: "GF_CarArgue_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "BALCÓN": [
    { animId: 42, id: 1, library: "BD_FIRE", name: "BD_Panic_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 43, id: 2, library: "BD_FIRE", name: "BD_Panic_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 44, id: 3, library: "BD_FIRE", name: "BD_Panic_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 45, id: 4, library: "BD_FIRE", name: "BD_Panic_04", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 46, id: 5, library: "BD_FIRE", name: "BD_Panic_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  LAVAR_MANOS: [
    { animId: 47, id: 1, library: "BD_FIRE", name: "wash_up", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TUMBARSE: [
    { animId: 48, id: 1, library: "BEACH", name: "bather", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 49, id: 2, library: "BEACH", name: "Lay_Bac_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 50, id: 3, library: "BEACH", name: "ParkSit_W_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 51, id: 4, library: "BEACH", name: "ParkSit_M_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 52, id: 5, library: "BEACH", name: "SitnWait_loop_W", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  PRESS_BANCA: [
    { animId: 53, id: 1, library: "benchpress", name: "gym_bp_geton", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 54, id: 2, library: "benchpress", name: "gym_bp_up_A", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 55, id: 3, library: "benchpress", name: "gym_bp_down", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 56, id: 4, library: "benchpress", name: "gym_bp_getoff", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 57, id: 5, library: "benchpress", name: "gym_bp_up_B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 58, id: 6, library: "benchpress", name: "gym_bp_up_smooth", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  RAP: [
    { animId: 646, id: 1, library: "benchpress", name: "gym_bp_celebrate", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 647, id: 2, library: "Freeweights", name: "gym_free_celebrate", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 648, id: 3, library: "GYMNASIUM", name: "gym_tread_celebrate", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 649, id: 4, library: "LOWRIDER", name: "RAP_A_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 650, id: 5, library: "LOWRIDER", name: "RAP_B_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 651, id: 6, library: "LOWRIDER", name: "RAP_C_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 652, id: 7, library: "RAPPING", name: "RAP_B_IN", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 653, id: 8, library: "RAPPING", name: "RAP_B_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 654, id: 9, library: "RAPPING", name: "RAP_B_OUT", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 655, id: 10, library: "RAPPING", name: "RAP_C_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BOMBA: [
    { animId: 59, id: 1, library: "BOMBER", name: "BOM_Plant", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 60, id: 2, library: "BOMBER", name: "BOM_Plant_2Idle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 61, id: 3, library: "BOMBER", name: "BOM_Plant_Crouch_In", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 62, id: 4, library: "BOMBER", name: "BOM_Plant_Crouch_Out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 63, id: 5, library: "BOMBER", name: "BOM_Plant_In", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 64, id: 6, library: "BOMBER", name: "BOM_Plant_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CARGAR_CAJA: [
    { animId: 65, id: 1, library: "BOX", name: "boxhipin", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 66, id: 2, library: "BOX", name: "boxhipup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 67, id: 3, library: "BOX", name: "boxshdwn", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 68, id: 4, library: "BOX", name: "boxshup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 69, id: 5, library: "BOX", name: "bxhipwlk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 70, id: 6, library: "BOX", name: "bxhwlki", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 71, id: 7, library: "BOX", name: "bxshwlk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 72, id: 8, library: "BOX", name: "bxshwlki", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 73, id: 9, library: "BOX", name: "bxwlko", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 74, id: 10, library: "BOX", name: "catch_box", vel: 1, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 107, id: 11, library: "CARRY", name: "crry_prtial", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 108, id: 12, library: "CARRY", name: "liftup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 109, id: 13, library: "CARRY", name: "liftup05", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 110, id: 14, library: "CARRY", name: "liftup105", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 111, id: 15, library: "CARRY", name: "putdwn", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 112, id: 16, library: "CARRY", name: "putdwn05", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 113, id: 17, library: "CARRY", name: "putdwn105", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BASKET: [
    { animId: 75, id: 1, library: "BSKTBALL", name: "BBALL_def_jump_shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 76, id: 2, library: "BSKTBALL", name: "BBALL_def_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 77, id: 3, library: "BSKTBALL", name: "BBALL_def_stepL", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 78, id: 4, library: "BSKTBALL", name: "BBALL_def_stepR", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 79, id: 5, library: "BSKTBALL", name: "BBALL_Dnk", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 80, id: 6, library: "BSKTBALL", name: "BBALL_Dnk_Lnd", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 81, id: 7, library: "BSKTBALL", name: "BBALL_idle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 82, id: 8, library: "BSKTBALL", name: "BBALL_idleloop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 83, id: 9, library: "BSKTBALL", name: "BBALL_Jump_Shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 84, id: 10, library: "BSKTBALL", name: "BBALL_pickup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 85, id: 11, library: "BSKTBALL", name: "BBALL_walk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 1, car: 1, psAnim: -1 }
  ],
  PERDER: [
    { animId: 693, id: 1, library: "BSKTBALL", name: "BBALL_react_miss", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 697, id: 2, library: "CASINO", name: "Roulette_lose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 699, id: 3, library: "CASINO", name: "Slot_lose_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 703, id: 4, library: "ON_LOOKERS", name: "panic_cower", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 704, id: 5, library: "ON_LOOKERS", name: "panic_hide", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 705, id: 6, library: "OTB", name: "wtchrace_lose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 707, id: 7, library: "RIOT", name: "RIOT_ANGRY_B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GANAR: [
    { animId: 694, id: 1, library: "BSKTBALL", name: "BBALL_react_score", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 695, id: 2, library: "CASINO", name: "manwinb", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 696, id: 3, library: "CASINO", name: "manwind", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 698, id: 4, library: "CASINO", name: "Roulette_win", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 700, id: 5, library: "CASINO", name: "Slot_win_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 701, id: 6, library: "CLOTHES", name: "CLO_Buy", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 711, id: 11, library: "ON_LOOKERS", name: "shout_02", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 706, id: 7, library: "OTB", name: "wtchrace_win", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 708, id: 8, library: "RIOT", name: "RIOT_challenge", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 709, id: 9, library: "RIOT", name: "RIOT_CHANT", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 710, id: 10, library: "STRIP", name: "PUN_HOLLER", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ESCOPETA: [
    { animId: 86, id: 1, library: "BUDDY", name: "buddy_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 87, id: 2, library: "BUDDY", name: "buddy_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 88, id: 3, library: "BUDDY", name: "buddy_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 89, id: 4, library: "BUDDY", name: "buddy_fire_poor", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 90, id: 5, library: "BUDDY", name: "buddy_reload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 403, id: 6, library: "MISC", name: "PASS_Rifle_Ply", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 514, id: 7, library: "RIFLE", name: "RIFLE_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 515, id: 8, library: "RIFLE", name: "RIFLE_crouchload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 516, id: 9, library: "RIFLE", name: "RIFLE_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 517, id: 10, library: "RIFLE", name: "RIFLE_fire_poor", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 518, id: 11, library: "RIFLE", name: "RIFLE_load", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 543, id: 12, library: "SHOP", name: "SHP_Duck_Fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 544, id: 13, library: "SHOP", name: "SHP_Gun_Aim", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 545, id: 14, library: "SHOP", name: "SHP_Gun_Duck", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "CÁMARA": [
    { animId: 91, id: 1, library: "CAMERA", name: "camcrch_cmon", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 92, id: 2, library: "CAMERA", name: "camcrch_idleloop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 93, id: 3, library: "CAMERA", name: "camstnd_cmon", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 94, id: 4, library: "CAMERA", name: "camstnd_idleloop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 95, id: 5, library: "CAMERA", name: "camstnd_lkabt", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 96, id: 6, library: "CAMERA", name: "camstnd_to_camcrch", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 97, id: 7, library: "CAMERA", name: "piccrch_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 98, id: 8, library: "CAMERA", name: "piccrch_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 99, id: 9, library: "CAMERA", name: "piccrch_take", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 100, id: 10, library: "CAMERA", name: "picstnd_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 101, id: 11, library: "CAMERA", name: "picstnd_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 102, id: 12, library: "CAMERA", name: "picstnd_take", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  REVISAR_COCHE: [
    { animId: 103, id: 1, library: "CAR", name: "Fixn_Car_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 104, id: 2, library: "CAR", name: "Fixn_Car_Out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  DAR_SALIDA: [
    { animId: 105, id: 1, library: "CAR", name: "flag_drop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SACAR_MANO_COCHE: [
    { animId: 106, id: 1, library: "CAR", name: "Sit_relaxed", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 0, psAnim: -1 }
  ],
  HABLAR_COCHE: [
    { animId: 114, id: 1, library: "CAR_CHAT", name: "carfone_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 115, id: 2, library: "CAR_CHAT", name: "carfone_loopA", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 116, id: 3, library: "CAR_CHAT", name: "carfone_loopA_to_B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 117, id: 4, library: "CAR_CHAT", name: "carfone_loopB_to_A", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 118, id: 5, library: "CAR_CHAT", name: "carfone_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 119, id: 6, library: "CAR_CHAT", name: "CAR_Sc1_BL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 120, id: 7, library: "CAR_CHAT", name: "CAR_Sc1_BR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 121, id: 8, library: "CAR_CHAT", name: "CAR_Sc1_FL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 122, id: 9, library: "CAR_CHAT", name: "CAR_Sc2_FL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 123, id: 10, library: "CAR_CHAT", name: "CAR_Sc3_FL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 124, id: 11, library: "CAR_CHAT", name: "CAR_Sc3_FR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 125, id: 12, library: "CAR_CHAT", name: "CAR_Sc4_BL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 126, id: 13, library: "CAR_CHAT", name: "CAR_Sc4_BR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 127, id: 14, library: "CAR_CHAT", name: "CAR_Sc4_FR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 128, id: 15, library: "CAR_CHAT", name: "car_talkm_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 129, id: 16, library: "CAR_CHAT", name: "car_talkm_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 301, id: 17, library: "GHETTO_DB", name: "GDB_Car2_PLY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 },
    { animId: 302, id: 18, library: "GHETTO_DB", name: "GDB_Car2_SMO", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 303, id: 19, library: "GHETTO_DB", name: "GDB_Car2_SWE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 },
    { animId: 304, id: 20, library: "GHETTO_DB", name: "GDB_Car_PLY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 },
    { animId: 305, id: 21, library: "GHETTO_DB", name: "GDB_Car_RYD", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 306, id: 22, library: "GHETTO_DB", name: "GDB_Car_SMO", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 307, id: 23, library: "GHETTO_DB", name: "GDB_Car_SWE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 }
  ],
  CASINO: [
    { animId: 130, id: 1, library: "CASINO", name: "cards_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 131, id: 2, library: "CASINO", name: "cards_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 132, id: 3, library: "CASINO", name: "cards_lose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 133, id: 4, library: "CASINO", name: "cards_pick_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 134, id: 5, library: "CASINO", name: "cards_pick_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 135, id: 6, library: "CASINO", name: "cards_raise", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 136, id: 7, library: "CASINO", name: "cards_win", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 137, id: 8, library: "CASINO", name: "dealone", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 138, id: 9, library: "CASINO", name: "Roulette_bet", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 139, id: 10, library: "CASINO", name: "Roulette_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 140, id: 11, library: "CASINO", name: "Roulette_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 141, id: 12, library: "CASINO", name: "Slot_bet_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 142, id: 13, library: "CASINO", name: "Slot_bet_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 143, id: 14, library: "CASINO", name: "Slot_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 144, id: 15, library: "CASINO", name: "Slot_Plyr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TOCAR: [
    { animId: 145, id: 1, library: "CASINO", name: "Slot_Plyr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 451, id: 3, library: "ped", name: "endchat_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 184, id: 2, library: "CRIB", name: "CRIB_Use_Switch", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TORTA_CULO: [
    { animId: 656, id: 1, library: "CASINO", name: "wof", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 657, id: 2, library: "STRIP", name: "PUN_CASH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 658, id: 3, library: "STRIP", name: "PLY_CASH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 659, id: 4, library: "SWEET", name: "sweet_ass_slap", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  MOTOSIERRA: [
    { animId: 146, id: 1, library: "CHAINSAW", name: "csaw_part", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 147, id: 2, library: "CHAINSAW", name: "IDLE_csaw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 148, id: 3, library: "CHAINSAW", name: "WEAPON_csaw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 149, id: 4, library: "CHAINSAW", name: "WEAPON_csawlo", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  ECHAR_UN_VISTAZO: [
    { animId: 150, id: 1, library: "CLOTHES", name: "CLO_Pose_Hat", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 151, id: 2, library: "CLOTHES", name: "CLO_Pose_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 457, id: 8, library: "ped", name: "flee_lkaround_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 468, id: 9, library: "ped", name: "IDLE_HBHB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 476, id: 10, library: "ped", name: "roadcross", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 477, id: 11, library: "ped", name: "roadcross_female", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 478, id: 12, library: "ped", name: "roadcross_gang", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 265, id: 3, library: "GANGS", name: "DEALER_IDLE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 408, id: 4, library: "ON_LOOKERS", name: "lkaround_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 409, id: 5, library: "ON_LOOKERS", name: "lkup_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 410, id: 6, library: "ON_LOOKERS", name: "lkup_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 413, id: 7, library: "ON_LOOKERS", name: "panic_point", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 625, id: 13, library: "WUZI", name: "Wuzi_stand_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  MIRARSE_ROPA: [
    { animId: 152, id: 1, library: "CLOTHES", name: "CLO_Pose_Legs", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 153, id: 2, library: "CLOTHES", name: "CLO_Pose_Shoes", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 154, id: 3, library: "CLOTHES", name: "CLO_Pose_Torso", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 155, id: 4, library: "CLOTHES", name: "CLO_Pose_Watch", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PISTOLA: [
    { animId: 156, id: 1, library: "COLT45", name: "colt45_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 157, id: 2, library: "COLT45", name: "colt45_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 158, id: 3, library: "COLT45", name: "colt45_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 159, id: 4, library: "COLT45", name: "colt45_reload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 160, id: 5, library: "COLT45", name: "sawnoff_reload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 506, id: 6, library: "PYTHON", name: "python_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 507, id: 7, library: "PYTHON", name: "python_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 508, id: 8, library: "PYTHON", name: "python_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 509, id: 9, library: "PYTHON", name: "python_fire_poor", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 510, id: 10, library: "PYTHON", name: "python_reload", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 1, car: 1, psAnim: -1 }
  ],
  "CAJÓN": [
    { animId: 161, id: 1, library: "COP_AMBIENT", name: "Copbrowse_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 162, id: 2, library: "COP_AMBIENT", name: "Copbrowse_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 163, id: 3, library: "COP_AMBIENT", name: "Copbrowse_nod", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 164, id: 4, library: "COP_AMBIENT", name: "Copbrowse_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 165, id: 5, library: "COP_AMBIENT", name: "Copbrowse_shake", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  CRUZAR_BRAZOS: [
    { animId: 166, id: 1, library: "COP_AMBIENT", name: "Coplook_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 426, id: 2, library: "OTB", name: "wtchrace_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  MIRAR_RELOJ: [
    { animId: 168, id: 2, library: "COP_AMBIENT", name: "Coplook_nod", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 170, id: 1, library: "COP_AMBIENT", name: "Coplook_watch", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PENSAR: [
    { animId: 169, id: 1, library: "COP_AMBIENT", name: "Coplook_think", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  AFIRMAR: [
    { animId: 310, id: 3, library: "COP_AMBIENT", name: "Coplook_think", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 277, id: 1, library: "GANGS", name: "Invite_Yes", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 309, id: 2, library: "GRAFFITI", name: "graffiti_Chkout", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  NEGAR: [
    { animId: 702, id: 4, library: "COP_AMBIENT", name: "Coplook_shake", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 452, id: 3, library: "ped", name: "endchat_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 276, id: 1, library: "GANGS", name: "Invite_No", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 343, id: 2, library: "KISSING", name: "GF_StreetArgue_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  VIGILAR: [
    { animId: 167, id: 1, library: "ped", name: "IDLE_armed", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  APUNTAR: [
    { animId: 432, id: 1, library: "ped", name: "ARRESTgun", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 460, id: 2, library: "ped", name: "gang_gunstand", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 471, id: 3, library: "ped", name: "Jetpack_Idle", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 511, id: 4, library: "PYTHON", name: "python_reload", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 512, id: 5, library: "PYTHON", name: "python_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 541, id: 6, library: "SHOP", name: "ROB_Loop_Threat", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CAJERO: [
    { animId: 433, id: 1, library: "ped", name: "ATM", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 548, id: 2, library: "SHOP", name: "SHP_Serve_End", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 549, id: 3, library: "SHOP", name: "SHP_Serve_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GOLPEAR: [
    { animId: 434, id: 5, library: "ped", name: "BIKE_elbowL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 435, id: 6, library: "ped", name: "BIKE_elbowR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 188, id: 1, library: "DILDO", name: "DILDO_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 196, id: 2, library: "DILDO", name: "DILDO_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 197, id: 3, library: "DILDO", name: "DILDO_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 198, id: 4, library: "DILDO", name: "DILDO_G", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "TECLEAR_TELÉFONO": [
    { animId: 438, id: 1, library: "ped", name: "bomber", vel: 3.2, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GATEAR: [
    { animId: 439, id: 1, library: "ped", name: "CAR_crawloutRHS", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  FORCEJEAR: [
    { animId: 440, id: 1, library: "ped", name: "CAR_doorlocked_LHS", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 441, id: 2, library: "ped", name: "CAR_doorlocked_RHS", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  EMPUJAR: [
    { animId: 443, id: 4, library: "ped", name: "CAR_pullout_RHS", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 446, id: 5, library: "ped", name: "DAM_armL_frmBK", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 289, id: 1, library: "GANGS", name: "shake_cara", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 428, id: 2, library: "PAULNMAC", name: "PnM_Argue1_A", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 429, id: 3, library: "PAULNMAC", name: "PnM_Argue2_B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CUBRIRSE: [
    { animId: 444, id: 1, library: "ped", name: "cower", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 450, id: 2, library: "ped", name: "DUCK_cower", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 597, id: 3, library: "SWAT", name: "swt_wllpk_R_back", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  ESQUIVAR: [
    { animId: 445, id: 5, library: "ped", name: "Crouch_Roll_R", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 455, id: 6, library: "ped", name: "EV_step", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 199, id: 1, library: "DODGE", name: "Cover_Dive_01", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 200, id: 2, library: "DODGE", name: "Cover_Dive_02", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 201, id: 3, library: "DODGE", name: "Crushed", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 202, id: 4, library: "DODGE", name: "Crush_Jump", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  BAILAR: [
    { animId: 447, id: 13, library: "ped", name: "DAM_LegR_frmFT", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 448, id: 14, library: "ped", name: "DAM_LegR_frmRT", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 483, id: 15, library: "ped", name: "XPRESSscratch", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 203, id: 2, library: "DANCING", name: "dnce_M_a", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 204, id: 1, library: "DANCING", name: "dance_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 205, id: 3, library: "DANCING", name: "DAN_Down_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 206, id: 4, library: "DANCING", name: "DAN_Left_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 207, id: 5, library: "DANCING", name: "DAN_Loop_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 208, id: 6, library: "DANCING", name: "DAN_Right_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 209, id: 7, library: "DANCING", name: "DAN_Up_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 210, id: 8, library: "DANCING", name: "dnce_M_b", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 211, id: 11, library: "DANCING", name: "dnce_M_c", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 212, id: 10, library: "DANCING", name: "dnce_M_d", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 213, id: 9, library: "DANCING", name: "dnce_M_e", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 484, id: 16, library: "PLAYIDLES", name: "shift", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 550, id: 17, library: "SKATE", name: "skate_idle", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  AGARRARSE: [
    { animId: 449, id: 1, library: "ped", name: "DRIVE_BOAT", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  SALTAR_AL_SUELO: [
    { animId: 454, id: 1, library: "ped", name: "EV_dive", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  FUCK: [
    { animId: 459, id: 1, library: "ped", name: "fucku", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ATAQUE_DE_GAS: [
    { animId: 461, id: 1, library: "ped", name: "gas_cwr", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LEVANTARSE: [
    { animId: 462, id: 1, library: "ped", name: "getup", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 463, id: 2, library: "ped", name: "getup_front", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  MANOS_ARRIBA: [
    { animId: 465, id: 1, library: "ped", name: "handsup", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 524, id: 2, library: "ROB_BANK", name: "SHP_HandsUp_Scr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 546, id: 3, library: "SHOP", name: "SHP_Rob_GiveCash", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 547, id: 4, library: "SHOP", name: "SHP_Rob_React", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  CABEZAZO: [
    { animId: 466, id: 1, library: "ped", name: "HIT_walk", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CHARLAR: [
    { animId: 467, id: 1, library: "ped", name: "IDLE_chat", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LLAMAR_TAXI: [
    { animId: 469, id: 1, library: "ped", name: "IDLE_taxi", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CANSADO: [
    { animId: 470, id: 2, library: "ped", name: "IDLE_tired", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 214, id: 1, library: "FAT", name: "IDLE_tired", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "SACAR_TELÉFONO": [
    { animId: 474, id: 1, library: "ped", name: "phone_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "GUARDAR_TELÉFONO": [
    { animId: 475, id: 1, library: "ped", name: "phone_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  APARTAR_MULTITUD: [
    { animId: 480, id: 1, library: "ped", name: "Shove_Partial", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BORRACHO: [
    { animId: 481, id: 1, library: "ped", name: "WALK_drunk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 528, id: 2, library: "RYDER", name: "RYD_Die_PT1", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "TELÉFONO_ATENDER": [
    { animId: 602, id: 1, library: "ped", name: "phone_talk", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 1, car: 1, psAnim: -1 }
  ],
  ANDAR: [
    { animId: 661, id: 1, library: "FAT", name: "FatWalk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 662, id: 2, library: "FAT", name: "FatWalk_armed", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 663, id: 3, library: "FAT", name: "FatWalk_Csaw", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 664, id: 4, library: "FAT", name: "FatWalk_Rocket", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 665, id: 5, library: "JST_BUISNESS", name: "girl_01", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 666, id: 6, library: "MUSCULAR", name: "MuscleWalk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 667, id: 7, library: "MUSCULAR", name: "MuscleWalk_armed", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 668, id: 8, library: "MUSCULAR", name: "Musclewalk_Csaw", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 669, id: 9, library: "MUSCULAR", name: "Musclewalk_rocket", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 670, id: 10, library: "ped", name: "Player_Sneak", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 671, id: 11, library: "ped", name: "run_fatold", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 672, id: 12, library: "ped", name: "WALK_civi", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 673, id: 13, library: "ped", name: "WALK_fat", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 674, id: 14, library: "ped", name: "WALK_fatold", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 675, id: 15, library: "ped", name: "WALK_gang1", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 676, id: 16, library: "ped", name: "WALK_gang2", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 677, id: 17, library: "ped", name: "WALK_old", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 678, id: 18, library: "ped", name: "WALK_rocket", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 679, id: 19, library: "ped", name: "WALK_player", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 680, id: 20, library: "ped", name: "WALK_shuffle", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 681, id: 21, library: "ped", name: "Walk_Wuzi", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 682, id: 22, library: "ped", name: "WOMAN_runfatold", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 683, id: 23, library: "ped", name: "WOMAN_walkbusy", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 684, id: 24, library: "ped", name: "WOMAN_walkfatold", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 685, id: 25, library: "ped", name: "WOMAN_walknorm", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 686, id: 26, library: "ped", name: "WOMAN_walkold", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 687, id: 27, library: "ped", name: "WOMAN_walkpro", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 688, id: 28, library: "ped", name: "WOMAN_walksexy", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 689, id: 29, library: "ped", name: "WOMAN_walkshop", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 690, id: 30, library: "POOL", name: "POOL_Walk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 691, id: 31, library: "WUZI", name: "CS_Wuzi_pt1", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 },
    { animId: 692, id: 32, library: "WUZI", name: "Wuzi_Walk", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 1, car: 1, psAnim: -1 }
  ],
  PREPARAR_ARMA: [
    { animId: 712, id: 1, library: "ped", name: "Gun_stand", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 5, car: 1, psAnim: -1 }
  ],
  AVANZAR_PESADA: [
    { animId: 713, id: 1, library: "ped", name: "GunMove_FWD", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 5, car: 1, psAnim: -1 }
  ],
  "TEST2": [
    { animId: 719, id: 1, library: "ped", name: "FALL_collapse", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 0, psAnim: -1 }
  ],
  AMENAZAR_BATE: [
    { animId: 171, id: 1, library: "CRACK", name: "Bbalbat_Idle_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 172, id: 2, library: "CRACK", name: "Bbalbat_Idle_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  HERIDO: [
    { animId: 173, id: 1, library: "CRACK", name: "crckdeth1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 174, id: 2, library: "CRACK", name: "crckdeth2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 175, id: 3, library: "CRACK", name: "crckdeth3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 176, id: 4, library: "CRACK", name: "crckdeth4", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 177, id: 5, library: "CRACK", name: "crckidle1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 178, id: 6, library: "CRACK", name: "crckidle2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 179, id: 7, library: "CRACK", name: "crckidle3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 180, id: 8, library: "CRACK", name: "crckidle4", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 599, id: 9, library: "SWEET", name: "LaFin_Sweet", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 600, id: 10, library: "SWEET", name: "Sweet_injuredloop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 620, id: 11, library: "WUZI", name: "CS_Dead_Guy", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  CONSOLA: [
    { animId: 181, id: 1, library: "CRIB", name: "PED_Console_Loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 182, id: 2, library: "CRIB", name: "PED_Console_Loose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 183, id: 3, library: "CRIB", name: "PED_Console_Win", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  SALTO_PISCINA: [
    { animId: 185, id: 1, library: "DAM_JUMP", name: "DAM_Launch", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 186, id: 2, library: "DAM_JUMP", name: "Jump_Roll", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SALTO_MURO: [
    { animId: 187, id: 1, library: "DAM_JUMP", name: "SF_JumpWall", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TRATAR: [
    { animId: 189, id: 1, library: "DEALER", name: "DEALER_DEAL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 190, id: 2, library: "DEALER", name: "shop_pay", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 264, id: 3, library: "GANGS", name: "DEALER_DEAL", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 267, id: 4, library: "GANGS", name: "DRUGS_BUY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CRUZAR_MANOS: [
    { animId: 191, id: 1, library: "DEALER", name: "DEALER_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 192, id: 2, library: "DEALER", name: "DEALER_IDLE_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 193, id: 3, library: "DEALER", name: "DEALER_IDLE_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 194, id: 4, library: "DEALER", name: "DEALER_IDLE_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 195, id: 5, library: "DEALER", name: "DRUGS_BUY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  BOXEO: [
    { animId: 215, id: 1, library: "FIGHT_B", name: "FightB_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 216, id: 2, library: "FIGHT_B", name: "FightB_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 217, id: 3, library: "FIGHT_B", name: "FightB_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 218, id: 4, library: "FIGHT_B", name: "FightB_G", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 219, id: 5, library: "FIGHT_B", name: "FightB_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 220, id: 6, library: "FIGHT_B", name: "FightB_M", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  KICKBOXING: [
    { animId: 223, id: 1, library: "FIGHT_C", name: "FightC_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 224, id: 2, library: "FIGHT_C", name: "FightC_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 225, id: 3, library: "FIGHT_C", name: "FightC_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 226, id: 4, library: "FIGHT_C", name: "FightC_G", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 227, id: 5, library: "FIGHT_C", name: "FightC_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 228, id: 6, library: "FIGHT_C", name: "FightC_M", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CHIQUITO_LA_CALZADA: [
    { animId: 231, id: 1, library: "FIGHT_C", name: "FightC_blocking", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PELEA_CALLEJERA: [
    { animId: 232, id: 1, library: "FIGHT_D", name: "FightD_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 233, id: 2, library: "FIGHT_D", name: "FightD_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 234, id: 3, library: "FIGHT_D", name: "FightD_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 235, id: 4, library: "FIGHT_D", name: "FightD_G", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 236, id: 5, library: "FIGHT_D", name: "FightD_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 237, id: 6, library: "FIGHT_D", name: "FightD_M", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "PUÑETAZO": [
    { animId: 240, id: 1, library: "FIGHT_E", name: "FightKick", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PATADA: [
    { animId: 241, id: 1, library: "GANGS", name: "shake_carK", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 494, id: 2, library: "POLICE", name: "Door_Kick", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BEBER: [
    { animId: 266, id: 1, library: "GANGS", name: "drnkbr_prtl", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 617, id: 2, library: "VENDING", name: "VEND_Drink2_P", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 618, id: 3, library: "VENDING", name: "VEND_Drink_P", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SALUDAR: [
    { animId: 268, id: 1, library: "GANGS", name: "hndshkaa", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 269, id: 2, library: "GANGS", name: "hndshkba", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 270, id: 3, library: "GANGS", name: "hndshkca", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 271, id: 4, library: "GANGS", name: "hndshkcb", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 273, id: 6, library: "GANGS", name: "hndshkea", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 274, id: 7, library: "GANGS", name: "hndshkfa", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 275, id: 8, library: "GANGS", name: "hndshkfa_swt", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  DAR_MANO: [
    { animId: 272, id: 1, library: "GANGS", name: "hndshkda", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  APOYARSE: [
    { animId: 278, id: 1, library: "GANGS", name: "leanIDLE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 279, id: 2, library: "GANGS", name: "leanIN", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 405, id: 3, library: "MISC", name: "Plyrlean_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  HABLAR_GANG: [
    { animId: 280, id: 1, library: "GANGS", name: "prtial_gngtlkA", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 281, id: 2, library: "GANGS", name: "prtial_gngtlkB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 282, id: 3, library: "GANGS", name: "prtial_gngtlkD", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 283, id: 4, library: "GANGS", name: "prtial_gngtlkE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 284, id: 5, library: "GANGS", name: "prtial_gngtlkF", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 285, id: 6, library: "GANGS", name: "prtial_gngtlkG", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 286, id: 7, library: "GANGS", name: "prtial_gngtlkH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 399, id: 8, library: "MISC", name: "Idle_Chat_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CHOCAR_MANO: [
    { animId: 287, id: 1, library: "GANGS", name: "prtial_hndshk_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "DAR_MANO_1": [
    { animId: 288, id: 1, library: "GANGS", name: "prtial_hndshk_biz_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CHOCARSE: [
    { animId: 290, id: 1, library: "GANGS", name: "shake_carSH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CAMINAR_CUCLILLAS: [
    { animId: 244, id: 1, library: "FINALE", name: "FIN_Cop1_ClimbOut2", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ABOFETEAR: [
    { animId: 245, id: 1, library: "Flowers", name: "Flower_attack_M", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 622, id: 2, library: "WUZI", name: "Wuzi_Greet_Plyr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LEVANTAR_PESAS: [
    { animId: 258, id: 1, library: "Freeweights", name: "gym_free_A", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 259, id: 2, library: "Freeweights", name: "gym_free_B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 260, id: 3, library: "Freeweights", name: "gym_free_down", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 261, id: 4, library: "Freeweights", name: "gym_free_pickup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 262, id: 5, library: "Freeweights", name: "gym_free_putdown", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 263, id: 6, library: "Freeweights", name: "gym_free_up_smooth", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  GESTO_GANG: [
    { animId: 291, id: 1, library: "GHANDS", name: "gsign1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 292, id: 2, library: "GHANDS", name: "gsign1LH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 293, id: 3, library: "GHANDS", name: "gsign2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 294, id: 4, library: "GHANDS", name: "gsign2LH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 295, id: 5, library: "GHANDS", name: "gsign3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 296, id: 6, library: "GHANDS", name: "gsign3LH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 297, id: 7, library: "GHANDS", name: "gsign4", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 298, id: 8, library: "GHANDS", name: "gsign4LH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 299, id: 9, library: "GHANDS", name: "gsign5", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 300, id: 10, library: "GHANDS", name: "gsign5LH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "MIRAR_PRISMÁTICOS": [
    { animId: 308, id: 1, library: "goggles", name: "goggles_put_on", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LLORAR: [
    { animId: 311, id: 1, library: "GRAVEYARD", name: "mrnF_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 312, id: 2, library: "GRAVEYARD", name: "mrnM_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 313, id: 3, library: "GRAVEYARD", name: "prst_loopa", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LANZAR: [
    { animId: 314, id: 1, library: "GRENADE", name: "WEAPON_throw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 315, id: 2, library: "GRENADE", name: "WEAPON_throwu", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SACO_GOLPEAR: [
    { animId: 316, id: 1, library: "GYMNASIUM", name: "GYMshadowbox", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PEDALEAR_GIMNASIO: [
    { animId: 317, id: 1, library: "GYMNASIUM", name: "gym_bike_geton", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 318, id: 2, library: "GYMNASIUM", name: "gym_bike_fast", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 319, id: 3, library: "GYMNASIUM", name: "gym_bike_celebrate", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 320, id: 4, library: "GYMNASIUM", name: "gym_bike_pedal", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CORRER_CINTA: [
    { animId: 324, id: 1, library: "GYMNASIUM", name: "gym_tread_geton", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 325, id: 2, library: "GYMNASIUM", name: "gym_tread_jog", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 327, id: 3, library: "GYMNASIUM", name: "gym_tread_walk", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 326, id: 4, library: "GYMNASIUM", name: "gym_tread_sprint", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 323, id: 5, library: "GYMNASIUM", name: "gym_tread_getoff", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 321, id: 6, library: "GYMNASIUM", name: "gym_jog_falloff", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 322, id: 7, library: "GYMNASIUM", name: "gym_tread_falloff", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 328, id: 8, library: "GYMNASIUM", name: "gym_walk_falloff", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CORTAR_PELO: [
    { animId: 329, id: 1, library: "HAIRCUTS", name: "BRB_Hair_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 330, id: 2, library: "HAIRCUTS", name: "BRB_Hair_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  SOBREDOSIS: [
    { animId: 331, id: 1, library: "HEIST9", name: "CAS_G2_GasKO", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  TECLEAR_SENTADO: [
    { animId: 332, id: 1, library: "INT_OFFICE", name: "OFF_Sit_Type_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  BEBER_SENTADO: [
    { animId: 716, id: 1, library: "INT_OFFICE", name: "OFF_Sit_Drink", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "BUSCAR_ESTANTERÍA": [
    { animId: 333, id: 1, library: "INT_SHOP", name: "shop_cashier", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 334, id: 2, library: "INT_SHOP", name: "shop_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 335, id: 3, library: "INT_SHOP", name: "shop_lookA", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 336, id: 4, library: "INT_SHOP", name: "shop_lookB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 337, id: 5, library: "INT_SHOP", name: "shop_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 338, id: 6, library: "INT_SHOP", name: "shop_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LIGAR: [
    { animId: 342, id: 1, library: "KISSING", name: "GF_StreetArgue_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  REGALAR: [
    { animId: 344, id: 1, library: "KISSING", name: "gift_give", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  BESAR: [
    { animId: 345, id: 1, library: "KISSING", name: "Grlfrd_Kiss_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 346, id: 2, library: "KISSING", name: "Grlfrd_Kiss_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 347, id: 3, library: "KISSING", name: "Grlfrd_Kiss_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 348, id: 4, library: "KISSING", name: "Playa_Kiss_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 349, id: 5, library: "KISSING", name: "Playa_Kiss_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 350, id: 6, library: "KISSING", name: "Playa_Kiss_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  DEGOLLAR: [
    { animId: 351, id: 1, library: "KNIFE", name: "KILL_Knife_Player", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "APUÑALAR": [
    { animId: 352, id: 1, library: "KNIFE", name: "knife_1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 353, id: 2, library: "KNIFE", name: "knife_2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 354, id: 3, library: "KNIFE", name: "knife_3", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 355, id: 4, library: "KNIFE", name: "knife_4", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GOGO: [
    { animId: 359, id: 1, library: "LAPDAN1", name: "LAPDAN_D", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 360, id: 2, library: "LAPDAN2", name: "LAPDAN_D", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 361, id: 3, library: "LAPDAN3", name: "LAPDAN_D", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  LOWRIDER: [
    { animId: 362, id: 1, library: "LOWRIDER", name: "lrgirl_bdbnce", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 363, id: 2, library: "LOWRIDER", name: "lrgirl_hair", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 364, id: 3, library: "LOWRIDER", name: "lrgirl_hurry", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 365, id: 4, library: "LOWRIDER", name: "lrgirl_idleloop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 366, id: 5, library: "LOWRIDER", name: "lrgirl_idle_to_l0", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 367, id: 6, library: "LOWRIDER", name: "lrgirl_l0_to_l1", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 368, id: 7, library: "LOWRIDER", name: "lrgirl_l12_to_l0", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 369, id: 8, library: "LOWRIDER", name: "lrgirl_l1_bnce", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 370, id: 9, library: "LOWRIDER", name: "lrgirl_l1_to_l2", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 371, id: 10, library: "LOWRIDER", name: "lrgirl_l2_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 372, id: 11, library: "LOWRIDER", name: "prtial_gngtlkB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 373, id: 12, library: "LOWRIDER", name: "prtial_gngtlkC", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 374, id: 13, library: "LOWRIDER", name: "prtial_gngtlkD", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 375, id: 14, library: "LOWRIDER", name: "prtial_gngtlkE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 376, id: 15, library: "LOWRIDER", name: "prtial_gngtlkF", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 377, id: 16, library: "LOWRIDER", name: "prtial_gngtlkG", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 378, id: 17, library: "LOWRIDER", name: "prtial_gngtlkH", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 379, id: 18, library: "LOWRIDER", name: "Sit_relaxed", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 }
  ],
  RECUPERARSE: [
    { animId: 380, id: 1, library: "MD_END", name: "END_SC1_PLY", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 381, id: 2, library: "MD_END", name: "END_SC1_RYD", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 382, id: 3, library: "MD_END", name: "END_SC1_SWE", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  DROGADO: [
    { animId: 383, id: 1, library: "MD_END", name: "END_SC2_PLY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 384, id: 2, library: "MD_END", name: "END_SC2_RYD", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 385, id: 3, library: "MD_END", name: "END_SC2_SMO", vel: 3.1, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 386, id: 4, library: "MD_END", name: "END_SC2_SWE", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  REANIMAR: [
    { animId: 387, id: 1, library: "MEDIC", name: "CPR", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  MOTORISTA: [
    { animId: 388, id: 1, library: "MISC", name: "BMX_celebrate", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 389, id: 2, library: "MISC", name: "BMX_comeon", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 390, id: 3, library: "MISC", name: "bmx_talkleft_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 391, id: 4, library: "MISC", name: "bmx_talkleft_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 392, id: 5, library: "MISC", name: "bmx_talkleft_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 },
    { animId: 393, id: 6, library: "MISC", name: "bmx_talkright_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 0, psAnim: -1 }
  ],
  APORREAR_PUERTA: [
    { animId: 394, id: 1, library: "MISC", name: "bng_wndw", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 395, id: 2, library: "MISC", name: "bng_wndw_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 621, id: 3, library: "WUZI", name: "Wuzi_follow", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "POSAR_MALETÍN": [
    { animId: 396, id: 1, library: "MISC", name: "Case_pickup", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "SEÑALAR_DERECHA": [
    { animId: 397, id: 1, library: "MISC", name: "Hiker_Pose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "SEÑALAR_IZQUIERDA": [
    { animId: 398, id: 1, library: "MISC", name: "Hiker_Pose_L", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  RECOGER_PELOTA: [
    { animId: 400, id: 1, library: "MISC", name: "pickup_box", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  SAMURAI: [
    { animId: 401, id: 1, library: "MISC", name: "KAT_Throw_K", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  ARREGLAR_RUEDA: [
    { animId: 404, id: 1, library: "MISC", name: "Plunger_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  FACEPALM: [
    { animId: 406, id: 1, library: "MISC", name: "plyr_shkhead", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  RASCARSE: [
    { animId: 407, id: 1, library: "MISC", name: "Scratchballs_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TAICHI: [
    { animId: 402, id: 1, library: "PARK", name: "Tai_Chi_Loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  GRITO: [
    { animId: 411, id: 1, library: "ON_LOOKERS", name: "lkup_point", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 414, id: 2, library: "ON_LOOKERS", name: "panic_shout", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 415, id: 3, library: "ON_LOOKERS", name: "Pointup_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 416, id: 4, library: "ON_LOOKERS", name: "Pointup_shout", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 418, id: 5, library: "ON_LOOKERS", name: "shout_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 419, id: 6, library: "ON_LOOKERS", name: "shout_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 522, id: 7, library: "RIOT", name: "RIOT_shout", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PREOCUPADO: [
    { animId: 412, id: 1, library: "ON_LOOKERS", name: "panic_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  NAZI: [
    { animId: 417, id: 1, library: "ON_LOOKERS", name: "point_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "LLAMAR_ATENCIÓN": [
    { animId: 420, id: 1, library: "ON_LOOKERS", name: "wave_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  VENTANILLA_BANCO: [
    { animId: 421, id: 1, library: "OTB", name: "betslp_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 422, id: 2, library: "OTB", name: "betslp_lkabt", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 423, id: 3, library: "OTB", name: "betslp_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 424, id: 4, library: "OTB", name: "betslp_tnk", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  DISCUTIR: [
    { animId: 425, id: 1, library: "OTB", name: "wtchrace_cmon", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  AVANZAR_POL: [
    { animId: 427, id: 1, library: "POLICE", name: "Cop_move_FWD", vel: deltaSpeed, aLoop: 1, lockX: 1, lockY: 1, freeze: 1, lp: 5, car: 1, psAnim: -1 }
  ],
  "TRÁFICO": [
    { animId: 489, id: 1, library: "POLICE", name: "CopTraf_Away", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 490, id: 2, library: "POLICE", name: "CopTraf_Come", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 491, id: 3, library: "POLICE", name: "CopTraf_Left", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 492, id: 4, library: "POLICE", name: "CopTraf_Stop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CACHEADO: [
    { animId: 493, id: 1, library: "POLICE", name: "crm_drgbst_01", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  "TEST_1": [
    { animId: 714, id: 1, library: "POLICE", name: "plc_drgbst_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PAJA: [
    { animId: 430, id: 1, library: "PAULNMAC", name: "wank_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 431, id: 2, library: "PAULNMAC", name: "wank_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  CORRERSE: [
    { animId: 660, id: 1, library: "PAULNMAC", name: "Piss_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  RODAR: [
    { animId: 436, id: 1, library: "MD_CHASE", name: "MD_BIKE_Lnd_Roll", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  SUJETADO: [
    { animId: 718, id: 1, library: "MD_CHASE", name: "MD_HANG_Loop", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  BILLAR: [
    { animId: 495, id: 1, library: "POOL", name: "POOL_ChalkCue", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 496, id: 2, library: "POOL", name: "POOL_Idle_Stance", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 497, id: 3, library: "POOL", name: "POOL_Long_Shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 498, id: 4, library: "POOL", name: "POOL_Long_Start", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 499, id: 5, library: "POOL", name: "POOL_Med_Shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 500, id: 6, library: "POOL", name: "POOL_Med_Start", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 501, id: 7, library: "POOL", name: "POOL_Place_White", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 502, id: 8, library: "POOL", name: "POOL_Short_Shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 503, id: 9, library: "POOL", name: "POOL_Short_Start", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 504, id: 10, library: "POOL", name: "POOL_XLong_Shot", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 505, id: 11, library: "POOL", name: "POOL_XLong_Start", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  REIR: [
    { animId: 513, id: 1, library: "RAPPING", name: "Laugh_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ENFADADO: [
    { animId: 519, id: 1, library: "RIOT", name: "RIOT_ANGRY", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  QUE_TE_DEN: [
    { animId: 520, id: 1, library: "RIOT", name: "RIOT_FUKU", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  ANIMAR: [
    { animId: 521, id: 1, library: "RIOT", name: "RIOT_PUNCHES", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  MALETA_GUARDAR: [
    { animId: 523, id: 1, library: "ROB_BANK", name: "CAT_Safe_Rob", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "VÁMONOS": [
    { animId: 525, id: 1, library: "RYDER", name: "RYD_Beckon_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "SÚBELO": [
    { animId: 526, id: 1, library: "RYDER", name: "RYD_Beckon_02", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "BÁJALO": [
    { animId: 527, id: 1, library: "RYDER", name: "RYD_Beckon_03", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PINCHAR_DJ: [
    { animId: 529, id: 1, library: "SCRATCHING", name: "scdldlp", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 530, id: 2, library: "SCRATCHING", name: "scdlulp", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 531, id: 3, library: "SCRATCHING", name: "scdrdlp", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 532, id: 4, library: "SCRATCHING", name: "scdrulp", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 533, id: 5, library: "SCRATCHING", name: "sclng_l", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 534, id: 6, library: "SCRATCHING", name: "sclng_r", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 535, id: 7, library: "SCRATCHING", name: "scmid_l", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 536, id: 8, library: "SCRATCHING", name: "scmid_r", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 537, id: 9, library: "SCRATCHING", name: "scshrtl", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 538, id: 10, library: "SCRATCHING", name: "scshrtr", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 539, id: 11, library: "SCRATCHING", name: "sc_ltor", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 540, id: 12, library: "SCRATCHING", name: "sc_rtol", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  CUBRIR_ROSTRO: [
    { animId: 542, id: 1, library: "SHOP", name: "ROB_Shifty", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  FUMAR: [
    { animId: 551, id: 1, library: "SMOKING", name: "F_smklean_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 552, id: 2, library: "SMOKING", name: "M_smklean_loop", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 553, id: 3, library: "SMOKING", name: "M_smkstnd_loop", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 554, id: 4, library: "SMOKING", name: "M_smk_drag", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 555, id: 5, library: "SMOKING", name: "M_smk_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 556, id: 6, library: "SMOKING", name: "M_smk_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 557, id: 7, library: "SMOKING", name: "M_smk_tap", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 558, id: 8, library: "SHOP", name: "Smoke_RYD", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SPRAY: [
    { animId: 559, id: 1, library: "SPRAYCAN", name: "spraycan_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 560, id: 2, library: "SPRAYCAN", name: "spraycan_full", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  STRIP: [
    { animId: 561, id: 1, library: "STRIP", name: "PUN_LOOP", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 562, id: 2, library: "STRIP", name: "strip_A", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 563, id: 3, library: "STRIP", name: "strip_B", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 564, id: 4, library: "STRIP", name: "strip_C", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 565, id: 5, library: "STRIP", name: "strip_D", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 566, id: 6, library: "STRIP", name: "strip_E", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 567, id: 7, library: "STRIP", name: "strip_F", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 568, id: 8, library: "STRIP", name: "strip_G", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 569, id: 9, library: "STRIP", name: "STR_A2B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 570, id: 10, library: "STRIP", name: "STR_B2C", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 571, id: 11, library: "STRIP", name: "STR_C1", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 572, id: 12, library: "STRIP", name: "STR_C2", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 573, id: 13, library: "STRIP", name: "STR_C2B", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 574, id: 14, library: "STRIP", name: "STR_Loop_B", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 575, id: 15, library: "STRIP", name: "STR_Loop_C", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  TOMAR_SOL: [
    { animId: 576, id: 1, library: "SUNBATHE", name: "batherdown", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 577, id: 2, library: "SUNBATHE", name: "batherup", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 578, id: 3, library: "SUNBATHE", name: "Lay_Bac_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 579, id: 4, library: "SUNBATHE", name: "Lay_Bac_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 580, id: 5, library: "SUNBATHE", name: "ParkSit_M_IdleA", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 581, id: 6, library: "SUNBATHE", name: "ParkSit_M_IdleB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 582, id: 7, library: "SUNBATHE", name: "ParkSit_M_IdleC", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 583, id: 8, library: "SUNBATHE", name: "ParkSit_M_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 584, id: 9, library: "SUNBATHE", name: "ParkSit_M_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 585, id: 10, library: "SUNBATHE", name: "ParkSit_W_idleA", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 586, id: 11, library: "SUNBATHE", name: "ParkSit_W_idleB", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 587, id: 12, library: "SUNBATHE", name: "ParkSit_W_idleC", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 588, id: 13, library: "SUNBATHE", name: "ParkSit_W_in", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 589, id: 14, library: "SUNBATHE", name: "ParkSit_W_out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 590, id: 15, library: "SUNBATHE", name: "SBATHE_F_LieB2Sit", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 591, id: 16, library: "SUNBATHE", name: "SBATHE_F_Out", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 592, id: 17, library: "SUNBATHE", name: "SitnWait_in_W", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 593, id: 18, library: "SUNBATHE", name: "SitnWait_out_W", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  "VE_ALLÍ": [
    { animId: 595, id: 1, library: "SWAT", name: "swt_lkt", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  PARARSE: [
    { animId: 596, id: 1, library: "SWAT", name: "swt_sty", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SWAT: [
    { animId: 720, id: 1, library: "SWAT", name: "swt_breach_01", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 721, id: 2, library: "SWAT", name: "swt_breach_02", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 722, id: 3, library: "SWAT", name: "swt_breach_03", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 723, id: 4, library: "SWAT", name: "swt_go", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 724, id: 5, library: "SWAT", name: "swt_lkt", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 725, id: 6, library: "SWAT", name: "swt_sty", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 726, id: 7, library: "SWAT", name: "swt_wllpk_L", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 727, id: 8, library: "SWAT", name: "swt_wllpk_L_back", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 728, id: 9, library: "SWAT", name: "swt_wllpk_R", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 729, id: 10, library: "SWAT", name: "swt_wllpk_R_back", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 730, id: 11, library: "SWAT", name: "swt_wllshoot_in_L", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 731, id: 12, library: "SWAT", name: "swt_wllshoot_in_R", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 732, id: 13, library: "SWAT", name: "swt_wllshoot_out_L", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 },
    { animId: 733, id: 14, library: "SWAT", name: "swt_wllshoot_out_R", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 0, psAnim: -1 }
  ],
  AFECTO: [
    { animId: 598, id: 1, library: "SWEET", name: "sweet_hndshldr_01", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  ESPADA: [
    { animId: 601, id: 1, library: "SWORD", name: "sword_IDLE", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  SUBFUSIL: [
    { animId: 608, id: 1, library: "TEC", name: "TEC_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 609, id: 2, library: "TEC", name: "TEC_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 610, id: 3, library: "TEC", name: "TEC_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 611, id: 4, library: "TEC", name: "TEC_reload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 612, id: 5, library: "UZI", name: "UZI_crouchfire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 613, id: 6, library: "UZI", name: "UZI_crouchreload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 614, id: 7, library: "UZI", name: "UZI_fire", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 615, id: 8, library: "UZI", name: "UZI_fire_poor", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 616, id: 9, library: "UZI", name: "UZI_reload", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 1, car: 1, psAnim: -1 }
  ],
  ASOMARSE: [
    { animId: 619, id: 1, library: "WEAPONS", name: "SHP_Tray_Pose", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  LIMPIAR_VENTANA: [
    { animId: 623, id: 1, library: "WUZI", name: "Wuzi_Greet_Wuzi", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  COGER_SUELO: [
    { animId: 624, id: 1, library: "WUZI", name: "Wuzi_grnd_chk", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ],
  DILDO_SEX: [
    { animId: 626, id: 1, library: "SNM", name: "SPANKING_IDLEW", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 627, id: 2, library: "SNM", name: "SPANKING_IDLEP", vel: deltaSpeed, aLoop: 1, lockX: 0, lockY: 0, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 628, id: 3, library: "SNM", name: "SPANKINGW", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 629, id: 4, library: "SNM", name: "SPANKINGP", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 630, id: 5, library: "SNM", name: "SPANKEDW", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 631, id: 6, library: "SNM", name: "SPANKEDP", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 632, id: 7, library: "SNM", name: "SPANKING_ENDW", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 633, id: 8, library: "SNM", name: "SPANKING_ENDP", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 }
  ],
  ORAL_SEX: [
    { animId: 634, id: 1, library: "BLOWJOBZ", name: "BJ_COUCH_START_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 635, id: 2, library: "BLOWJOBZ", name: "BJ_COUCH_START_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 636, id: 3, library: "BLOWJOBZ", name: "BJ_COUCH_LOOP_P", vel: deltaSpeed, aLoop: 0, lockX: 0, lockY: 0, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 637, id: 4, library: "BLOWJOBZ", name: "BJ_COUCH_LOOP_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 638, id: 5, library: "BLOWJOBZ", name: "BJ_COUCH_END_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 639, id: 6, library: "BLOWJOBZ", name: "BJ_COUCH_END_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 640, id: 7, library: "BLOWJOBZ", name: "BJ_STAND_START_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 641, id: 8, library: "BLOWJOBZ", name: "BJ_STAND_START_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 642, id: 9, library: "BLOWJOBZ", name: "BJ_STAND_LOOP_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 643, id: 10, library: "BLOWJOBZ", name: "BJ_STAND_LOOP_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 1, lp: 0, car: 1, psAnim: -1 },
    { animId: 644, id: 11, library: "BLOWJOBZ", name: "BJ_STAND_END_P", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 },
    { animId: 645, id: 12, library: "BLOWJOBZ", name: "BJ_STAND_END_W", vel: deltaSpeed, aLoop: 0, lockX: 1, lockY: 1, freeze: 0, lp: 0, car: 1, psAnim: -1 }
  ]
}

export default animations;