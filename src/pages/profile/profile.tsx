import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/user';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState<string>('');

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError('');

    try {
      const updateData: any = {
        name: formValue.name,
        email: formValue.email
      };

      if (formValue.password) {
        updateData.password = formValue.password;
      }

      await dispatch(updateUser(updateData)).unwrap();

      setEditMode({
        name: false,
        email: false,
        password: false
      });

      setFormValue((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setUpdateUserError('Ошибка при обновлении данных');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });

    setEditMode({
      name: false,
      email: false,
      password: false
    });

    setUpdateUserError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditClick = (field: 'name' | 'email' | 'password') => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError}
      editMode={editMode}
      handleEditClick={handleEditClick}
    />
  );
};
