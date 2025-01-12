import React, { useContext, useEffect, useState } from 'react';
import { fetchFacebookPosts } from '../../services/postsService.tsx';
import { Post } from "../../types/misc.tsx";
import { AuthContext } from '../../context/AuthContext.tsx';

const PostList: React.FC = () => {
  const { user, fbAccessToken } = useContext(AuthContext);
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
  }, []);

  return (
    <div>
      <h2>My Facebook Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.id} - {post.created_time}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
