import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
          // Our new callbacks for update
          // and delete, we are pre-filling
          // the argument with the proper
          // expense id using the bind method
          onDeleteExpense={props.onDeleteExpense.bind(null, expense.id)}
          onEditExpense={props.onEditExpense.bind(null, expense.id)}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
