import React, { useState, useEffect } from 'react';
import './App.css';

interface Mark {
  value: number;
  label: string;
}

interface RestrictedSliderProps {
  min: number;
  max: number;
  step?: number;
  values: number[];
  onChange: (value: number) => void;
  className?: string;
  defaultValue?: number;
  marks?: Mark[];
}

const RestrictedSlider: React.FC<RestrictedSliderProps> = ({
  min,
  max,
  step = 1,
  values,
  onChange,
  className = '',
  defaultValue = min,
  marks = [],
}) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (currentValue < min) {
      setCurrentValue(min);
    } else if (currentValue > max) {
      setCurrentValue(max);
    } else if (!values.includes(currentValue)) {
   
      const closestValue = values.reduce((prev, curr) =>
        Math.abs(curr - currentValue) < Math.abs(prev - currentValue) ? curr : prev
      );
      setCurrentValue(closestValue);
    }
  }, [currentValue, min, max, values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    
    const nearestMark = marks.reduce((prev, curr) =>
      Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue) ? curr : prev
    );
    setCurrentValue(nearestMark.value);
    onChange(nearestMark.value);
  };

  return (
    <div className={`restricted-slider-container ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="restricted-slider"
      />
      <div className="slider-marks">
        {marks.map((mark, index) => (
          <span
            key={index}
            className="slider-mark"
            style={{ left: `${((mark.value - min) / (max - min)) * 100}%` }}
          >
            {mark.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RestrictedSlider;
