// authReducer.ts
interface AuthState {
  token: string;
}

const initialAuthState: AuthState = {
  token: 'abcdef123456',
};

const authReducer = (state = initialAuthState, action: any): AuthState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
