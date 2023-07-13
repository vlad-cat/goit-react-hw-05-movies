import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchForm = ({ onSubmit }) => {
  const [queryValue, setQueryValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const value = form.elements.query.value;
    onSubmit(value);
    setQueryValue('');
    form.reset();
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={queryValue}
          onChange={evt => setQueryValue(evt.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
