import { useContext, useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import { fetchFacebookPosts } from '../../services/postsService.tsx';
import { Post } from "../../types/misc.tsx";
import { AuthContext } from '../../context/AuthContext.tsx';
import moment from "moment/moment";

export default function Posts () {
  const context = useContext(AuthContext);
  const { user, fbAccessToken } = context;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async (accessToken: string) => {
      const postList = await fetchFacebookPosts(accessToken);
      setPosts(postList);
    };
    if (user && fbAccessToken) {
      fetchPosts(fbAccessToken);
    } else {
      console.log('Facebook access token not found');
    }
  }, [user, fbAccessToken]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {
        posts.map(p => (
          <tr key={`post_${p.id}`}>
            <td>{p.id}</td>
            <td>{moment(p.created_time).format('MMM, DD HH:mm')}</td>
          </tr>
        ))
      }
      </tbody>
    </Table>
  );
};
