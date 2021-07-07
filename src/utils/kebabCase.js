import kebabCase from 'lodash/kebabCase'

export default string => kebabCase(string).substr(0, 100)