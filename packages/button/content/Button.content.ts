import React from 'react';

export default {
  title: 'Buy it now',
  url: '/buy-it-now',
  size: 'medium',
  label: 'Buy it NOW',
  icon: {
    title: 'Buy it now icon',
    image:
      'https://res.cloudinary.com/pmprs/image/upload/c_fill,f_auto,q_60/v20200213070723/pampersc3/en-us/-/media/pampers/pampers-us/images/layout/logos/logo-pampers-oasis.png?la=en-us&v=1-201803221315&hash=AE99FE936783F446929D3C3AC67134A8AA73DD4A',
    description: 'Buy it now icon'
  },
  style: 'primary-orange',
  openInNewWindow: true,
  className: 'otherClass',
  onClickAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  }
};
