import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { UserType } from "../../types/UsersTypes";
import { collection, getDocs, getFirestore, query, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { app } from "../../firebase/firebase";
import { setUsers, setTotalCount } from "../../redux/sliceUsers";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const ITEMS_PER_PAGE = 5;

export default function Users () {
  const dispatch = useAppDispatch();
  const { userList, totalCount } = useAppSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const getUsers = async (page = 1) => {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');
    let usersQuery;
    if (page === 1) {
      usersQuery = query(usersCollection, orderBy('id'), limit(ITEMS_PER_PAGE));
    } else {
      usersQuery = query(usersCollection, orderBy('id'), startAfter(lastDoc), limit(ITEMS_PER_PAGE));
    }

    try {
      const snapshot = await getDocs(usersQuery);
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);

      const users = snapshot.docs.map(doc => doc.data() as UserType);
      dispatch(setUsers(users));
    } catch (error) {
      console.error('Error getting users:', error);
    }
  };

  const getTotalCount = async () => {
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');

    try {
      const snapshot = await getDocs(usersCollection);
      const totalCount = snapshot.size;
      dispatch(setTotalCount(totalCount));
    } catch (error) {
      console.error('Error getting total count:', error);
    }
  };

  useEffect(() => {
    getUsers();
    getTotalCount();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getUsers(pageNumber);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Text</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
        </thead>
        <tbody>
        {userList.map(u => (
          <tr key={`user_${u.id}`}>
            <td>{u.id}</td>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.text}</td>
            <td>{u.email}</td>
            <td>{u.password}</td>
          </tr>
        ))}
        </tbody>
      </Table>
      <Pagination>{paginationItems}</Pagination>
    </>
  );
}
