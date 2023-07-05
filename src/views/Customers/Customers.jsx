import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, deleteAdmin } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import style from './Customers.module.css';

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteAdmin('', userId)).then(() => dispatch(getAllUsers()));
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Customers',
          text: 'Check out these amazing customers!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Customers shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing customers:', error);
        });
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };

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
              <h1 className='h2'>Customers</h1>
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
              {/* Tabla de usuarios */}
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Location</th>
                    <th>Profile</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.location}</td>
                      <td>
                        <button
                          className='btn btn-sm btn-primary'
                          onClick={() =>
                            navigate(`/users/detail/${user.userId}`)
                          }
                        >
                          View Profile
                        </button>
                      </td>
                      <td>
                        <button
                          className={style.deleteButton}
                          onClick={() => handleDelete(user.userId)}
                          title='Delete'
                        >
                          {' '}
                          x{' '}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Customers;
