import { useState } from 'react';
import type { Contact, ContactFormData, FilterState } from './types';
import { useContacts } from './hooks/useContacts';
import { ContactCard } from './components/ContactCard';
import { ContactForm } from './components/ContactForm';
import { ConfirmDialog } from './components/ConfirmDialog';
import { Toolbar } from './components/Toolbar';

const DEFAULT_FILTER: FilterState = {
  search: '',
  sortBy: 'name',
  sortOrder: 'asc',
};

export default function App() {
  const { contacts, loading, error, addContact, editContact, removeContact, clearError } = useContacts();

  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>(undefined);
  const [deletingContact, setDeletingContact] = useState<Contact | undefined>(undefined);

  // Filtrera och sortera kontakter
  const filteredContacts = contacts
    .filter(contact => {
      const search = filter.search.toLowerCase();
      if (!search) return true;
      return (
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.company.name.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      let aVal = '';
      let bVal = '';
      if (filter.sortBy === 'name') { aVal = a.name; bVal = b.name; }
      if (filter.sortBy === 'email') { aVal = a.email; bVal = b.email; }
      if (filter.sortBy === 'company') { aVal = a.company.name; bVal = b.company.name; }
      const cmp = aVal.localeCompare(bVal, 'sv');
      return filter.sortOrder === 'asc' ? cmp : -cmp;
    });

  function handleEdit(contact: Contact) {
    setEditingContact(contact);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingContact(undefined);
  }

  async function handleSubmit(data: ContactFormData) {
    let success = false;

    if (editingContact) {
      success = await editContact(editingContact.id, data);
    } else {
      success = await addContact(data);
    }

    if (success) {
      setShowForm(false);
      setEditingContact(undefined);
    }
  }

  async function handleConfirmDelete() {
    if (!deletingContact) return;
    const success = await removeContact(deletingContact.id);
    if (success) {
      setDeletingContact(undefined);
    }
  }

  return (
    <div className="app">

      <div className="header">
        <h1>ContactBook</h1>
        <button className="btn-primary" onClick={() => {
          setEditingContact(undefined);
          setShowForm(true);
        }}>
          Ny kontakt
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', marginBottom: '16px' }}>
          {error}
          <button onClick={clearError} style={{ marginLeft: '8px' }}>✕</button>
        </p>
      )}

      <Toolbar filter={filter} onChange={setFilter} />

      {loading && <p>Laddar kontakter...</p>}

      {!loading && filteredContacts.length === 0 && (
        <p>Inga kontakter hittades.</p>
      )}

      <div className="contact-grid">
        {filteredContacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={handleEdit}
            onDelete={setDeletingContact}
          />
        ))}
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {deletingContact && (
        <ConfirmDialog
          contactName={deletingContact.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingContact(undefined)}
        />
      )}

    </div>
  );
}