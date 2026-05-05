import { useState, useEffect } from 'react';
import type { Contact, ContactFormData } from '../types';
import * as api from '../api/contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // GET
  useEffect(() => {
    async function loadContacts() {
      try {
        const data = await api.fetchContacts();
        setContacts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Något gick fel.');
      } finally {
        setLoading(false);
      }
    }

    loadContacts();
  }, []);

  // POST 
  async function addContact(data: ContactFormData): Promise<boolean> {
    try {
      const newContact = await api.createContact(data);
      const contactWithUniqueId = { ...newContact, id: Date.now() };
      setContacts(prev => [contactWithUniqueId, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte skapa kontakt.');
      return false;
    }
  }

  // PUT 
  async function editContact(id: number, data: ContactFormData): Promise<boolean> {
    try {
      const updated = await api.updateContact(id, data);
      setContacts(prev =>
        prev.map(c => (c.id === id ? { ...updated, id } : c))
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte uppdatera kontakt.');
      return false;
    }
  }

  // DELETE 
  async function removeContact(id: number): Promise<boolean> {
    try {
      await api.deleteContact(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ta bort kontakt.');
      return false;
    }
  }

  return {
    contacts,
    loading,
    error,
    addContact,
    editContact,
    removeContact,
    clearError: () => setError(null),
  };
}