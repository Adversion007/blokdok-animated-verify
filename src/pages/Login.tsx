
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Background3D from "@/components/Background3D";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const handleLogin = async (role: 'user' | 'admin') => {
    setIsLoading(true);
    
    try {
      const success = await login(username, password, role);
      
      if (success) {
        toast({
          title: "Login successful!",
          description: `Welcome back, ${username}!`,
        });
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/verify');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Background3D />
      
      <div className="max-w-md w-full px-4 relative z-10">
        <div className="text-center mb-8 animate-float">
          <h1 className="text-4xl font-bold text-gradient mb-2">BlokDok</h1>
          <p className="text-gray-300">Secure Document Verification</p>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid grid-cols-2 w-full rounded-none bg-transparent border-b border-gray-800">
              <TabsTrigger value="user" className="data-[state=active]:text-blokdok-purple data-[state=active]:border-b-2 data-[state=active]:border-blokdok-purple rounded-none py-3">
                User
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:text-blokdok-blue data-[state=active]:border-b-2 data-[state=active]:border-blokdok-blue rounded-none py-3">
                Admin
              </TabsTrigger>
            </TabsList>
            
            {/* User Login */}
            <TabsContent value="user" className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username-user">Username</Label>
                <Input
                  id="username-user"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-user">Password</Label>
                <Input
                  id="password-user"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-gray-700"
                />
              </div>

              <Button 
                onClick={() => handleLogin('user')}
                className="w-full bg-blokdok-purple hover:bg-blokdok-darkPurple" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login as User'}
              </Button>
              
              <div className="text-center text-xs text-gray-400 mt-4">
                <p>* For demo: any non-empty username and password works</p>
              </div>
            </TabsContent>
            
            {/* Admin Login */}
            <TabsContent value="admin" className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username-admin">Admin Username</Label>
                <Input
                  id="username-admin"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-admin">Admin Password</Label>
                <Input
                  id="password-admin"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-gray-700"
                />
              </div>

              <Button 
                onClick={() => handleLogin('admin')} 
                className="w-full bg-blokdok-blue hover:bg-blokdok-blue/80" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login as Admin'}
              </Button>
              
              <div className="text-center text-xs text-gray-400 mt-4">
                <p>* For demo: any non-empty username and password works</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
