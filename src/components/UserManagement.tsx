
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Plus, Search } from "lucide-react";
import { AddUserModal } from "./AddUserModal";
import { useToast } from "@/hooks/use-toast";

export function UserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [users, setUsers] = useState([
    {
      username: "admin1",
      email: "admin@smartstock.com",
      role: "Admin",
      lastLogin: "Today",
      status: "active"
    },
    {
      username: "analyst2",
      email: "analyst@smartstock.com", 
      role: "Analyst",
      lastLogin: "Yesterday",
      status: "active"
    },
    {
      username: "manager3",
      email: "manager@smartstock.com", 
      role: "Manager",
      lastLogin: "2 days ago",
      status: "active"
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (newUser: any) => {
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.username === editingUser.username ? { ...newUser } : user
      ));
      setEditingUser(null);
    } else {
      setUsers(prev => [...prev, newUser]);
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setShowAddModal(true);
  };

  const handleSuspendUser = (username: string) => {
    setUsers(prev => prev.map(user => 
      user.username === username ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user
    ));
    toast({
      title: "User Status Updated",
      description: `User ${username} status has been updated`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>System Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Username</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Role</th>
                  <th className="text-left py-2">Last Login</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.username} className="border-b">
                    <td className="py-3 font-medium">{user.username}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3">{user.lastLogin}</td>
                    <td className="py-3">
                      <Badge className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {user.status === "active" ? "✅ Active" : "❌ Suspended"}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendUser(user.username)}
                        >
                          {user.status === "active" ? "Suspend" : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-20">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Advanced User Management Coming Soon</h2>
        <p className="text-gray-500">Role-based permissions, activity logging, and user analytics.</p>
      </div>

      <AddUserModal
        open={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) setEditingUser(null);
        }}
        onUserAdded={handleAddUser}
        editingUser={editingUser}
      />
    </div>
  );
}
