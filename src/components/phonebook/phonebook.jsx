import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './phonebook.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Component } = require('react');

const KEY_LOCAL_St_CONTACTS = 'contacts';

// model.id = nanoid();

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalSt = JSON.parse(
      localStorage.getItem(KEY_LOCAL_St_CONTACTS)
    );
    if (contactsFromLocalSt) {
      this.setState(prev => ({
        contacts: contactsFromLocalSt,
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isContactsUpdate =
      this.state.contacts.length !== prevState.contacts.length;
    const contactsJson = JSON.stringify(this.state.contacts);

    if (isContactsUpdate) {
      localStorage.setItem(KEY_LOCAL_St_CONTACTS, contactsJson);
    }
  }

  handleAddNewContact = value => {
    const isNewContactNew = this.state.contacts.find(
      el => el.name.toLowerCase() === value.name.toLowerCase()
    );
    const notify = () =>
      toast.warn(`${value.name} is already in contacts.`, {
        theme: 'dark',
      });

    isNewContactNew
      ? notify()
      : this.setState(prev => ({ contacts: [...prev.contacts, value] }));
  };

  handleFilterChenge = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  hendleDeleteContact = id => {
    const deleteContact = this.state.contacts.filter(
      contact => contact.id === id
    );
    const deletName = deleteContact[0].name;

    const notify = () =>
      toast.warn(`${deletName} was delete.`, {
        theme: 'dark',
      });

    notify();

    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render = () => {
    return (
      <div className={css.boockBox}>
        <h1 className={css.boockTitle}>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddNewContact} />

        <h2 className={css.boockTitle}>Contacts</h2>
        <Filter
          onChangeFilter={this.handleFilterChenge}
          filterWord={this.state.filter}
        />
        <ContactList
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.hendleDeleteContact}
        />
        <ToastContainer />
      </div>
    );
  };
}

export default PhoneBook;
