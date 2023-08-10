import React, { useEffect, useState } from 'react';
import classes from '../../styles/table.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../helpers/axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/orders').then(({ data }) => setOrders(data));
  }, []);

  const onDeleteOrder = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete('/orders/' + id).then(({ data }) => {
        alert('Deleted');
        setOrders((orders) => orders.filter((order) => order.id !== id));
      });
    }
  };

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <td width={'3%'}>Id</td>
          <td width={'12%'}>Name</td>
          <td width={'12%'}>Surname</td>
          <td width={'12%'}>Email</td>
          <td width={'12%'}>Phone</td>
          <td width={'12%'}>Payment</td>
          <td width={'12%'}>Delivery</td>
          <td width={'3%'}>Delete</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.surname}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.payment}</td>
              <td>{order.delivery}</td>
              <td onClick={() => onDeleteOrder(order.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Orders;
