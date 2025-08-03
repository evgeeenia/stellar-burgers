import { FC } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';
import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

interface ExtendedProfileUIProps extends ProfileUIProps {
  editMode: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
  handleEditClick: (field: 'name' | 'email' | 'password') => void;
}

export const ProfileUI: FC<ExtendedProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange,
  editMode,
  handleEditClick
}) => (
  <main className={`${commonStyles.container}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <form
      className={`mt-30 ${styles.form} ${commonStyles.form}`}
      onSubmit={handleSubmit}
    >
      <>
        <div className='pb-6'>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleInputChange}
            value={formValue.name}
            name={'name'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!editMode.name}
            onIconClick={() => handleEditClick('name')}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onPointerEnter={undefined}
            onPointerLeave={undefined}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={handleInputChange}
            value={formValue.email}
            name={'email'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!editMode.email}
            onIconClick={() => handleEditClick('email')}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onPointerEnter={undefined}
            onPointerLeave={undefined}
          />
        </div>
        <div className='pb-6'>
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={handleInputChange}
            value={formValue.password}
            name={'password'}
            error={false}
            errorText={''}
            size={'default'}
            icon={'EditIcon'}
            disabled={!editMode.password}
            onIconClick={() => handleEditClick('password')}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button type='primary' size='medium' htmlType='submit'>
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError}
          </p>
        )}
      </>
    </form>
  </main>
);
