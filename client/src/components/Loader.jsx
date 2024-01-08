import PropTypes from "prop-types";

const Loader = ({ addClass }) => {
   return <div className={`loader z-10 ${addClass}`}></div>;
};

Loader.propTypes = {
   addClass: PropTypes.string,
};

export default Loader;
