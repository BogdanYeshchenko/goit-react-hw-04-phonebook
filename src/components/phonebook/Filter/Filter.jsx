import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onChangeFilter, filterWord }) => {
  return (
    <div className={css.filterBox}>
      <label className="form-label">
        <span>Find contacts by name</span>
        <input
          className="form-control"
          type="text"
          onChange={onChangeFilter}
          name="filter"
          value={filterWord}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  filterWord: PropTypes.string.isRequired,
};
