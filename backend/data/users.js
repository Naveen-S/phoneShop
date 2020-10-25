import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('1234', 10),
    isAdmin: true,
  },
  {
    name: 'John doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
  {
    name: 'Jane doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('1234', 10),
  },
];

export default users;
