
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`relative overflow-hidden w-full max-w-xs glass-card transition-all duration-300 ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square bg-gradient-to-br from-blokdok-purple/20 to-blokdok-blue/20 flex items-center justify-center overflow-hidden">
        {image ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <div className="text-6xl text-blokdok-purple">{name.charAt(0)}</div>
        )}
      </div>
      
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 transform transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-90'
        }`}
      >
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-blokdok-light text-sm">{role}</p>
      </div>
    </Card>
  );
};

export default TeamMember;
