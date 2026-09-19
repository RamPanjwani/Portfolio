'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { nierAudio } from './NierAudio';

export interface NierModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  className?: string;
}

export const NierModal: React.FC<NierModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  maxHeight = 'max-h-[90vh]',
  className = '',
}) => {
  // ESC key dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        nierAudio.playSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#dad4bb]/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidth} ${maxHeight} nier-modal-dialog border-2 shadow-[6px_6px_0px_#57544a] p-4 sm:p-5 font-mono space-y-4 overflow-y-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        {title ? (
          <div className="flex items-center justify-between pb-2 border-b border-[#b4af9a]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 bg-[#cd664d] shrink-0" />
              <div className="text-sm font-bold truncate">
                {title}
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                nierAudio.playSelect();
              }}
              className="p-1 border nier-modal-close-btn shrink-0 ml-2 cursor-pointer"
              title="Close Dialog (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-end pb-2 sm:pb-3">
            <button
              onClick={() => {
                onClose();
                nierAudio.playSelect();
              }}
              className="p-1 border nier-modal-close-btn cursor-pointer"
              title="Close Dialog (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
