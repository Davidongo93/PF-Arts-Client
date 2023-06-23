import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions';
import UserCard from '../../components/UserCard/UserCard';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEditUser = (userId) => {
    // Lógica para editar el usuario con el ID correspondiente
    console.log(`Editar usuario con ID: ${userId}`);
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.userCards}>
        {users.map((user) => (
          <UserCard key={user.userId} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
