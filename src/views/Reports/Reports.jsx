import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';

const Reports = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Reports',
          text: 'Check out these amazing Reports!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Reports shared successfully');
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
              <h1 className='h2'>Reports</h1>
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
              <p> - Acá podemos poner 2 gráficos (usuarios y ventas). </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Reports;
