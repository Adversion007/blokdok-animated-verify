
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Background3D from "@/components/Background3D";
import { useAuth } from "@/contexts/AuthContext";
import { generateDocumentHash, verifyDocumentHash } from "@/services/blockchainService";
import { FileCheck, ShieldCheck, ShieldX } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Verify = () => {
  const [file, setFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    timestamp?: number;
    uploader?: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, username, logout } = useAuth();
  
  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationResult(null);
    }
  };
  
  const handleVerify = async () => {
    if (!file) return;
    
    setIsVerifying(true);
    
    try {
      const hash = await generateDocumentHash(file);
      const result = verifyDocumentHash(hash);
      
      setVerificationResult(result);
      
      if (result.verified) {
        toast({
          title: "Document Verified",
          description: "This document is authentic and has been verified on the blockchain.",
          variant: "default",
        });
      } else {
        toast({
          title: "Document Not Found",
          description: "This document could not be verified on the blockchain.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "An error occurred while verifying the document. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return "Unknown";
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen w-full">
      <Background3D />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gradient">Document Verification</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Welcome, {username}</span>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin')}
              className="border-blokdok-purple text-blokdok-purple hover:bg-blokdok-purple/10"
            >
              Admin Dashboard
            </Button>
            <Button variant="ghost" onClick={logout}>Logout</Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Verify Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="document-verify"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="document-verify"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <FileCheck className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-lg font-medium mb-2">
                      {file ? file.name : "Click to select a document"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Upload the document you want to verify
                    </p>
                  </label>
                </div>
                
                <Button
                  onClick={handleVerify}
                  className="w-full bg-blokdok-blue hover:bg-blokdok-blue/80"
                  disabled={!file || isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Document"}
                </Button>
                
                <div className="text-center text-sm text-gray-400">
                  <p>The document will be verified against blockchain records</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Verification Result</CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    {verificationResult.verified ? (
                      <>
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 animate-pulse-light">
                          <ShieldCheck className="h-12 w-12 text-green-500" />
                        </div>
                        <Badge className="bg-green-500 mb-2">Verified</Badge>
                        <h3 className="text-xl font-bold mb-4 text-center">Document Authenticated</h3>
                        <div className="w-full space-y-3 text-center">
                          <div>
                            <p className="text-sm text-gray-400">Registered by</p>
                            <p className="font-medium">{verificationResult.uploader}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Registration date</p>
                            <p className="font-medium">{formatDate(verificationResult.timestamp)}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                          <ShieldX className="h-12 w-12 text-red-500" />
                        </div>
                        <Badge className="bg-red-500 mb-2">Not Verified</Badge>
                        <h3 className="text-xl font-bold mb-4 text-center">Document Not Found</h3>
                        <p className="text-center text-gray-300">
                          This document has not been registered on our blockchain.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <p className="text-gray-400 text-center">
                      Please upload a document and click "Verify Document" to check its authenticity.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
