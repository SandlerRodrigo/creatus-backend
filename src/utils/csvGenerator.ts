const generateCSV = (users: { name: string; email: string; level: number }[]) => {
  return users.map((user) => `${user.name},${user.email},${user.level}`).join('\n');
};

export default generateCSV;