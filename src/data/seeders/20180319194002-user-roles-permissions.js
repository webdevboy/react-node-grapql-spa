import Promise from 'bluebird';
import { UserPermission, UserRole } from '../models';

export default {
  up: async () => {

    let godMode = await UserPermission.create({
      action:  'GOD_MODE',
      description: 'Allows everything',
      isAllowed: true
    });

    let manage_users = await UserPermission.create({
      action:  'manage_users',
      description: 'Allows managing users',
      isAllowed: true
    });

    let manage_translations = await UserPermission.create({
      action:  'manage_translations',
      description: 'Allows managing translations',
      isAllowed: true
    });

    let manage_emptylegs = await UserPermission.create({
      action:  'manage_emptylegs',
      description: 'Allows managing emptylegs',
      isAllowed: true
    });

    let manage_destinations = await UserPermission.create({
      action:  'manage_destinations',
      description: 'Allows managing destinations',
      isAllowed: true
    });

    let manage_aircrafts = await UserPermission.create({
      action:  'manage_aircrafts',
      description: 'Allows managing aircrafts',
      isAllowed: true
    });

    let manage_airports = await UserPermission.create({
      action:  'manage_airports',
      description: 'Allows managing airports',
      isAllowed: true
    });

    let manage_contacts = await UserPermission.create({
      action:  'manage_contacts',
      description: 'Allows managing contacts',
      isAllowed: true
    });

    let manage_team = await UserPermission.create({
      action:  'manage_team',
      description: 'Allows managing team',
      isAllowed: true
    });

    let manage_pages = await UserPermission.create({
      action:  'manage_pages',
      description: 'Allows managing pages',
      isAllowed: true
    });

    let manage_components = await UserPermission.create({
      action:  'manage_components',
      description: 'Allows managing components',
      isAllowed: true
    });

    let manage_templates = await UserPermission.create({
      action:  'manage_templates',
      description: 'Allows managing templates',
      isAllowed: true
    });

    let manage_articles = await UserPermission.create({
      action:  'manage_articles',
      description: 'Allows managing articles',
      isAllowed: true
    });

    let manage_events = await UserPermission.create({
      action:  'manage_events',
      description: 'Allows managing events',
      isAllowed: true
    });

    let manage_menus = await UserPermission.create({
      action:  'manage_menus',
      description: 'Allows managing menus',
      isAllowed: true
    });

    let manage_chat = await UserPermission.create({
      action:  'manage_chat',
      description: 'Allows managing chat',
      isAllowed: true
    });

    let manage_email_manager = await UserPermission.create({
      action:  'manage_email_manager',
      description: 'Allows managing emails templates',
      isAllowed: true
    });

    let manage_push_notifications = await UserPermission.create({
      action:  'manage_push_notifications',
      description: 'Allows managing push notifications',
      isAllowed: true
    });

    let manage_logs = await UserPermission.create({
      action:  'manage_logs',
      description: 'Allows managing logs',
      isAllowed: true
    });

    let manage_render = await UserPermission.create({
      action:  'manage_render',
      description: 'Allows managing render',
      isAllowed: true
    });

    let manage_admin_translation = await UserPermission.create({
      action:  'manage_admin_translation',
      description: 'Allows managing admin translations',
      isAllowed: true
    });

    let manage_urls = await UserPermission.create({
      action:  'manage_urls',
      description: 'Allows managing urls redirections',
      isAllowed: true
    });

    let manage_media_center = await UserPermission.create({
      action:  'manage_media_center',
      description: 'Allows managing media center',
      isAllowed: true
    });

    /**
     * USER ROLES
     */

    let adminRole = await UserRole.create({
      name: 'Admin',
      description: 'This is a Super user, and has all permissions. Take notice before action!'
    });

    let advisorRole = await UserRole.create({
      name: 'Advisor',
      description: 'The advisor role, will have access to chat only!'
    });

    let editorRole = await UserRole.create({
      name: 'Editor',
      description: 'The editor role, has permissions to create and edit articles!'
    });

    let godRole = await UserRole.create({
      name: 'God',
      description: 'GODLIKE MODE, be carefull with your actions!',
      protected: true
    });

    await adminRole.addPermissions([manage_media_center, manage_users, manage_urls, manage_translations, manage_emptylegs, manage_destinations, manage_aircrafts, manage_airports, manage_contacts, manage_team, manage_pages, manage_components, manage_templates, manage_articles, manage_events, manage_menus, manage_chat, manage_email_manager, manage_push_notifications, manage_logs, manage_render, manage_admin_translation]);
    await advisorRole.addPermissions([manage_emptylegs, manage_pages, manage_templates, manage_articles, manage_events,]);
    await editorRole.addPermissions([manage_destinations, manage_articles, manage_events, manage_urls]);
    await godMode.addRoles([adminRole, advisorRole, editorRole, godRole]);

  },

  down: async () => {
    await UserPermission.truncate({ cascade: true });
    await UserRole.truncate({ cascade: true });
  }
};
