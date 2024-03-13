import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './navigation-item.module.scss';

const cx = classNames.bind(styles);

interface NavigationItemProps {
  title: string;
  to: string;
  className?: string;
  iconComponent?: React.FC<any>;
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  to,
  onClick,
  className,
  iconComponent: IconComponent,
}) => {
  return (
    <NavLink
      onClick={() => {
        onClick && onClick();
      }}
      to={to}
      className={({ isActive }) =>
        `${className || ''} ${cx('navigation-item')} ${isActive ? `${cx('navigation-item--active')}` : ''}`
      }
      end
    >
      {IconComponent && <IconComponent />}
      <span className={cx('navigation-item__title')}>{title}</span>
    </NavLink>
  );
};
