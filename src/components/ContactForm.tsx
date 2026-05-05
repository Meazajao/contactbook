import { useState, useEffect } from 'react';
import type { Contact, ContactFormData, FormErrors } from '../types';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
}

const EMPTY_FORM: ContactFormData = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: { street: '', suite: '', city: '', zipcode: '' },
  company: { name: '' },
};

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name) {
    errors.name = 'Namn är obligatoriskt.';
  }

  if (!data.username) {
    errors.username = 'Användarnamn är obligatoriskt.';
  }

  if (!data.email) {
    errors.email = 'E-post är obligatorisk.';
  } else if (!data.email.includes('@')) {
    errors.email = 'Ogiltig e-post.';
  }

  if (!data.phone) {
    errors.phone = 'Telefon är obligatoriskt.';
  }

  if (!data.address.city) {
    errors['address.city'] = 'Stad är obligatoriskt.';
  }

  if (!data.company.name) {
    errors['company.name'] = 'Företag är obligatoriskt.';
  }

  return errors;
}

export function ContactForm({ contact, onSubmit, onCancel }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const isEditing = Boolean(contact);

  useEffect(() => {
    if (contact) {
      setForm({
        name: contact.name,
        username: contact.username,
        email: contact.email,
        phone: contact.phone,
        website: contact.website,
        address: { ...contact.address },
        company: { name: contact.company.name },
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [contact]);

  function handleChange(field: string, value: string) {
    if (field.startsWith('address.')) {
      const key = field.replace('address.', '');
      setForm(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (field.startsWith('company.')) {
      const key = field.replace('company.', '');
      setForm(prev => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = validateForm(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await onSubmit(form);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEditing ? 'Redigera kontakt' : 'Ny kontakt'}</h2>

        <form onSubmit={handleSubmit}>

          <input
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Namn"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

          <input
            value={form.username}
            onChange={e => handleChange('username', e.target.value)}
            placeholder="Användarnamn"
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

          <input
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="Email"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

          <input
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            placeholder="Telefon"
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

          <input
            value={form.website}
            onChange={e => handleChange('website', e.target.value)}
            placeholder="Website"
          />

          <input
            value={form.address.city}
            onChange={e => handleChange('address.city', e.target.value)}
            placeholder="Stad"
          />
          {errors['address.city'] && <p style={{ color: 'red' }}>{errors['address.city']}</p>}

          <input
            value={form.company.name}
            onChange={e => handleChange('company.name', e.target.value)}
            placeholder="Företag"
          />
          {errors['company.name'] && <p style={{ color: 'red' }}>{errors['company.name']}</p>}

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Avbryt
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Spara' : 'Skapa'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}