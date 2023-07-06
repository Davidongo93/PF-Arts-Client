import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import { getAdminArts, getAllUsers, getTransaction } from '../../redux/actions';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';
import styles from './Dashboard.module.css'
import { VictoryBar, VictoryLabel, VictoryPie, VictorySharedEvents } from 'victory';
import downloadPDF from '../../components/DocsPDF/DocsPDF';

const Dashboard = () => {
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
          title: 'Dashboard',
          text: 'Check out these amazing Dashboard!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Dashboard shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing Dashboard:', error);
        });
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };
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
              <h1 className='h2'>Dashboard</h1>
              <div className='btn-toolbar mb-2 mb-md-0'>
                <div className='btn-group mr-2'>
                  <button
                    className='btn btn-sm btn-outline-secondary'
                    onClick={handleShare}
                  >
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
              <div className={styles['ContainerDataDash']}>
                <div className={styles['Content']}>Users:
                  <div className={styles['StyleNumber']}>{totalUsers}</div></div>
                <div className={styles['Content']}>Sales:
                  <div className={styles['StyleNumber']}>{totalSales}</div></div>
                <div className={styles['Content']}>Artworks:
                  <div className={styles['StyleNumber']}>{totalArtworks}</div></div>
              </div>
              <>
                <svg viewBox="0 0 450 350">
                  <VictorySharedEvents
                    events={[{
                      childName: ["pie", "bar"],
                      target: "data",
                      eventHandlers: {
                        onMouseOver: () => {
                          return [{
                            childName: ["pie", "bar"],
                            mutation: () => {
                              return {
                                style: Object.assign({}, { fill: "#7392b7" })
                              };
                            }
                          }];
                        },
                        onMouseOut: () => {
                          return [{
                            childName: ["pie", "bar"],
                            mutation: () => {
                              return null;
                            }
                          }];
                        }
                      }
                    }]}
                  >
                    <g transform={"translate(150, 50)"}>
                      <VictoryBar name="bar"
                        width={200}
                        standalone={false}
                        style={{
                          data: { width: 10 },
                          labels: { fontSize: 10 }
                        }}
                        data={[
                          { x: 'Users', y: totalUsers },
                          { x: 'Sales', y: totalSales },
                          { x: 'Artworks', y: totalArtworks },
                        ]}
                        labels={["Users", "Sales", "Artworks"]}
                        labelComponent={<VictoryLabel y={290} />}
                      />
                    </g>
                    <g transform={"translate(0, -75)"}>
                      <VictoryPie name="pie"
                        width={200}
                        standalone={false}
                        style={{ labels: { fontSize: 10, padding: 10 } }}
                        data={[
                          { x: 'Users', y: totalUsers },
                          { x: 'Sales', y: totalSales },
                          { x: 'Artworks', y: totalArtworks },
                        ]}
                      />
                    </g>
                  </VictorySharedEvents>
                </svg>
              </>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
