import { FC, useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/user';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isLoading } = useSelector((state) => state.user);

  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';

  const handleSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await dispatch(
        loginUser({
          email,
          password
        })
      ).unwrap();

      navigate(from, { replace: true });
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
      password={password}
      setPassword={setPassword}
    />
  );
};
