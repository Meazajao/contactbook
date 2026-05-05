interface ConfirmDialogProps {
    contactName: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export function ConfirmDialog({ contactName, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
      <div className="modal-overlay">
        <div className="modal confirm-modal">
          <p style={{ fontSize: '48px' }}>🗑️</p>
          <h2>Ta bort kontakt?</h2>
          <p>
            Är du säker på att du vill ta bort <strong>{contactName}</strong>?
            Detta kan inte ångras.
          </p>
          <div className="confirm-actions">
            <button className="btn-secondary" onClick={onCancel}>
              Avbryt
            </button>
            <button className="btn-danger" onClick={onConfirm}>
              Ta bort
            </button>
          </div>
        </div>
      </div>
    );
  }