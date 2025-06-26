
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Edit, Wallet, Phone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  mobile: string;
  walletBalance: number;
  email: string;
  createdAt: Date;
}

const AdminUserManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      mobile: '+91 9876543210',
      email: 'john@example.com',
      walletBalance: 500,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Jane Smith',
      mobile: '+91 8765432109',
      email: 'jane@example.com',
      walletBalance: 1200,
      createdAt: new Date()
    }
  ]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditBalanceOpen, setIsEditBalanceOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    mobile: '',
    email: '',
    walletBalance: 0
  });
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [balanceAction, setBalanceAction] = useState<'add' | 'set'>('add');

  const handleAddUser = () => {
    if (!newUser.name || !newUser.mobile || !newUser.email) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!/^\+91\s\d{10}$/.test(newUser.mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid mobile number in format: +91 XXXXXXXXXX",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date()
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', mobile: '', email: '', walletBalance: 0 });
    setIsAddUserOpen(false);
    
    toast({
      title: "User Added",
      description: `${user.name} has been successfully added`,
    });
  };

  const handleBalanceUpdate = () => {
    if (!selectedUser) return;

    setUsers(prev => prev.map(user => {
      if (user.id === selectedUser.id) {
        const newBalance = balanceAction === 'add' 
          ? user.walletBalance + balanceAmount
          : balanceAmount;
        return { ...user, walletBalance: Math.max(0, newBalance) };
      }
      return user;
    }));

    toast({
      title: "Balance Updated",
      description: `${selectedUser.name}'s wallet balance has been updated`,
    });

    setIsEditBalanceOpen(false);
    setSelectedUser(null);
    setBalanceAmount(0);
  };

  const openBalanceEdit = (user: User) => {
    setSelectedUser(user);
    setBalanceAmount(0);
    setIsEditBalanceOpen(true);
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const totalUsers = users.length;
  const totalWalletBalance = users.reduce((sum, user) => sum + user.walletBalance, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                User Management
              </h1>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalWalletBalance}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₹{totalUsers > 0 ? Math.round(totalWalletBalance / totalUsers) : 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                User Management
              </CardTitle>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Enter user details to create a new account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        value={newUser.mobile}
                        onChange={(e) => setNewUser(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="walletBalance">Initial Wallet Balance</Label>
                      <Input
                        id="walletBalance"
                        type="number"
                        value={newUser.walletBalance}
                        onChange={(e) => setNewUser(prev => ({ ...prev, walletBalance: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>Add User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Wallet Balance</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        {user.mobile}
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">₹{user.walletBalance}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openBalanceEdit(user)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit Balance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Balance Dialog */}
        <Dialog open={isEditBalanceOpen} onOpenChange={setIsEditBalanceOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Wallet Balance</DialogTitle>
              <DialogDescription>
                Update wallet balance for {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Current Balance: ₹{selectedUser?.walletBalance}</Label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={balanceAction === 'add' ? 'default' : 'outline'}
                  onClick={() => setBalanceAction('add')}
                  className="flex-1"
                >
                  Add Money
                </Button>
                <Button
                  variant={balanceAction === 'set' ? 'default' : 'outline'}
                  onClick={() => setBalanceAction('set')}
                  className="flex-1"
                >
                  Set Balance
                </Button>
              </div>
              <div>
                <Label htmlFor="amount">
                  {balanceAction === 'add' ? 'Amount to Add' : 'New Balance'}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(parseInt(e.target.value) || 0)}
                  placeholder="Enter amount"
                  min="0"
                />
              </div>
              {balanceAction === 'add' && (
                <p className="text-sm text-gray-600">
                  New balance will be: ₹{(selectedUser?.walletBalance || 0) + balanceAmount}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditBalanceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleBalanceUpdate}>Update Balance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminUserManagement;
