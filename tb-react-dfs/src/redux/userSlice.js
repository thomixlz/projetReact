import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import correct

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  userInfo: {},
  list: [],
};

// Charger les informations de l'utilisateur et l'état d'admin depuis le localStorage
const storedUser = localStorage.getItem('user');
if (storedUser && storedUser !== 'undefined') {
  try {
    const user = JSON.parse(storedUser);
    initialState.isLoggedIn = true;
    initialState.userInfo = user;
    initialState.isAdmin = user.isAdmin;
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Stocker dans le localStorage
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
      const user = { ...state.userInfo, isAdmin: action.payload };
      localStorage.setItem('user', JSON.stringify(user)); // Mettre à jour le localStorage
    },
    setUsers(state, action) {
      state.list = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.userInfo = {};
      state.list = [];
      localStorage.removeItem('user'); // Supprimer du localStorage
    },
  },
});

export const { setUser, setAdmin, setUsers, logout } = userSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4555/login', credentials);
    const token = response.data; // JWT token
    const decodedUser = jwtDecode(token); // Décoder le token pour obtenir les informations utilisateur

    dispatch(setUser(decodedUser));

    const adminResponse = await axios.get('http://localhost:4555/isadmin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (adminResponse.data && typeof adminResponse.data.isAdmin === 'boolean') {
      dispatch(setAdmin(adminResponse.data.isAdmin));
    } else {
      console.error('Invalid admin response:', adminResponse.data);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4555/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch(setUsers(response.data));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const updateUserRole = (id, newType) => async (dispatch) => {
  try {
    await axios.patch(`http://localhost:4555/usertype`, { id, newType });
    dispatch(fetchUsers());
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4555/user`, { data: { id } });
    dispatch(fetchUsers());
  } catch (error) {
    console.error(error);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    await axios.post('http://localhost:4555/signup', user);
    dispatch(fetchUsers());
  } catch (error) {
    console.error(error);
  }
};

export default userSlice.reducer;
