import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/admin', destination: '/pages/admin' },
      { source: '/user', destination: '/pages/user' },
      { source: '/admin/login', destination: '/pages/auth/admin' },
      { source: '/user/login', destination: '/pages/auth/user' },
      { source: '/admin/analytics', destination: '/pages/admin/analytics' },
      { source: '/admin/articles', destination: '/pages/admin/articles' },
      { source: '/admin/articles/:id', destination: '/pages/admin/articles/:id' },
      { source: '/admin/events', destination: '/pages/admin/events' },
      { source: '/admin/groups', destination: '/pages/admin/groups' },
      { source: '/admin/notifications', destination: '/pages/admin/notifications' },
      { source: '/admin/users', destination: '/pages/admin/users' },
      { source: '/admin/users/:id', destination: '/pages/admin/users/:id' },
      { source: '/user/events', destination: '/pages/user/events'},
      { source: '/user/groups', destination: '/pages/user/groups'},
      { source: '/user/notifications', destination: '/pages/user/notifications'},
      { source: '/user/generalInformation', destination: '/pages/user/generalInformation'},
      { source: '/user/campusInformation', destination: '/pages/user/campusInformation'},
      { source: '/user/preArrival', destination: '/pages/user/preArrival'},
    ];
  },

};

export default nextConfig;
