import React from "react";
import { Admin_Layout } from "../../../layouts/Admin_Layout";
import Students from "./Students";
import DataTable from 'react-data-table-component';
import reactpivot from 'react-pivot';

// import 'react-data-table-component/dist/react-data-table-component.css';
var rows = [
  {"firstName":"Francisco","lastName":"Brekke","state":"NY","transaction":{"amount":"399.73","date":"2012-02-02T08:00:00.000Z","business":"Kozey-Moore","name":"Checking Account 2297","type":"deposit","account":"82741327"}},
  {"firstName":"Francisco","lastName":"Brekke","state":"NY","transaction":{"amount":"768.84","date":"2012-02-02T08:00:00.000Z","business":"Herman-Langworth","name":"Money Market Account 9344","type":"deposit","account":"95753704"}}
]
var dimensions = [
  {value: 'firstName', title: 'First Name'}
]
var reduce = function(row, memo) {
  memo.amountTotal = (memo.amountTotal || 0) + parseFloat(row.transaction.amount)
  return memo
}
var calculations = [
  {
    title: 'Amount', value: 'amountTotal',
    template: function(val, row) {
      return '$' + val.toFixed(2)
    },
    sortBy: function(row) {
      return isNaN(row.amountTotal) ? 0 : row.amountTotal
    }
  }
]

//import es from "../assets/keywords.jpg";
const ListStudents = () => {
  return (
    <reactpivot rows={rows}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations}
              activeDimensions={['First Name']} />,

  );
};
export default ListStudents;
