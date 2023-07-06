import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, deleteAdmin } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaShare } from 'react-icons/fa';
// import { PDFViewer } from '@react-pdf/renderer';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import downloadPDF from '../../components/DocsPDF/DocsPDF';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
// import CustomersPDF from './CustomersPDF';
import styles from './Customers.module.css';

const Customers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.allUsers);
  // const [showPreview, setShowPreview] = useState(false);

  // const handleExport = () => {
  //   setShowPreview(true);
  // };

  // const handleClosePreview = () => {
  //   setShowPreview(false);
  // };

  // const handleDownloadPDF = () => {
  //   // Crear una instancia de jspdf
  //   const doc = new jsPDF();

  //   // Agregar contenido al PDF
  //   doc.text('Customers', 10, 10);
  //   doc.autoTable({ html: '#usersTable' });

  //   // Descargar el PDF
  //   doc.save('customers.pdf');
  // };

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
    <div className={styles.allContainer}>
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
                  <button className='btn btn-sm btn-outline-secondary' onClick={handleShare}>
                    <FaShare /> Share
                  </button>
                  {/* {showPreview ? (
                    <button className='btn btn-sm btn-outline-secondary' onClick={handleClosePreview}>
                      Close Preview
                    </button>
                  ) : (
                    <button className='btn btn-sm btn-outline-secondary' onClick={handleExport}>
                      <FaFileExport /> Export
                    </button>
                  )} */}
                </div>
                <button className='btn btn-sm btn-outline-secondary dropdown-toggle' onClick={downloadPDF}>
                  <span className='feather' data-feather='calendar'></span>
                  <FaCalendar /> This week
                </button>
              </div>
            </div>

            <div className='A4'>
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
                        <button className='btn btn-sm btn-primary' onClick={() => navigate(`/users/detail/${user.userId}`)}>
                          View Profile
                        </button>
                      </td>
                      <td>
                        <button className={styles.deleteButton} onClick={() => handleDelete(user.userId)} title='Delete'>
                          {' '}
                          x{' '}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* {showPreview ? (
              <div className={styles.PDFPreview}>
                <PDFViewer style={{ width: '100%', height: '90vh' }}>
                  <CustomersPDF />
                </PDFViewer>
              </div>
            ) : (
              <div className={styles.DownloadButton}>
                <button className='btn btn-sm btn-outline-secondary' onClick={handleDownloadPDF}>
                  <FaFileExport /> Dowload PDF
                </button>
              </div>
            )} */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Customers;
