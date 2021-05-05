export const getNameRole = (role) => {
  switch (role) {
    case 'ROLE_USER':
      return 'Client';
    case 'ROLE_ADMIN':
      return 'Administrateur';
    default:
      return 'Aucun role';
  }
};
