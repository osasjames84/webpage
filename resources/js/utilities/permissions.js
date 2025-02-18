export const hasPermission = (permission, permissions = []) => {
    return permissions.includes(permission);
};
