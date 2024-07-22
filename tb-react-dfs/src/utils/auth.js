export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.type === 'admin';
  };
  