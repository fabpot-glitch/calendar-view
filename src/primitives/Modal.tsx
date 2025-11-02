import React from 'react';

export const Modal: React.FC<{ open: boolean; onClose: () => void; children: React.ReactNode; title?: string }> = ({
  open,
  onClose,
  children,
  title,
}) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="bg-white rounded p-4 z-10 w-full max-w-lg">
        {title && <h3 className="font-semibold mb-2">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
