import React, { useState } from 'react';
import RestrictedSlider from './RestrictedSlider';

const App: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const marks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  return (
    <div>
      <RestrictedSlider
        min={0}
        max={100}
        values={[0, 25, 50, 75, 100]}
        onChange={handleSliderChange}
        className="custom-slider"
        defaultValue={20}
        marks={marks}
      />
      <p>Slider Value: {sliderValue}</p>
    </div>
  );
};

export default App;
