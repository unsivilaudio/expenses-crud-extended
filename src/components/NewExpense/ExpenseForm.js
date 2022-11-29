import React, { useEffect, useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // This useEffect will watch the 'props.editing'
  // if the value changes, it will invoke the callback
  // and we can set our initial state values with
  // the current expense data
  useEffect(() => {
    if (props.editing) {
      setEnteredTitle(props.editing.title);
      setEnteredAmount(props.editing.amount);
      setEnteredDate(props.editing.date.toISOString().split('T')[0]);
    }
  }, [props.editing]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    // if 'props.editing' is truthy we
    // should use the update callback
    // passed down from App.js
    if (props.editing) {
      props.onUpdateExpense({ id: props.editing.id, ...expenseData });
    } else {
      props.onSaveExpenseData(expenseData);
    }
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">{props.editing ? 'Update Expense' : 'Add Expense'}</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
