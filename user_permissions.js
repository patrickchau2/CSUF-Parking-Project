import { actions, roles } from "./user_cosnt.js";

const mappings = new Map();

mappings.set(actions.MODIFY_LOT, [roles.ADMIN]);
mappings.set(actions.VIEW_LOT, [roles.ADMIN, roles.COMMUTER, roles.GUEST]);
mappings.set(actions.DELETE_LOT, [roles.ADMIN]);
mappings.set(actions.CREATE_LOT, [roles.ADMIN]);

function hasPermission(roles, action) {
    if (mappings.has(action)) {
      return mappings.get(action).get(roles);
    }
    return false;
  }
  
  export default hasPermission;
  export { actions, roles };