'use client';

import React from 'react';
import { NierSectionHeader } from './NierSectionHeader';

interface SystemViewProps {
  onNavigate?: (tab: string) => void;
}

export const SystemView: React.FC<SystemViewProps> = () => {
  return (
    <div className="space-y-6">
      <NierSectionHeader title="HOME" />
    </div>
  );
};
