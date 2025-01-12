import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { UserType } from "../../types/UsersTypes.tsx";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { app } from "../../firebase/firebase.tsx";
import { setUsers } from "../../redux/sliceUsers.tsx";
import { useAppDispatch, useAppSelector } from "../../redux/store.tsx";

export default function Users () {
  const dispatch = useAppDispatch();
  const { userList } = useAppSelector(
    (state) => state.users,
  );

  const getUsers = async () => {
    let courses: UserType[] = [];
    const db = getFirestore(app);
    const coursesCollection = collection(db, 'users');
    let coursesSnapshot = await getDocs(coursesCollection);
    coursesSnapshot.forEach(doc => {
      let course = doc.data() as UserType;
      courses.push(course);
    });
    dispatch(setUsers(courses));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
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
      {
        userList.map(u => (
          <tr key={`user_${u.id}`}>
            <td>{u.id}</td>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.text}</td>
            <td>{u.email}</td>
            <td>{u.password}</td>
          </tr>
        ))
      }
      </tbody>
    </Table>
  )
}
