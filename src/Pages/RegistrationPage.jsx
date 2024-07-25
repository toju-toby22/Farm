import React, { useState } from 'react'
import FirstSection from '../Registration Components/FirstSection'
import SecondSection from '../Registration Components/SecondSection'
import ThirdSection from '../Registration Components/ThirdSection'
import FourthSecion from '../Registration Components/FourthSecion'

const RegistrationPage = () => {
  const [section, setSection] = useState(1);

  const handleFirstSectionComplete = () => {
    setSection(2);
  };

  const handleSecondSectionComplete = () => {
    // Route to the next section or handle form submission
    console.log('Second section complete');
  };

  return (
    <div>
      {section === 1 && <FirstSection onComplete={handleFirstSectionComplete} />}
      {section === 2 && <SecondSection onComplete={handleSecondSectionComplete} />}
    </div>
  );
};
export default RegistrationPage
