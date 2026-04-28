export const Permissions = {
  USER: {
    name: "USER",
    level: 1, 
    bitfield: 1 << 0,
    permissions: ["view_dashboard"]
  },
  JUNIOR_ADMIN: {
    name: "JUNIOR_ADMIN",
    level: 2, 
    bitfield: 1 << 1,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets"]
  },
  SEMI_SENIOR_STAFF: {
    name: "SEMI_SENIOR_STAFF",
    level: 3, 
    bitfield: 1 << 2,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets", "manage_users"]
  },
  SENIOR_STAFF: {
    name: "SENIOR_STAFF",
    level: 4, 
    bitfield: 1 << 3,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets", "manage_users", "view_audit_log"]
  },
  LEAD_TEAM: {
    name: "LEAD_TEAM",
    level: 5, 
    bitfield: 1 << 4,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets", "manage_users", "view_audit_log", "manage_roles"]
  },
  MANAGEMENT_TEAM: {
    name: "MANAGEMENT_TEAM",
    level: 7, 
    bitfield: 1 << 5,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets", "manage_users", "view_audit_log", "manage_roles", "certify_users", "manage_server_settings"]
  },
  /*
  DEVELOPMENT_TEAM: {
    name: "DEVELOPMENT_TEAM",
    level: 1337, 
    bitfield: 1 << 3 << 3 << 7,
    permissions: ["view_dashboard", "manage_reports", "manage_tickets", "manage_users", "view_audit_log", "manage_roles", "certify_users", "manage_server_settings", "access_developer_tools"]
  },
  */
} as const;