import React from 'react';
import styled, { css } from 'styled-components';
import ArrowLeft from '../../assets/icon-arrow-left.svg';

export const loaderSvg = (
  <svg
    className="button-loader"
    xmlns="http://www.w3.org/2000/svg"
    width="28px"
    height="28px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeWidth="13"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
      transform="rotate(5.90328 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium'
}
/**
 * @ButtonStyle is a list of button colors
 */
export enum ButtonStyle {
  PRIMARY_ORANGE = 'primary-orange',
  SECONDARY_ORANGE = 'secondary-orange',
  PRIMARY_CORAL = 'primary-coral',
  SECONDARY_CORAL = 'secondary-coral',
  PRIMARY_TEAL = 'primary-teal',
  SECONDARY_TEAL = 'secondary-teal',
  PRIMARY_INDIGO = 'primary-indigo',
  SECONDARY_INDIGO = 'secondary-indigo'
}

export interface Icon {
  title: string;
  image: string;
  description: string;
}

export interface ButtonProps {
  title: string;
  url?: string;
  urlRewrite?: string;
  size?: Size | string;
  label: string;
  icon?: Icon;
  style?: ButtonStyle | string;
  openInNewWindow?: boolean;
  className?: string;
  onClickAction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  eventCategory?: string;
  eventLabel?: string;
  shouldContainNoOpenerNoReferrer?: Function;
}
/**
 *@title is the button title
  *@url is the button redirection url
  *@size changes the button size
  *@label is the button text
  *@icon is for allow/disallow icon
  *@style is the button colors
  *@openInNewWindow targets a new window
  *@className allows overwriting of css
  *@onClickAction a callback function which controls the button action
  *@eventCategory is for GA class
  *@eventLabel is for GA data action detail
 */
const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  url,
  size = Size.MEDIUM,
  label,
  icon,
  style = ButtonStyle.PRIMARY_ORANGE,
  openInNewWindow = false,
  className = '',
  onClickAction,
  eventCategory,
  eventLabel,
  // eslint-disable no-empty-function
  shouldContainNoOpenerNoReferrer = () => {
    return false;
  }
}) => {
  const rtl = false;
  const isExternalLink = url?.indexOf('http') !== -1;
  const linkRelProps: any = {};

  if (shouldContainNoOpenerNoReferrer(url)) {
    linkRelProps.rel = 'noopener noreferrer';
  }
  let value;
  if (onClickAction) {
    value = (
      <ButtonWrapper
        rtl={rtl}
        onClick={onClickAction}
        title={title}
        className={`btn ${size} ${style} ${className} `}
        data-analytics-event-category={eventCategory}
        data-action-detail={eventLabel}
      >
        {icon && <img src={icon.image} alt={icon.description} className="btn__icon" />}
        {loaderSvg}
        {label}
        
      </ButtonWrapper>
    );
  } else if (isExternalLink) {
    value = (
      <LinkWrapper
        title={title}
        className={`btn ${size} ${style} ${className}`}
        target={openInNewWindow ? '_blank' : '_self'}
        href={url}
        {...linkRelProps}
        data-analytics-event-category={eventCategory}
        data-action-detail={eventLabel}
      >
        {icon && <img src={icon.image} alt={icon.description} className="btn__icon" />}
        {loaderSvg}
        {label}
      </LinkWrapper>
    );
  } else {
    value = (
      <LinkWrapper
        title={title}
        className={`btn ${size} ${style} ${className}`}
        href={url}
        {...linkRelProps}
        target={openInNewWindow ? '_blank' : '_self'}
        data-analytics-event-category={eventCategory}
        data-action-detail={eventLabel}
      >
        {icon && <img src={icon.image} alt={icon.description} className="btn__icon" />}
        {loaderSvg}
        {label}
      </LinkWrapper>
    );
  }
  return <DivWrapper className="btn-wrapper">{value}</DivWrapper>;
};

/**
 * button possible list of colors
 */
export const colors = {
  orange: 'var(--orange)',
  darkOrange: 'var(--dark-orange)',
  coral: 'var(--coral)',
  lightCoral: 'var(--coral-hover)',
  teal: 'var(--teal)',
  lightTeal: 'var(--light-teal)',
  indigo: 'var(--indigo)',
  lightIndigo: 'var(--light-indigo)'
};

export const primaryTheme = [ButtonStyle.PRIMARY_ORANGE, ButtonStyle.PRIMARY_CORAL, ButtonStyle.PRIMARY_TEAL, ButtonStyle.PRIMARY_INDIGO];
export const secondaryTheme = [ButtonStyle.SECONDARY_ORANGE, ButtonStyle.SECONDARY_CORAL, ButtonStyle.SECONDARY_TEAL, ButtonStyle.SECONDARY_INDIGO];
export const themeColors = [colors.orange, colors.coral, colors.teal, colors.indigo];
export const themeColorsHover = [colors.darkOrange, colors.lightCoral, colors.lightTeal, colors.lightIndigo];

export const ltrStyles = css`
  &.loading {
    padding-left: 44px;
  }
  &.loading .button-loader {
    left: 10px;
  }
`;

export const rtlStyles = css`
  &.loading {
    padding-right: 44px;
  }
  &.loading .button-loader {
    right: 10px;
  }
`;

// Build primary theme based on theme name and colors mapping
const primaryCss = primaryTheme.map(
  (theme, index) =>
    `&.${theme}, &:not([href]).${theme} {
    color: var(--white);
    background-color: ${themeColors[index]}
  }
  @media screen and (min-width: 768px) {
    &.${theme}:active, &:not([href]).${theme}:active {
      color: var(--white);
      background-color: ${themeColorsHover[index]}
    }
  }

  &.${theme} svg circle { stroke: var(--white) };
  &.${theme}:hover svg circle { stroke: var(--white); };

  @media screen and (min-width: 768px) {
    &.${theme}:hover, &:not([href]).${theme}:hover {
      color: var(--white);
      background-color: ${themeColorsHover[index]}
    }
  }
  `
);

// Build secondary theme based on theme name and colors mapping
const secondaryCss = secondaryTheme.map(
  (theme, index) =>
    `&.${theme}, &:not([href]).${theme} {
    color: ${themeColors[index]};
    background-color: var(--white);
    border: 1px solid ${themeColors[index]};
  }
  @media screen and (min-width: 768px) {
    &.${theme}:active, &:not([href]).${theme}:active {
      color: var(--white);
      background-color: ${themeColors[index]};
    }
  }

  &.${theme} svg circle { stroke: ${themeColors[index]}};
  &.${theme}:hover svg circle { stroke: var(--white) };
  
  @media screen and (min-width: 768px) {
    &.${theme}:hover, &:not([href]).${theme}:hover {
      color: var(--white);
      background-color: ${themeColors[index]};
    }
  }
  `
);

export const wrapperStyle = css`
  &.btn-wrapper {
    width: fit-content;
  }
  &.btn-wrapper button:not(.show-focus):focus,
  &.btn-wrapper a:not(.show-focus):focus {
    outline: none;
  }

  &.btn-wrapper:focus {
    outline: 2px solid #b2c6e9;
    outline-offset: 1px;
  }
`;

export const styles = css`
  &.btn {
    display: inline-block;
    box-sizing: border-box;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 20px;
    position: relative;
  }
  &.small {
    font-size: calc(14px + var(--zoom));
    font-weight: normal;
    letter-spacing: 0.05px;
    line-height: normal;
    padding: 7px 30px;
  }
  &.medium {
    font-size: calc(14px + var(--zoom));
    font-weight: normal;
    letter-spacing: 0.05px;
    line-height: normal;
    padding: 12px 30px;
  }
  .button-loader {
    display: none;
    position: absolute;
    top: 5px;
  }
  &.loading .button-loader {
    display: inline;
    & circle {
      stroke: var(--white);
    }
  }
  ${primaryCss}
  ${secondaryCss}
`;

export const ButtonWrapper = styled.button<{ className: string; rtl: boolean }>`
  ${styles}
  ${props => (props.rtl ? rtlStyles : ltrStyles)}
`;

export const LinkWrapper = styled.a`
  ${styles}
`;

export const DivWrapper = styled.div`
  ${wrapperStyle}
`;

export default Button;
