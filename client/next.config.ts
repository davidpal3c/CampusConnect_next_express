import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [

      // Admin pages
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

      // User pages
      { source: '/user/events', destination: '/pages/user/events'},
      { source: '/user/groups', destination: '/pages/user/groups'},
      { source: '/user/articles', destination: '/pages/user/articles'},
      { source: '/user/articles/:id', destination: '/pages/user/articles/:id'},
    ];
  },

};

export default nextConfig;
