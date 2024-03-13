import React from 'react';
import classNames from 'classnames';
import classNamesBind from 'classnames/bind';
import styles from './sidebar.module.scss';

const cx = classNamesBind.bind(styles);

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className={classNames('h-screen fixed p-sidebar-left shadow-2 bg-white p-3', cx('sidebar__content'))}>
      {children}
    </div>
  );
};
