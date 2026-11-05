import React, { useState } from 'react';
import { Shield, Plus, Trash2, UserCheck, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminRole, AdminUser } from '../../types';

export const AdminUsers: React.FC = () => {
  const { admins, addAdminUser, deleteAdminUser, updateAdminUser, activeAdmin } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('store_manager');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addAdminUser({
      name,
      email,
      role,
      status: 'active',
      lastLogin: undefined,
    });

    setIsAdding(false);
    setName('');
    setEmail('');
  };

  const getRoleLabel = (r: AdminRole) => {
    switch (r) {
      case 'super_admin':
        return 'Super Admin (Full Access)';
      case 'store_manager':
        return 'Store Manager';
      case 'product_manager':
        return 'Product Manager';
      case 'order_manager':
        return 'Order Manager';
      case 'support_manager':
        return 'Support Manager';
      default:
        return r;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Admin Roles & Staff Access Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-Based Access Control (RBAC) governing product, order, and settings permissions.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Close' : 'Add Admin User'}</span>
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Create Staff Administrator</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Staff Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mahir Faisal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Staff Email *</label>
              <input
                type="email"
                required
                placeholder="mahir@shopwave.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AdminRole)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              >
                <option value="super_admin">Super Admin (Unrestricted)</option>
                <option value="store_manager">Store Manager</option>
                <option value="product_manager">Product Manager (Catalog only)</option>
                <option value="order_manager">Order Manager (Fulfillment only)</option>
                <option value="support_manager">Support Manager</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#168DE2] text-white rounded-xl text-xs font-bold"
            >
              Create Account
            </button>
          </div>
        </form>
      )}

      {/* Staff Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Email</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Last Login</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#168DE2]" />
                    <span>{adm.name}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono">{adm.email}</td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    {getRoleLabel(adm.role)}
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {adm.lastLogin ? new Date(adm.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() =>
                        updateAdminUser(adm.id, {
                          status: adm.status === 'active' ? 'inactive' : 'active',
                        })
                      }
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        adm.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {adm.status}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    {adm.email !== 'admin@shopwave.com' && (
                      <button
                        onClick={() => deleteAdminUser(adm.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
