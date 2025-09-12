import api,{API_BASE} from '@/services/api';

export default {
  loginWithProvider(provider) {
    window.location.href = `${API_BASE}/auth/${provider}/redirect`;
  },

  async handleCallback(provider,allParams) {
    try {
      const response = await api.get(`/auth/${provider}/callback`, { params: allParams });
      const { user, token } = response.data.data;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { user, token };
    } catch (error) {
      console.error('GitHub login failed:', error);
      throw error;
    }
  },
  // Email/Password login → triggers OTP
  async login(credentials) {
    const response = await api.post(`/login`, credentials);
    return response.data; // { message, requires_otp: true, user_id }
  },
  // Verify OTP
  async verifyOtp(payload) {
    const response = await api.post(`/verify-otp`, payload);
    const { user, token } = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };
  },
  logout() {
    return api.post(`${API_BASE}/logout`).then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    });
  },

  checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { user: JSON.parse(user), token };
    }
    return null;
  }
};
