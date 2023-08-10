import React from 'react';
import classes from '../../styles/form.module.scss';

const Select = ({ state, setState, id, items, event }) => {
  return (
    <div className={classes.field}>
      <label>Categorie</label>
      <div
        className={[classes.select, state ? classes.active : undefined].join(' ')}
        onClick={() => setState((state) => !state)}>
        {items.find((item) => item.id === id) && items.find((item) => item.id === id).title}
      </div>
      {state && (
        <div className={classes.options}>
          {items.map((categorie) => {
            if (categorie.id === id) return undefined;
            return (
              <div
                className={classes.select}
                key={categorie.id}
                onClick={() => event(categorie.id)}>
                {categorie.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
