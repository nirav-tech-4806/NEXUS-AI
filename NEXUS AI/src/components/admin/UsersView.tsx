import React, { useState } from 'react';
import { AdminUser } from '../../types/nexus.ts';
import { initialAdminUsers } from '../../data/mockData.ts';
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Ban,
  CheckCircle,
  X,
  Filter,
} from 'lucide-react';

interface UsersViewProps {
  wireframeMode: boolean;
}

export const UsersView: React.FC<UsersViewProps> = ({ wireframeMode }) => {
  const [users, setUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [planFilter, setPlanFilter] = useState<string>('ALL');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPlan, setNewUserPlan] = useState<'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'>('PROFESSIONAL');
  const [newUserRole, setNewUserRole] = useState('Research Fellow');

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = planFilter === 'ALL' || u.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const handleToggleBlock = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      plan: newUserPlan,
      status: 'ACTIVE',
      lastActive: 'Just now',
      joinedDate: new Date().toISOString().split('T')[0],
      role: newUserRole,
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleEditUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Users
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Clean user directory governance & access permissions.
          </p>
        </div>

        {/* Add User Button matching wireframe */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
            wireframeMode
              ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-mono font-medium'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-xs'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Table Container */}
        <div
          className={`rounded-lg border overflow-hidden ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          {/* Search bar inside container matching wireframe */}
          <div
            className={`p-4 border-b flex flex-col sm:flex-row gap-3 items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50'
            }`}
          >
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email..."
                className={`w-full pl-9 pr-3 py-1.5 text-xs rounded border outline-none transition-colors ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white font-mono'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-neutral-400">Plan:</span>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className={`text-xs px-2.5 py-1.5 rounded border outline-none ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white font-mono'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white'
                }`}
              >
                <option value="ALL">All Plans</option>
                <option value="STARTER">Starter</option>
                <option value="PROFESSIONAL">Professional</option>
                <option value="ENTERPRISE">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white text-neutral-900 font-mono'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <tr>
                  <th className="py-3 px-5">USER</th>
                  <th className="py-3 px-5">EMAIL</th>
                  <th className="py-3 px-5">PLAN</th>
                  <th className="py-3 px-5">STATUS</th>
                  <th className="py-3 px-5">LAST ACTIVE</th>
                  <th className="py-3 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors ${
                        user.status === 'BLOCKED' ? 'opacity-60' : ''
                      }`}
                    >
                      <td className="py-3.5 px-5 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="py-3.5 px-5 text-neutral-600 dark:text-neutral-400 font-mono whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="py-3.5 px-5 font-mono font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                        {user.plan}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span
                          className={`font-mono text-[11px] font-semibold ${
                            user.status === 'ACTIVE'
                              ? 'text-emerald-600'
                              : user.status === 'PENDING'
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-neutral-500 dark:text-neutral-400 font-mono whitespace-nowrap">
                        {user.lastActive}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        {/* Actions matching wireframe: View Edit Block */}
                        <div className="flex items-center justify-end gap-2 text-xs">
                          <button
                            onClick={() => setViewingUser(user)}
                            className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium hover:underline"
                          >
                            View
                          </button>
                          <span className="text-neutral-300 dark:text-neutral-700">·</span>
                          <button
                            onClick={() => setEditingUser(user)}
                            className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium hover:underline"
                          >
                            Edit
                          </button>
                          <span className="text-neutral-300 dark:text-neutral-700">·</span>
                          <button
                            onClick={() => handleToggleBlock(user.id)}
                            className={`font-medium hover:underline ${
                              user.status === 'BLOCKED'
                                ? 'text-emerald-600'
                                : 'text-rose-600'
                            }`}
                          >
                            {user.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-400">
                      No users match your query
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold mb-4">Add New Directory User</h3>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Dr. Ada Lovelace"
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. ada@research.org"
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Assigned Plan</label>
                <select
                  value={newUserPlan}
                  onChange={(e) =>
                    setNewUserPlan(
                      e.target.value as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
                    )
                  }
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                >
                  <option value="STARTER">STARTER</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Role / Affiliation</label>
                <input
                  type="text"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View User Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setViewingUser(null)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold mb-3">{viewingUser.name}</h3>

            <div className="space-y-2 text-xs divide-y divide-neutral-100 dark:divide-neutral-800">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Email:</span>
                <span className="font-mono">{viewingUser.email}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Plan:</span>
                <span className="font-mono font-semibold">{viewingUser.plan}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Status:</span>
                <span className="font-mono font-semibold text-emerald-600">
                  {viewingUser.status}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Role:</span>
                <span>{viewingUser.role}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Last Active:</span>
                <span className="font-mono">{viewingUser.lastActive}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Joined Date:</span>
                <span className="font-mono">{viewingUser.joinedDate}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 py-1.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setEditingUser(null)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold mb-4">Edit User Permissions</h3>

            <form onSubmit={handleEditUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-500 mb-1">User Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Plan</label>
                <select
                  value={editingUser.plan}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      plan: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                >
                  <option value="STARTER">STARTER</option>
                  <option value="PROFESSIONAL">PROFESSIONAL</option>
                  <option value="ENTERPRISE">ENTERPRISE</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Status</label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PENDING">PENDING</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
