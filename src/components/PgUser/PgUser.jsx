import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';
import styles from '../Pagination/Pagination.module.css';

const UserPagination = ({ usersPerPage, totalUsers, currentUsersPage, handlePageChange }) => {
  const pageNumbersUsers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbersUsers.push(i);
  }

  return (
    <Pagination className={styles['handlePageChange-container']}>
      <Pagination.Prev onClick={() => handlePageChange(currentUsersPage - 1)} disabled={currentUsersPage === 1} />
      {pageNumbersUsers.map((number) => (
        <Pagination.Item key={number} onClick={() => handlePageChange(number)} disabled={currentUsersPage === number}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => handlePageChange(currentUsersPage + 1)} disabled={currentUsersPage === Math.ceil(totalUsers / usersPerPage)} />
    </Pagination>
  );
};

UserPagination.propTypes = {
  usersPerPage: PropTypes.number.isRequired,
  totalUsers: PropTypes.number.isRequired,
  currentUsersPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default UserPagination;