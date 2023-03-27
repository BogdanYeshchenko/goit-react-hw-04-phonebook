import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNamber] = useState('');

  const handleFormEvent = e => {
    const name = e.target.name;
    switch (name) {
      case 'name':
        setName(e.target.value);
        break;

      case 'number':
        setNamber(e.target.value);
        break;

      default:
        return;
    }
  };

  const onFormSabmit = e => {
    e.preventDefault();

    onAddContact({
      id: nanoid(),
      name: name,
      number: number,
    });

    setName('');
    setNamber('');
  };

  return (
    <form onSubmit={onFormSabmit} className={`${css.contactForm} form-label`}>
      <label className="form-label">
        <span>Name: </span>
        <input
          className="form-control"
          value={name}
          onChange={handleFormEvent}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className="form-label">
        <span>Number: </span>
        <input
          className="form-control"
          value={number}
          onChange={handleFormEvent}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className="btn btn-dark" type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
