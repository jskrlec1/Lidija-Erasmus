import React from "react";
import { Link  } from "react-router-dom";
import PropTypes from 'prop-types'; // Dodajte ovaj import

const YearButton = ({ year, path }) => {
  return (
    <Link to={path} className="btn btn-primary my-2 w-100">
      {year}
    </Link>
  );
};

YearButton.propTypes = {
  year: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default YearButton;
