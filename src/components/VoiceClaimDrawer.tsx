
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import Index from '@/pages/Index';
import VoiceClaimReport from '@/pages/VoiceClaimReport';

const VoiceClaimDrawer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open drawer when component mounts
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Navigate back to home after closing animation
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <>
      {/* Background - Index page */}
      <Index />
      
      {/* Drawer overlay */}
      <Drawer open={isOpen} onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}>
        <DrawerContent className="h-[75vh] max-w-md mx-auto">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Schadensmeldung</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-hidden">
            <VoiceClaimReport />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default VoiceClaimDrawer;
