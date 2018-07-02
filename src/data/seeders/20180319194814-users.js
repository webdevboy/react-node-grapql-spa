import Promise from 'bluebird';
import { User, UserRole } from '../models';

const ADMIN_PASSWORD = 'admin';
const DEMO_PASSWORD = 'demo';

export default {
  up: async () => {

    const adminRole = await UserRole.findOne({ where: { name: 'Admin'} });
    const editorRole = await UserRole.findOne({ where: { name: 'Editor'} });
    const advisorRole = await UserRole.findOne({ where: { name: 'Advisor'} });

    await User.bulkCreate([
      {
        email: 'admin@admin.com',
        password: User.generateHash(ADMIN_PASSWORD),
        first_name: 'Super',
        last_name: 'User',
        role_id: adminRole.id,
      },
      {
        email: 'editor@admin.com',
        password: User.generateHash(DEMO_PASSWORD),
        first_name: 'Editor',
        last_name: 'User',
        role_id: editorRole.id,
      },
      {
        email: 'advisor@admin.com',
        password: User.generateHash(DEMO_PASSWORD),
        first_name: 'Advisor',
        last_name: 'User',
        role_id: advisorRole.id,
      }
    ]);

  },

  down: async () => {
    await User.truncate({ cascade: true });
  }
};
