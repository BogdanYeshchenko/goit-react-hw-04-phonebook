import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './phonebook.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { useState, useEffect } = require('react');

const KEY_LOCAL_St_CONTACTS = 'contacts';

const PhoneBook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLocalSt = JSON.parse(
      localStorage.getItem(KEY_LOCAL_St_CONTACTS)
    );

    if (contactsFromLocalSt?.length > 0) {
      setContacts([...contactsFromLocalSt]); ///////////////////////////////
    }
  }, []);

  useEffect(() => {
    const contactsJson = JSON.stringify(contacts);
    if (contacts) {
      localStorage.setItem(KEY_LOCAL_St_CONTACTS, contactsJson);
    }
  }, [contacts]);

  const handleAddNewContact = value => {
    const isNewContactNew = contacts.find(
      el => el.name.toLowerCase() === value.name.toLowerCase()
    );
    const notify = () =>
      toast.warn(`${value.name} is already in contacts.`, {
        theme: 'dark',
      });

    isNewContactNew ? notify() : setContacts(prev => [...prev, value]); ////////////////////////////
  };

  const handleFilterChenge = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const hendleDeleteContact = id => {
    const deleteContact = contacts.filter(contact => contact.id === id);

    const deletName = deleteContact[0].name;

    const notify = () =>
      toast.warn(`${deletName} was delete.`, {
        theme: 'dark',
      });

    notify();

    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.boockBox}>
      <h1 className={css.boockTitle}>Phonebook</h1>
      <ContactForm onAddContact={handleAddNewContact} />

      <h2 className={css.boockTitle}>Contacts</h2>
      <Filter onChangeFilter={handleFilterChenge} filterWord={filter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={hendleDeleteContact}
      />
      <ToastContainer />
    </div>
  );
};

export default PhoneBook;
