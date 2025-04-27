
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Background3D from "@/components/Background3D";
import { useAuth } from "@/contexts/AuthContext";
import { generateDocumentHash, storeDocumentHash, getBlockchainInfo } from "@/services/blockchainService";
import { FileCheck } from "lucide-react";

const Admin = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isStoring, setIsStoring] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, role, username, logout } = useAuth();
  
  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated || role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, role, navigate]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileHash(null);
    }
  };
  
  const handleGenerateHash = async () => {
    if (!file) return;
    
    setIsGenerating(true);
    
    try {
      const hash = await generateDocumentHash(file);
      setFileHash(hash);
      
      toast({
        title: "Hash Generated",
        description: `Document hash has been successfully generated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hash Generation Failed",
        description: "Failed to generate document hash. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleStoreHash = async () => {
    if (!fileHash || !username) return;
    
    setIsStoring(true);
    
    try {
      const success = storeDocumentHash(fileHash, username);
      
      if (success) {
        toast({
          title: "Hash Stored",
          description: "Document hash has been successfully stored on the blockchain.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Hash Already Exists",
          description: "This document has already been registered on the blockchain.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Storage Failed",
        description: "Failed to store document hash. Please try again.",
      });
    } finally {
      setIsStoring(false);
    }
  };
  
  const blockchainInfo = getBlockchainInfo();

  return (
    <div className="min-h-screen w-full">
      <Background3D />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {username}</span>
            <Button variant="outline" onClick={() => navigate('/verify')} className="border-blokdok-blue text-blokdok-blue hover:bg-blokdok-blue/10">
              Verify Documents
            </Button>
            <Button variant="ghost" onClick={logout}>Logout</Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{blockchainInfo.hashCount}</p>
              <p className="text-sm text-gray-400">Documents registered</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <p>Blockchain network active</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Admin</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blokdok-purple">{username}</p>
              <p className="text-sm text-gray-400">Full access</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="document"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="document"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <FileCheck className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-lg font-medium mb-2">
                      {file ? file.name : "Click to select a document"}
                    </p>
                    <p className="text-sm text-gray-400">
                      PDF, DOC, DOCX, JPG or PNG
                    </p>
                  </label>
                </div>
                
                <Button
                  onClick={handleGenerateHash}
                  className="w-full bg-blokdok-purple hover:bg-blokdok-darkPurple"
                  disabled={!file || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Hash"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Document Hash</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="font-mono text-sm break-all select-all">
                  {fileHash || "No hash generated yet. Please upload a document and generate a hash."}
                </p>
              </div>
              
              <Button
                onClick={handleStoreHash}
                className="w-full bg-blokdok-blue hover:bg-blokdok-blue/80"
                disabled={!fileHash || isStoring}
              >
                {isStoring ? "Storing..." : "Store on Blockchain"}
              </Button>
              
              {fileHash && (
                <div className="text-center text-sm text-gray-400 animate-pulse-light">
                  <p>Hash ready to be stored on the blockchain</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
