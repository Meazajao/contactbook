export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  }
  
  export interface Company {
    name: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: Address;
    company: Company;
  }
  
  export type ContactFormData = Omit<Contact, 'id'>;
  
  export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    username?: string;
    'address.city'?: string;
    'company.name'?: string;
  }
  
  export interface FilterState {
    search: string;
    sortBy: 'name' | 'email' | 'company';
    sortOrder: 'asc' | 'desc';
  }