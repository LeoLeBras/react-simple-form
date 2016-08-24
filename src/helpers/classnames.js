/* @flow */

type Classnames = Array<?string>

export default function (classnames: Classnames): string {
  return classnames
    .filter(classname => typeof classname === 'string')
    .join(' ')
}
