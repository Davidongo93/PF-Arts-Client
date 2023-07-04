import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaShare, FaFileExport } from 'react-icons/fa';
import { getAllArts } from '../../redux/actions';
import DashboardMenu from '../../components/DashboardMenu/DashboardMenu';

const Products = () => {
  const allArts = useSelector((state) => state.allArts);
  const currentArts = allArts && Array.isArray(allArts) && allArts;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllArts());
  }, [dispatch]);

  const handleArtworkClick = (artworkId) => {
    navigate(`/detail/${artworkId}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My Artworks',
          text: 'Check out these amazing artworks!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Artworks shared successfully');
        })
        .catch((error) => {
          console.error('Error sharing artworks:', error);
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
              <h1 className='h2'>Products</h1>
              <div className='btn-toolbar mb-2 mb-md-0'>
                <div className='btn-group mr-2'>
                  <button className='btn btn-sm btn-outline-secondary' onClick={handleShare}>
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

            <div className='table-responsive'>
              <table className='table table-sm'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentArts && currentArts.length > 0 ? (
                    currentArts.map((art) => (
                      <tr key={art.artworkId}>
                        <td>{art.title}</td>
                        <td>{art.user.userName}</td>
                        <td>{art.date}</td>
                        <td>{art.price}</td>
                        <td>
                          {art.sold ? (
                            <button className='btn btn-sm btn-danger' onClick={() => handleArtworkClick(art.artworkId)}>
                              Sold
                            </button>
                          ) : (
                            <button className='btn btn-sm btn-success' onClick={() => handleArtworkClick(art.artworkId)}>
                              Published
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='5'>No articles available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
