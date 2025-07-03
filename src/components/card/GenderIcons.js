/* eslint-disable prettier/prettier */
import { ReactComponent as Male } from '../../assets/genders/male.svg';
import { ReactComponent as Female } from '../../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../../assets/genders/genderless.svg';

export function GenderIcon({ gender }) {
  if (gender === 'Male') {
    return <Male width={20} height={20} fill="#33b3c8" title="Male" />;
  }

  if (gender === 'Female') {
    return <Female width={24} height={24} fill="pink" title="Female" />;
  }

  if (gender === 'unknown' || gender === 'Genderless') {
    return <Genderless width={24} height={24} fill="#999" title="Genderless" />;
  }

  return null;
}
