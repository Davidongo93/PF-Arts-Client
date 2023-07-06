import {Page, View, Document,Text} from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import styles from './Customers.module.css'


const CustomersPDF=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.allUsers);
    useEffect(() => {
        dispatch(getAllUsers());
      }, [dispatch]);
    return(
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.section}>
                <Text>rodrigo
                  {/* Tabla de usuarios */}
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Country</th>
                        <th>Profile</th>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Text>
    
                </View>
            </Page>
        </Document>
        
    )
}
export default CustomersPDF; 