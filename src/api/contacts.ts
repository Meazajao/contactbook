import type { Contact, ContactFormData } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// GET
export async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) {
    throw new Error('Kunde inte hämta kontakter.');
  }

  return res.json();
}

// POST
export async function createContact(data: ContactFormData): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Kunde inte skapa kontakt.');
  }

  return res.json();
}

// PUT 
export async function updateContact(id: number, data: ContactFormData): Promise<Contact> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...data }),
  });

  if (!res.ok) {
    throw new Error('Kunde inte uppdatera kontakt.');
  }

  return res.json();
}

// DELETE 
export async function deleteContact(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Kunde inte ta bort kontakt.');
  }
}