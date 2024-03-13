import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './page-not-found.module.scss';

const cx = classNames.bind(styles);

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={cx('page-not-found')}>
      <div className={cx('page-not-found__content')}>
        <span className={cx('page-not-found__title')}>Oops! Įvyko klaida.</span>
        <span className={cx('page-not-found__text')}>Puslapis, kurio ieškote nebuvo rastas</span>
        <Button onClick={() => navigate('/')} label="Grįžti į pagrindinį puslapį" />
      </div>
    </div>
  );
};
