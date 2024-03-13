import { Menu } from 'primereact/menu';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import { MOBILE_WIDTH } from '../../../utils/constants';
import { useScreenMedia } from '../../../hooks/useScreenMedia';
import styles from './main-header.module.scss';
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

interface MainHeaderProps {
  toggleSidebar: () => void;
  children: React.ReactNode;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ toggleSidebar }) => {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const { matches: matchesMobile } = useScreenMedia({ max: MOBILE_WIDTH });

  return (
    <div
      className={cx('main-header')}
      data-testid={'pw-main-header'}
      onMouseLeave={(event) => menu.current?.hide(event)}
    >
      <div className={cx('main-header__container')}>
        <div className={`gap-1 sm:gap-3 ${cx('main-header__menu-container')}`}>
          <Button onClick={toggleSidebar} icon="pi pi-bars" className={`${cx('main-header__burger')}`} />

          {matchesMobile && (
            <div className="flex align-items-center">
              <div className="flex gap-0">
                <Button
                  onClick={() => navigate('/dashboard')}
                  icon="pi pi-home"
                  className={cx('main-header__menu-button')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
