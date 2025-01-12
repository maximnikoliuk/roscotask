export const fetchFacebookPosts = async (accessToken: string) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/me/posts?access_token=${accessToken}`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
};
