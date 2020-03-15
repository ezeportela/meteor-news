import React from 'react';
import { Link } from 'react-router-dom';

export default Card = props => {
  const {
    title,
    col,
    children,
    to,
    hoverable,
    cardColor,
    cardImagePlaceholder,
    classNames,
    href
  } = props;
  const _col = `col ${col || 's12'}`;
  const cardClassnames = `card ${hoverable ? 'hoverable' : ''} ${classNames}`;
  const cardContentClassnames = `card-content ${cardColor || 'black-text'}`;

  const content = (
    <div className={cardClassnames}>
      {cardImagePlaceholder && (
        <div className="card-image">{cardImagePlaceholder}</div>
      )}
      <div className={cardContentClassnames}>
        {title && <span className="card-title">{title}</span>}
        {children}
      </div>
    </div>
  );

  return (
    <div className={_col}>
      {to ? (
        <Link to={to}>{content}</Link>
      ) : href ? (
        <a href={href} target="__blank">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};
