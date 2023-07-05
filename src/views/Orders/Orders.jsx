import { Table } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postTransaction } from '../../redux/actions'; //Acá capaz sería mejor llamar a ruta GET
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import { getTransaction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import style from './Orders.module.css';

const Orders = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.allTrans);
  const [paypal, setPaypal] = useState('');

  useEffect(() => {
    dispatch(getTransaction());
  }, [dispatch]);

  const handleChange = (event) => {
    setPaypal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!paypal) {
      dispatch(getTransaction());
    } else {
      dispatch(getTransaction(paypal));
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Orders',
          text: 'Check out these amazing Orders!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Orders shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing Orders:', error);
        });
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };

  let summary = 0;
  transactions.map((transaction) => {
    summary = summary + parseInt(transaction.artwork_value);
  });

  return (
    <div className={style.allContainer}>
      <div className='container-fluid'>
        <div className='row'>
          <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
            <div className='sidebar-sticky'>
              <DashboardMenu />
            </div>
          </nav>

          <main role='main' className='col-md-9 ml-sm-auto col-lg-10 px-md-4'>
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
              <h1 className='h2'>Orders</h1>
              <div className='btn-toolbar mb-2 mb-md-0'>
                <div className='btn-group mr-2'>
                  <button
                    className='btn btn-sm btn-outline-secondary'
                    onClick={handleShare}
                  >
                    <FaShare /> Share
                  </button>
                  <button className='btn btn-sm btn-outline-secondary'>
                    <FaFileExport /> Export
                  </button>
                </div>
                <button className='btn btn-sm btn-outline-secondary dropdown-toggle'>
                  <span className='feather' data-feather='calendar'></span>
                  <FaCalendar /> This week
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className={style.search}
                placeholder='Search by Paypal ID...'
                type='search'
                onChange={handleChange}
              />
              <button className={style.buttonSearch} type='submit'>
                Search
              </button>
            </form>

            <p className={style.totalSales}>
              {' '}
              <span style={{ fontWeight: 'bold', fontStyle: 'oblique' }}>
                Total Sales:
              </span>{' '}
              {summary.toLocaleString()} USD
            </p>
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Paypal ID</th>
                    <th>Title</th>
                    <th>User</th>
                    <th>Value</th>
                    <th>Buyer</th>
                    <th>Seller</th>
                    <th>Status</th>
                    <th>Date</th>

                    {/* Agregar más encabezados de columna según necesidades */}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    return (
                      <tr key={transaction.id}>
                        <td>{transaction.paypal_id}</td>
                        <td>
                          {transaction.artworks[0]?.title
                            ? transaction.artworks[0].title
                            : '-'}
                        </td>
                        <td>
                          {transaction.artworks[0]?.user.userName
                            ? transaction.artworks[0].user.userName
                            : ' ' + '-'}
                        </td>
                        <td>{transaction.artwork_value} USD</td>
                        <td>{transaction.buyer}</td>
                        <td>{transaction.seller}</td>
                        <td>{transaction.status}</td>
                        <td>{transaction.createdAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Orders;
