import { Table } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postTransaction } from '../../redux/actions'; //Acá capaz sería mejor llamar a ruta GET
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';

const Orders = () => {
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

  return (
    <div>
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

            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Customer Name</th>
                    <th>Artwork</th>
                    {/* Agregar más encabezados de columna según necesidades */}
                  </tr>
                </thead>
                {/* <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.customerName}</td>
                      <td>{transaction.artworkIdsString}</td>
                    </tr>
                  ))}
                </tbody> */}
              </Table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Orders;
