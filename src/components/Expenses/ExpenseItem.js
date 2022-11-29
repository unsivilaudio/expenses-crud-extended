import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  // easier to write comments in the
  // component function body

  // Added buttons for update and delete
  // new callback functions from parent
  // 'onEditExpense and onDeleteExpense
  const expenseActions = (
    <div className="expense-item__actions">
      <button className="expense-item__edit" onClick={props.onEditExpense}>
        edit
      </button>
      <button className="expense-item__delete" onClick={props.onDeleteExpense}>
        delete
      </button>
    </div>
  );

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
        {expenseActions}
      </Card>
    </li>
  );
};

export default ExpenseItem;
