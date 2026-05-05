import type { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="contact-card">
      <h3>{contact.name}</h3>
      <p>@{contact.username}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <p>{contact.company.name}</p>
      <p>{contact.address.city}</p>

      <div className="card-actions">
        <button className="btn-secondary" onClick={() => onEdit(contact)}>
          Redigera
        </button>
        <button className="btn-danger" onClick={() => onDelete(contact)}>
          Ta bort
        </button>
      </div>
    </div>
  );
}