export type TInteriorTypes = "24/7" | "Modding shop" | "Casino" | "Clothing shop" | "Restaurant" | "Bar" | "Barber" | "Sexshop" | "Tattoo" | "Burglary house" | "Ammunation" | "Safe house" | "Girlfriend related" | "Department" | "Stadium" | "School" | "Gym" | "Club" | "Brothel" | "Warehouse" | "Cutscene/Mission" | "Non-categorized";
export type TInteriorSizes = "Small" | "Medium" | "Big" | "Huge";


export interface IPropsInterior {
    name: string;
    interiorId: number;
    type: TInteriorTypes;
    size: TInteriorSizes;
    x: number;
    y: number;
    z: number;
}


// https://www.open.mp/docs/scripting/resources/interiorids

export const INTERIOR_LIST: Record<string, IPropsInterior> = {

    // 24/7's.
    "247_001": { name: "24/7 1", interiorId: 17, type: "24/7", size: "Medium", x: -25.7220, y: -187.8216, z: 1003.5469 },
    "247_002": { name: "24/7 2", interiorId: 10, type: "24/7", size: "Big",    x: 6.0856,   y: -28.8966,  z: 1003.5494 },
    "247_003": { name: "24/7 3", interiorId: 18, type: "24/7", size: "Big",    x: -30.9875, y: -89.6806,  z: 1003.5469 },
    "247_004": { name: "24/7 4", interiorId: 16, type: "24/7", size: "Big",    x: -26.1856, y: -140.9164, z: 1003.5469 },
    "247_005": { name: "24/7 5", interiorId: 4,  type: "24/7", size: "Medium", x: -27.844,  y: -26.6737,  z: 1003.5573 },
    "247_006": { name: "24/7 6", interiorId: 6,  type: "24/7", size: "Small",  x: -26.8339, y: -55.5846,  z: 1003.5469 },


    // Modding shops.
    "MOD_SHOP_001": { name: "Loco Low Co.",      interiorId: 2, type: "Modding shop", size: "Small",  x: 611.3536, y: -77.5574,  z: 997.9995  },
    "MOD_SHOP_002": { name: "Wheel Arch Angels", interiorId: 3, type: "Modding shop", size: "Medium", x: 612.2191, y: -123.9028, z: 997.9922  },
    "MOD_SHOP_003": { name: "Transfender",       interiorId: 1, type: "Modding shop", size: "Huge",   x: 621.4528, y: -23.7289,  z: 1000.9219 },


    // Casinos.
    "CASINO_001": { name: "Four Dragons",           interiorId: 10, type: "Casino", size: "Huge", x: 2016.1156, y: 1017.1541, z: 996.875   },
    "CASINO_002": { name: "Casino (Redsands West)", interiorId: 12, type: "Casino", size: "Huge", x: 1000.6797, y: 1133.35,   z: -7.8462   },
    "CASINO_003": { name: "Caligula's Casino",      interiorId: 1,  type: "Casino", size: "Huge", x: 2233.9363, y: 1711.8038, z: 1011.6312 },
    "CASINO_004": { name: "Caligula's Roof",        interiorId: 1,  type: "Casino", size: "Huge", x: 2268.5156, y: 1647.7682, z: 1084.2344 },


    // Clothing Shops.
    "CLOTH_SHOP_001": { name: "Victim",       interiorId: 5,  type: "Clothing shop", size: "Medium", x: 225.0306, y: -9.1838,   z: 1002.218  },
    "CLOTH_SHOP_002": { name: "Sub Urban",    interiorId: 1,  type: "Clothing shop", size: "Medium", x: 204.1174, y: -46.8047,  z: 1001.8047 },
    "CLOTH_SHOP_003": { name: "Zip",          interiorId: 18, type: "Clothing shop", size: "Medium", x: 161.4048, y: -94.2416,  z: 1001.8047 },
    "CLOTH_SHOP_004": { name: "Didier Sachs", interiorId: 14, type: "Clothing shop", size: "Medium", x: 204.1658, y: -165.7678, z: 1000.5234 },
    "CLOTH_SHOP_005": { name: "Binco",        interiorId: 15, type: "Clothing shop", size: "Medium", x: 207.5219, y: -109.7448, z: 1005.1328 },
    "CLOTH_SHOP_006": { name: "Pro-Laps",     interiorId: 3,  type: "Clothing shop", size: "Medium", x: 206.4627, y: -137.7076, z: 1003.0938 },

    
    // Restaurants.
    "RESTAURANT_001": { name: "Pizza Stack",          interiorId: 5,  type: "Restaurant", size: "Medium", x: 372.5565,  y: -131.3607, z: 1001.4922 },
    "RESTAURANT_002": { name: "Rusty Brown's Donuts", interiorId: 17, type: "Restaurant", size: "Medium", x: 378.026,   y: -190.5155, z: 1000.6328 },
    "RESTAURANT_003": { name: "Burger Shot",          interiorId: 10, type: "Restaurant", size: "Medium", x: 366.0248,  y: -73.3478,  z: 1001.5078 },
    "RESTAURANT_004": { name: "Cluckin' Bell",        interiorId: 9,  type: "Restaurant", size: "Medium", x: 366.0002,  y: -9.4338,   z: 1001.8516 },


    // Bars.
    "BAR_001": { name: "Bar",            interiorId: 11, type: "Bar", size: "Big",    x: 501.9578,  y: -70.5648,  z: 998.7578 },
    "BAR_002": { name: "Lil' Probe Inn", interiorId: 18, type: "Bar", size: "Medium", x: -227.5703, y: 1401.5544, z: 27.7656  },


    // Barber.
    "BARBER_001": { name: "Barber shop 1", interiorId: 12, type: "Barber", size: "Small", x: 411.9707,  y: -51.9217, z: 1001.8984 },
    "BARBER_002": { name: "Barber shop 2", interiorId: 2,  type: "Barber", size: "Small", x: 414.2987,  y: -18.8044, z: 1001.8047 },
    "BARBER_003": { name: "Barber shop 3", interiorId: 3,  type: "Barber", size: "Small", x: 418.4666,  y: -80.4595, z: 1001.8047 },


    // Tattoo.
    "TATTOO_001": { name: "Tattoo sarlor", interiorId: 3, type: "Tattoo", size: "Small", x: -201.2236, y: -43.2465, z: 1002.2734 },


    // Sex shops.
    "SEX_SHOP_001": { name: "Sex shop", interiorId: 3, type: "Sexshop", size: "Medium", x: -100.2674, y: -22.9376, z: 1000.7188 },


    // Burglary houses.
    "BURGLARY_001": { name: "Burglary house 1",  interiorId: 3,  type: "Burglary house", size: "Big",    x: 234.6087,  y: 1187.8195, z: 1080.2578 },
    "BURGLARY_002": { name: "Burglary house 2",  interiorId: 2,  type: "Burglary house", size: "Medium", x: 225.5707,  y: 1240.0643, z: 1082.1406 },
    "BURGLARY_003": { name: "Burglary house 3",  interiorId: 1,  type: "Burglary house", size: "Small",  x: 224.288,   y: 1289.1907, z: 1082.1406 },
    "BURGLARY_004": { name: "Burglary house 4",  interiorId: 5,  type: "Burglary house", size: "Small",  x: 239.2819,  y: 1114.1991, z: 1080.9922 },
    "BURGLARY_005": { name: "Burglary house 5",  interiorId: 15, type: "Burglary house", size: "Medium", x: 295.1391,  y: 1473.3719, z: 1080.2578 },
    "BURGLARY_006": { name: "Burglary house 6",  interiorId: 2,  type: "Burglary house", size: "Big",    x: 446.626,   y: 1397.738,  z: 1084.3047 },
    "BURGLARY_007": { name: "Burglary house 7",  interiorId: 5,  type: "Burglary house", size: "Small",  x: 227.7559,  y: 1114.3844, z: 1080.9922 },
    "BURGLARY_008": { name: "Burglary house 8",  interiorId: 4,  type: "Burglary house", size: "Big",    x: 261.1165,  y: 1287.2197, z: 1080.2578 },
    "BURGLARY_009": { name: "Burglary house 9",  interiorId: 10, type: "Burglary house", size: "Big",    x: 24.3769,   y: 1341.1829, z: 1084.375  },
    "BURGLARY_010": { name: "Burglary house 10", interiorId: 4,  type: "Burglary house", size: "Medium", x: 221.6766,  y: 1142.4962, z: 1082.6094 },
    "BURGLARY_011": { name: "Burglary house 11", interiorId: 4,  type: "Burglary house", size: "Big",    x: -262.1759, y: 1456.6158, z: 1084.3672 },
    "BURGLARY_012": { name: "Burglary house 12", interiorId: 5,  type: "Burglary house", size: "Big",    x: 22.861,    y: 1404.9165, z: 1084.4297 },
    "BURGLARY_013": { name: "Burglary house 13", interiorId: 5,  type: "Burglary house", size: "Big",    x: 140.3679,  y: 1367.8837, z: 1083.8621 },
    "BURGLARY_014": { name: "Burglary house 14", interiorId: 6,  type: "Burglary house", size: "Big",    x: 234.2826,  y: 1065.229,  z: 1084.2101 },
    "BURGLARY_015": { name: "Burglary house 15", interiorId: 6,  type: "Burglary house", size: "Small",  x: -68.5145,  y: 1353.8485, z: 1080.2109 },
    "BURGLARY_016": { name: "Burglary house 16", interiorId: 15, type: "Burglary house", size: "Big",    x: -285.2511, y: 1471.197,  z: 1084.375  },
    "BURGLARY_017": { name: "Burglary house 17", interiorId: 8,  type: "Burglary house", size: "Small",  x: -42.5267,  y: 1408.23,   z: 1084.4297 },
    "BURGLARY_018": { name: "Burglary house 18", interiorId: 9,  type: "Burglary house", size: "Big",    x: 84.9244,   y: 1324.2983, z: 1083.8594 },
    "BURGLARY_019": { name: "Burglary house 19", interiorId: 9,  type: "Burglary house", size: "Medium", x: 260.7421,  y: 1238.2261, z: 1084.2578 },


    // Ammunations.
    "AMMU_001": { name: "Ammu-nation 1", interiorId: 7, type: "Ammunation", size: "Big",   x: 315.244,  y: -140.8858, z: 999.6016  },
    "AMMU_002": { name: "Ammu-nation 2", interiorId: 1, type: "Ammunation", size: "Big",   x: 285.8361, y: -39.0166,  z: 1001.5156 },
    "AMMU_003": { name: "Ammu-nation 3", interiorId: 4, type: "Ammunation", size: "Big",   x: 291.7626, y: -80.1306,  z: 1001.5156 },
    "AMMU_004": { name: "Ammu-nation 4", interiorId: 6, type: "Ammunation", size: "Big",   x: 297.144,  y: -109.8702, z: 1001.5156 },
    "AMMU_005": { name: "Ammu-nation 5", interiorId: 6, type: "Ammunation", size: "Small", x: 316.5025, y: -167.6272, z: 999.5938  },


    // Safe houses.
    "SAFE_001": { name: "The Johnson house",         interiorId: 3,  type: "Safe house", size: "Big",    x: 2496.0549, y: -1695.1749, z: 1014.7422 },
    "SAFE_002": { name: "Angel Pine trailer",        interiorId: 2,  type: "Safe house", size: "Small",  x: 1.1853,    y: -3.2387,    z: 999.4284  },
    "SAFE_003": { name: "Abandoned AC tower",        interiorId: 10, type: "Safe house", size: "Small",  x: 419.8936,  y: 2537.1155,  z: 10.0000   },
    "SAFE_004": { name: "Wardrobe/Changing room",    interiorId: 14, type: "Safe house", size: "Small",  x: 256.9047,  y: -41.6537,   z: 1002.0234 },
    "SAFE_005": { name: "The Camel's Toe safehouse", interiorId: 1,  type: "Safe house", size: "Small",  x: 2216.1282, y: -1076.3052, z: 1050.4844 },
    "SAFE_006": { name: "Verdant Bluffs safehouse",  interiorId: 8,  type: "Safe house", size: "Medium", x: 2365.1089, y: -1133.0795, z: 1050.875  },
    "SAFE_007": { name: "Willowfield safehouse",     interiorId: 11, type: "Safe house", size: "Small",  x: 2282.9766, y: -1140.2861, z: 1050.8984 },
    "SAFE_008": { name: "Unused safe house",         interiorId: 12, type: "Safe house", size: "Big",    x: 2323.7063, y: -1147.6509, z: 1050.7101 },
    "SAFE_009": { name: "Safehouse 1",               interiorId: 5,  type: "Safe house", size: "Small",  x: 2233.6919, y: -1112.8107, z: 1050.8828 },
    "SAFE_010": { name: "Safehouse 3",               interiorId: 9,  type: "Safe house", size: "Big",    x: 2319.1272, y: -1023.9562, z: 1050.2109 },
    "SAFE_011": { name: "Safehouse 4",               interiorId: 10, type: "Safe house", size: "Medium", x: 2261.0977, y: -1137.8833, z: 1050.6328 },


    // Girlfriend related.
    "GF_RELATED_001": { name: "Denise's house",      interiorId: 1, type: "Girlfriend related", size: "Small",  x: 245.2307, y: 304.7632, z: 999.1484  },
    "GF_RELATED_002": { name: "Helena's barn",       interiorId: 3, type: "Girlfriend related", size: "Small",  x: 290.623,  y: 309.0622, z: 999.1484  },
    "GF_RELATED_003": { name: "Barbara's \"house\"", interiorId: 5, type: "Girlfriend related", size: "Medium", x: 322.5014, y: 303.6906, z: 999.1484  },
    "GF_RELATED_004": { name: "Katie's house",       interiorId: 2, type: "Girlfriend related", size: "Small",  x: 269.6405, y: 305.9512, z: 999.1484  },
    "GF_RELATED_005": { name: "Michelle's house",    interiorId: 4, type: "Girlfriend related", size: "Medium", x: 306.1966, y: 307.819,  z: 1003.3047 },


    // Departments.
    "DEPT_001": { name: "Planning Department",            interiorId: 3,  type: "Department", size: "Big",  x: 386.5259, y: 173.6381, z: 1008.3828 },
    "DEPT_002": { name: "Las Venturas Police Department", interiorId: 3,  type: "Department", size: "Big",  x: 288.4723, y: 170.0647, z: 1007.1794 },
    "DEPT_003": { name: "Los Santos Police Department",   interiorId: 6,  type: "Department", size: "Big",  x: 246.6695, y: 65.8039,  z: 1003.6406 },
    "DEPT_004": { name: "San Fierro Police Department",   interiorId: 10, type: "Department", size: "Big",  x: 246.0688, y: 108.9703, z: 1003.2188 },
    

    // Stadiums.
    "STADIUM_001": { name: "Oval Stadium",       interiorId: 1,  type: "Stadium", size: "Huge", x: -1402.6613, y: 106.3897,  z: 1032.273  },
    "STADIUM_002": { name: "Vice Stadium",       interiorId: 16, type: "Stadium", size: "Huge", x: -1401.067,  y: 1265.3706, z: 1039.8672 },
    "STADIUM_003": { name: "Blood Bowl Stadium", interiorId: 15, type: "Stadium", size: "Huge", x: -1417.8927, y: 932.4482,  z: 1041.5313 },


    // Schools.
    "SCHOOL_001": { name: "Bike school",    interiorId: 3, type: "School", size: "Medium", x: 1494.8589,  y: 1306.48,   z: 1093.2953 },
    "SCHOOL_002": { name: "Driving school", interiorId: 3, type: "School", size: "Medium", x: -2031.1196, y: -115.8287, z: 1035.1719 },


    // GYMs.
    "GYM_001": { name: "Ganton Gym",         interiorId: 5, type: "Gym", size: "Big", x: 770.8033, y: -0.7033,  z: 1000.7267 },
    "GYM_002": { name: "Cobra Gym",          interiorId: 3, type: "Gym", size: "Big", x: 773.8887, y: -47.7698, z: 1000.5859 },
    "GYM_003": { name: "Below The Belt Gym", interiorId: 1, type: "Gym", size: "Big", x: 773.7318, y: -74.6957, z: 1000.6542 },


    // Clubs.
    "CLUB_001": { name: "The Big Spread Ranch", interiorId: 3,  type: "Club", size: "Big", x: 1212.1489, y: -28.5388,  z: 1000.9531 },
    "CLUB_002": { name: "The Pig Pen",          interiorId: 2,  type: "Club", size: "Big", x: 1204.668,  y: -13.5429,  z: 1000.9219 },
    "CLUB_003": { name: "Club",                 interiorId: 17, type: "Club", size: "Big", x: 493.1443,  y: -24.2607,  z: 1000.6797 },


    // Brothels.
    "BROTHEL_001": { name: "Brothel 1",                  interiorId: 3, type: "Brothel", size: "Medium", x: 974.0177,  y: -9.5937,   z: 1001.1484 },
    "BROTHEL_002": { name: "Brothel 2",                  interiorId: 3, type: "Brothel", size: "Medium", x: 961.9308,  y: -51.9071,  z: 1001.1172 },
    "BROTHEL_003": { name: "Fanny Batter's Whore House", interiorId: 6, type: "Brothel", size: "Medium", x: 748.4623,  y: 1438.2378, z: 1102.9531 },
    

    // Warehouses.
    "WAREHOUSE_001": { name: "Warehouse 1", interiorId: 18, type: "Warehouse", size: "Huge", x: 1290.4106, y: 1.9512,  z: 1001.0201 },
    "WAREHOUSE_002": { name: "Warehouse 2", interiorId: 1,  type: "Warehouse", size: "Huge", x: 1412.1472, y: -2.2836, z: 1000.9241 },


    // Cutscene & Missions.
    "CUT_MISSION_001": { name: "Inside Track Betting",           interiorId: 3,  type: "Cutscene/Mission", size: "Big",    x: 830.6016,   y: 5.9404,     z: 1004.1797 },
    "CUT_MISSION_002": { name: "Blastin' Fools Records",         interiorId: 3,  type: "Cutscene/Mission", size: "Big",    x: 1037.8276,  y: 0.397,      z: 1001.2845 },
    "CUT_MISSION_003": { name: "B Dup's Apartment",              interiorId: 3,  type: "Cutscene/Mission", size: "Medium", x: 1527.0468,  y: -12.0236,   z: 1002.0971 },
    "CUT_MISSION_004": { name: "OG Loc's House",                 interiorId: 3,  type: "Cutscene/Mission", size: "Medium", x: 512.9291,   y: -11.6929,   z: 1001.5653 },
    "CUT_MISSION_005": { name: "The Pleasure Domes",             interiorId: 3,  type: "Cutscene/Mission", size: "Huge",   x: -2638.8232, y: 1407.3395,  z: 906.4609  },
    "CUT_MISSION_006": { name: "B Dup's Crack Palace",           interiorId: 2,  type: "Cutscene/Mission", size: "Small",  x: 1523.5098,  y: -47.8211,   z: 1002.2699 },
    "CUT_MISSION_007": { name: "Ryder's house",                  interiorId: 2,  type: "Cutscene/Mission", size: "Medium", x: 2447.8704,  y: -1704.4509, z: 1013.5078 },
    "CUT_MISSION_008": { name: "Big Smoke's Crack Palace",       interiorId: 2,  type: "Cutscene/Mission", size: "Big",    x: 2536.5322,  y: -1294.8425, z: 1044.125  },
    "CUT_MISSION_009": { name: "Rosenberg's Office",             interiorId: 2,  type: "Cutscene/Mission", size: "Medium", x: 2182.2017,  y: 1628.5848,  z: 1043.8723 },
    "CUT_MISSION_010": { name: "Sweet's House",                  interiorId: 1,  type: "Cutscene/Mission", size: "Medium", x: 2527.0176,  y: -1679.2076, z: 1015.4986 },
    "CUT_MISSION_011": { name: "Wu-Zi Mu's",                     interiorId: 1,  type: "Cutscene/Mission", size: "Medium", x: -2158.6731, y: 642.09,     z: 1052.375  },
    "CUT_MISSION_012": { name: "Liberty City",                   interiorId: 1,  type: "Cutscene/Mission", size: "Big",    x: -741.8495,  y: 493.0036,   z: 1371.9766 },
    "CUT_MISSION_013": { name: "San Fierro Garage",              interiorId: 1,  type: "Cutscene/Mission", size: "Big",    x: -2041.2334, y: 178.3969,   z: 28.8465   },
    "CUT_MISSION_014": { name: "The Welcome Pump",               interiorId: 1,  type: "Cutscene/Mission", size: "Medium", x: 681.6216,   y: -451.8933,  z: -25.6172  },
    "CUT_MISSION_015": { name: "World of Coq",                   interiorId: 1,  type: "Cutscene/Mission", size: "Big",    x: 445.6003,   y: -6.9823,    z: 1000.7344 },
    "CUT_MISSION_016": { name: "Sindacco Abatoir",               interiorId: 1,  type: "Cutscene/Mission", size: "Huge",   x: 963.0586,   y: 2159.7563,  z: 1011.0303 },
    "CUT_MISSION_017": { name: "Jet Interior",                   interiorId: 1,  type: "Cutscene/Mission", size: "Small",  x: 1.5491,     y: 23.3183,    z: 1199.5938 },
    "CUT_MISSION_018": { name: "Los Santos Airport",             interiorId: 14, type: "Cutscene/Mission", size: "Big",    x: -1864.9434, y: 55.7325,    z: 1055.5276 },
    "CUT_MISSION_019": { name: "Kickstart Stadium",              interiorId: 14, type: "Cutscene/Mission", size: "Huge",   x: -1420.4277, y: 1616.9221,  z: 1052.5313 },
    "CUT_MISSION_020": { name: "Francis International Airport",  interiorId: 14, type: "Cutscene/Mission", size: "Huge",   x: -1813.213,  y: -58.012,    z: 1058.9641 },
    "CUT_MISSION_021": { name: "Four Dragons' Janitor's Office", interiorId: 10, type: "Cutscene/Mission", size: "Small",  x: 1893.0731,  y: 1017.8958,  z: 31.8828   },
    "CUT_MISSION_022": { name: "RC Battlefield",                 interiorId: 10, type: "Cutscene/Mission", size: "Huge",   x: -1129.8909, y: 1057.5424,  z: 1346.4141 },
    "CUT_MISSION_023": { name: "Jefferson Motel",                interiorId: 15, type: "Cutscene/Mission", size: "Huge",   x: 2217.281,   y: -1150.5349, z: 1025.7969 },
    "CUT_MISSION_024": { name: "8-Track Stadium",                interiorId: 7,  type: "Cutscene/Mission", size: "Huge",   x: -1403.0116, y: -250.4526,  z: 1043.5341 },
    "CUT_MISSION_025": { name: "Dirtbike Stadium",               interiorId: 4,  type: "Cutscene/Mission", size: "Huge",   x: -1421.5618, y: -663.8262,  z: 1059.5569 },
    "CUT_MISSION_026": { name: "Crack Den",                      interiorId: 5,  type: "Cutscene/Mission", size: "Big",    x: 322.1117,   y: 1119.3270,  z: 1083.8830 },
    "CUT_MISSION_027": { name: "Jays Diner",                     interiorId: 5,  type: "Cutscene/Mission", size: "Big",    x: 454.9853,   y: -107.2548,  z: 999.4376  },
    "CUT_MISSION_028": { name: "Madd Dogg's Mansion",            interiorId: 5,  type: "Cutscene/Mission", size: "Huge",   x: 1267.8407,  y: -776.9587,  z: 1091.9063 },
    "CUT_MISSION_029": { name: "Burning Desire Building",        interiorId: 5,  type: "Cutscene/Mission", size: "Big",    x: 2350.1597,  y: -1181.0658, z: 1027.9766 },
    "CUT_MISSION_030": { name: "Zero's RC Shop",                 interiorId: 6,  type: "Cutscene/Mission", size: "Medium", x: -2240.1028, y: 136.973,    z: 1035.4141 },
    "CUT_MISSION_031": { name: "Secret Valley Diner",            interiorId: 6,  type: "Cutscene/Mission", size: "Big",    x: 442.1295,   y: -52.4782,   z: 999.7167  },
    "CUT_MISSION_032": { name: "Sherman Dam",                    interiorId: 17, type: "Cutscene/Mission", size: "Huge",   x: -944.2402,  y: 1886.1536,  z: 5.0051    },
    "CUT_MISSION_033": { name: "Colonel Furhberger's",           interiorId: 8,  type: "Cutscene/Mission", size: "Medium", x: 2807.3604,  y: -1171.7048, z: 1025.5703 },
    "CUT_MISSION_034": { name: "Atrium",                         interiorId: 18, type: "Cutscene/Mission", size: "Huge",   x: 1727.2853,  y: -1642.9451, z: 20.2254   },
    "CUT_MISSION_035": { name: "Andromada",                      interiorId: 9,  type: "Cutscene/Mission", size: "Big",    x: 315.4544,   y: 976.5972,   z: 1960.8511 },
    "CUT_MISSION_036": { name: "Palomino Bank",                  interiorId: 0,  type: "Cutscene/Mission", size: "Big",    x: 2306.3826,  y: -15.2365,   z: 26.7496   },
    "CUT_MISSION_037": { name: "Dillimore Gas Station",          interiorId: 0,  type: "Cutscene/Mission", size: "Small",  x: 663.0588,   y: -573.6274,  z: 16.3359   },


    // Non-categorized.
    "NON_CAT_001":  { name: "Random House",          interiorId: 2,  type: "Non-categorized", size: "Big",    x: 2236.6997, y: -1078.9478, z: 1049.0234 },
    "NON_CAT_002":  { name: "Budget Inn Motel Room", interiorId: 12, type: "Non-categorized", size: "Medium", x: 446.3247,  y: 509.9662,   z: 1001.4195 }

} as const;