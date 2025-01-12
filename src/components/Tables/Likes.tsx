import { useContext, useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import moment from 'moment';
import { fetchFacebookLikes } from '../../services/likesService.tsx';
import { Like } from "../../types/misc.tsx";
import { AuthContext } from '../../context/AuthContext.tsx';

export default function Likes () {
  const context = useContext(AuthContext);
  const { user, fbAccessToken } = context;
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    const fetchLikes = async (accessToken: string) => {
      const likeList = await fetchFacebookLikes(accessToken);
      setLikes(likeList);
    };
    if (user && fbAccessToken) {
      fetchLikes(fbAccessToken);
    } else {
      console.log('Facebook access token not found');
    }
  }, [user, fbAccessToken]);

  return (
    <Table striped bordered hover responsive>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      {
        likes.map(l => (
          <tr key={`like_${l.id}`}>
            <td>{l.id}</td>
            <td>{l.name}</td>
            <td>{moment(l.created_time).format('MMM, DD HH:mm')}</td>
          </tr>
        ))
      }
      </tbody>
    </Table>
  );
};
