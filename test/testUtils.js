import checkPropTypes from "check-prop-types";

/**
 * Return node(s) with the given data-test attribute.
 * @param {Object} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value of data-test attribute for search.
 * @returns {Object} -Enzyme shallow wrapper
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Throw error if conformingProps do not pass propTypes validation.
 * @param {Object} component - React.Component to check props against
 * @param {Object} conformingProps - Props we expect to conform to defined propTypes
 */
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
