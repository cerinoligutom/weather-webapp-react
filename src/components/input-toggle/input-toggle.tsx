import React, { useState, ChangeEvent } from 'react';
import styles from './input-toggle.module.scss';

interface IInputToggleProps {
  onChange: (value: boolean) => any;
}

function InputToggle(props: IInputToggleProps) {
  const [value, setValue] = useState<any>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
    props.onChange(e.target.checked);
  };

  return (
    <label className={styles.switch}>
      <input type="checkbox" value={value} onChange={handleInputChange} />
      <span className={[styles.slider, styles.round].join(' ')} />
    </label>
  );
}

export default InputToggle;
