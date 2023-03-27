import PropTypes from 'prop-types';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = { name: '', number: '' };

  handleFormEvent = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onFormSabmit = e => {
    e.preventDefault();
    const { name, number } = this.state;

    this.props.onAddContact({
      id: nanoid(),
      name: name,
      number: number,
    });

    this.setState({ name: '', number: '' });
  };

  render = () => {
    const { name, number } = this.state;
    return (
      <form
        onSubmit={this.onFormSabmit}
        className={`${css.contactForm} form-label`}
      >
        <label className="form-label">
          <span>Name: </span>
          <input
            className="form-control"
            value={name}
            onChange={this.handleFormEvent}
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
            onChange={this.handleFormEvent}
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
}

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
