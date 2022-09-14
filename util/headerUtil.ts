const getActiveMenu = (path: string) => {
  const headerkey: { [key: string]: string } = {
    admin: 'admin',
    pdesk: 'pdesk',
    tdeskAS: 'tdeskAS'
  };

  const pathArray = path.split('/');
  return headerkey[pathArray[1]];
};

export { getActiveMenu };
