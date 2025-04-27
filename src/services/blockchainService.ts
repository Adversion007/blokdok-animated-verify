
import CryptoJS from 'crypto-js';

// Mock blockchain storage for demonstration
// In a real application, this would interact with a smart contract
const blockchainStorage: { [hash: string]: { timestamp: number, uploader: string } } = {};

/**
 * Generate a SHA-256 hash for a document
 */
export const generateDocumentHash = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        const hash = CryptoJS.SHA256(fileContent).toString(CryptoJS.enc.Hex);
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Store document hash in the "blockchain"
 */
export const storeDocumentHash = (hash: string, uploader: string): boolean => {
  // In a real app, this would be a blockchain transaction
  if (!blockchainStorage[hash]) {
    blockchainStorage[hash] = {
      timestamp: Date.now(),
      uploader
    };
    return true;
  }
  return false; // Hash already exists
};

/**
 * Verify if document hash exists in the "blockchain"
 */
export const verifyDocumentHash = (hash: string): { verified: boolean, timestamp?: number, uploader?: string } => {
  const docInfo = blockchainStorage[hash];
  
  if (docInfo) {
    return {
      verified: true,
      timestamp: docInfo.timestamp,
      uploader: docInfo.uploader
    };
  }
  
  return { verified: false };
};

// In a real app, this would be the interface for Hardhat or Web3 interaction
export const getBlockchainInfo = (): { hashCount: number } => {
  return {
    hashCount: Object.keys(blockchainStorage).length
  };
};
