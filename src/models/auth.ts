import { Effect, Reducer } from 'alita';
import { query } from '@/services/api';

const LOCAL_TOKEN_KEY = 'yourTokenKey';
export interface AuthModelState {
  name: string;
  username: string;
  isAuthenticated: boolean;
  role: string;
  authToken: string;
}

export interface AuthModelType {
  namespace: 'auth';
  state: AuthModelState;
  effects: {
    logout: Effect;
    login: Effect;
    query: Effect;
    queryToken: Effect;
  };
  reducers: {
    save: Reducer<AuthModelState>;
  };
}

const AuthModel: AuthModelType = {
  namespace: 'auth',

  state: {
    name: '',
    username: '',
    isAuthenticated: false,
    role: '',
    authToken: '',
  },

  effects: {
    *logout(_, { put }) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, '');
      yield put({
        type: 'save',
        payload: { authToken: '', username: '' },
      });
    },
    *login({ payload }, { put }) {
      const { name = '', pw } = payload;
      let token = '';
      if ((name === 'admin' && pw === '1') || (name === 'user' && pw === '1')) {
        // Make a request and receive your auth token from your server
        token = `${name}.yourServerToken`;
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      }
      yield put({
        type: 'save',
        payload: { authToken: token, username: name },
      });
    },
    *queryToken(_, { put }) {
      const token = window.localStorage.getItem(LOCAL_TOKEN_KEY) || '';
      yield put({
        type: 'save',
        payload: { authToken: token, username: token.split('.')[0] },
      });
    },
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default AuthModel;
