import React, { useEffect, useState } from 'react';

import { genUUID } from '../../util/generators';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = ({ editing, onCancelEdit, onUpdateExpense, onAddExpense }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Watch for 'editing' to be defined
  // set isEditing state to true to open
  // the form, if the 'editing' state
  // changes from true to false, we should
  // likewise close the form in our else case
  useEffect(() => {
    if (editing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editing]);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      // added custom id generation
      id: genUUID(),
    };
    // ignore this, destructured prop now
    onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    // invoke callback function
    // to clear the parent editing
    // state
    if (editing) {
      onCancelEdit();
    }
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
      {isEditing && (
        <ExpenseForm
          // pass the 'editing' state
          // to the form for pre-fill
          // of values
          editing={editing}
          // update expense callback
          onUpdateExpense={onUpdateExpense}
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
