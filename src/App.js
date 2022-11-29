import React, { useState } from 'react';

import { genUUID } from './util/generators';
import NewExpense from './components/NewExpense/NewExpense';
import Expenses from './components/Expenses/Expenses';

const DUMMY_EXPENSES = [
  {
    id: genUUID(),
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: genUUID(), title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: genUUID(),
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: genUUID(),
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [editExpense, setEditExpense] = useState(null);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  // This will set the new 'editExpense' state
  // to the actual expense data
  const editExpenseHandler = (id) => {
    // find the right expense data
    // using matching the id
    const expense = expenses.find((exp) => exp.id === id);
    // if we found an expense
    // set it to the editExpense
    // state
    if (expense) {
      setEditExpense(expense);
    }
  };

  // update our expenses state with this
  // handler function we will pass down
  // to the form
  const updateExpenseHandler = (updatedExpense) => {
    // find the index in the array where the expense
    // exists
    const expenseIdx = expenses.findIndex((exp) => exp.id === updatedExpense.id);
    // if a valid index is found
    // it will be greater than -1
    if (expenseIdx > -1) {
      // copy expenses state and replace expense
      // using correct index
      const updatedExpenses = [...expenses];
      updatedExpenses[expenseIdx] = updatedExpense;
      // set the expenses state
      setExpenses(updatedExpenses);
      // clear our editExpense state
      setEditExpense(null);
    }
  };

  // delete handler will filter out the
  // expense with the matching id
  const deleteExpenseHandler = (id) => {
    setExpenses((ps) => ps.filter((exp) => exp.id !== id));
  };

  return (
    <div>
      <NewExpense
        onAddExpense={addExpenseHandler}
        editing={editExpense}
        // our update expense callback we're
        // passing down to use in the case of
        // editing a current expense
        onUpdateExpense={updateExpenseHandler}
        // we need to clear the editExpense state
        // through a callback if we click 'cancel'
        // using, the bind method for pre-load of
        // argument, we're setting it back to null
        // NOTE the first null is 'this' and you can
        // ignore it
        onCancelEdit={setEditExpense.bind(null, null)}
      />
      <Expenses items={expenses} onDeleteExpense={deleteExpenseHandler} onEditExpense={editExpenseHandler} />
    </div>
  );
};

export default App;
