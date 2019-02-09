import React from 'react';
import styles from './search-input.module.scss';
import { useState } from 'react';

interface ISearchInputProps {
  handleSearch: (value: string) => any;
}

function SearchInput(props: ISearchInputProps) {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = e.keyCode || e.which || e.charCode;

    // 13 is enter
    if (keyPressed == 13) {
      e.preventDefault();
      e.stopPropagation();
      props.handleSearch(value);
    }
  };

  const handleSearchButton = (e: React.MouseEvent<Element, MouseEvent>) => {
    props.handleSearch(value);
  };

  return (
    <div className={styles.inputContainer}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Location..."
          value={value}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyUp}
        />

        <div className="input-group-append">
          <button
            className="btn btn-info"
            type="button"
            onClick={handleSearchButton}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
