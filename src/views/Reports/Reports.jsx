import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart } from 'victory';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import { getAdminArts, getAllUsers, getTransaction } from '../../redux/actions';
import styles from './Reports.module.css';
import downloadPDF from '../../components/DocsPDF/DocsPDF';

const Reports = () => {
  const dispatch = useDispatch();
  const artworks = useSelector((state) => state.allAdminArts); // obras
  const allUsers = useSelector((state) => state.allUsers); // usuario
  const allSales = useSelector((state) => state.allTrans); //ventas

  const totalArtworks = artworks.length;
  console.log('obras', totalArtworks);
  const totalUsers = allUsers.length;
  console.log('users', totalUsers);
  const totalSales = allSales.length;
  console.log('sales', totalSales);

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
  // const handleClosePreview = () => {
  //   setShowPreview(false);
  // };

  useEffect(() => {
    dispatch(getAdminArts());
    dispatch(getAllUsers());
    dispatch(getTransaction());
  }, [dispatch]);

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
                  <button className='btn btn-sm btn-outline-secondary' onClick={handleShare}>
                    <FaShare /> Share
                  </button>

                    <button className='btn btn-sm btn-outline-secondary' onClick={downloadPDF}>
                      <FaFileExport /> Export
                    </button>
                </div>
                <button className='btn btn-sm btn-outline-secondary dropdown-toggle'>
                  <span className='feather' data-feather='calendar'></span>
                  <FaCalendar /> This week
                </button>
              </div>
            </div>
            <div className='A4'>

              <div className={styles['ContainerGraf']}>
              <VictoryPie
                //  grafico pastel
                colorScale={['#b3c5d7', '#7392b7', '#d8e1e9']}
                data={[
                  { x: 'Users', y: totalUsers },
                  { x: 'Sales', y: totalSales },
                  { x: 'Artworks', y: totalArtworks },
                ]}
                animate={[2000]}
                labelComponent={<VictoryLabel style={{ fill: 'rgb(46, 46, 46)' }} />}
                labels={({ datum }) => `${datum.x}\n${((datum.y / (totalUsers + totalArtworks + totalSales)) * 100).toFixed(2)}%`}
              />
              <VictoryChart domainPadding={{ x: 10 }}>
                <VictoryBar
                  //grafico de barras
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                    },
                    labels: { fill: 'black' },
                  }}
                  alignment='start'
                  data={[
                    { x: 'Users', y: totalUsers, fill: '#b3c5d7' },
                    { x: 'Sales', y: totalSales, fill: '#7392b7' },
                    { x: 'artworks', y: totalArtworks, fill: '#d8e1e9' },
                  ]}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={0} dx={15} />}
                />
              </VictoryChart>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Reports;
