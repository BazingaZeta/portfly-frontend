'use client';

import React from 'react';
import styles from './portfolio.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.modalButtonCancel} disabled={isLoading}>
            Annulla
          </button>
          <button onClick={onConfirm} className={styles.modalButtonConfirm} disabled={isLoading}>
            {isLoading ? 'Conferma...' : 'Conferma'}
          </button>
        </div>
      </div>
    </div>
  );
}
