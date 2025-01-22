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
      { source: '/admin/events', destination: '/pages/admin/events' },
      { source: '/admin/groups', destination: '/pages/admin/groups' },
      { source: '/admin/notifications', destination: '/pages/admin/notifications' },
      { source: '/admin/users', destination: '/pages/admin/users' },
      { source: '/admin/users/:id', destination: '/pages/admin/users/:id' },
    ];
  },

};

export default nextConfig;
