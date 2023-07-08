import React from 'react';
import { MouseEventHandler } from 'react';



interface CustomButtonProps {
  handleClick: MouseEventHandler<HTMLDivElement>;
  containerStyles: string;
  title: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  handleClick,
  containerStyles,
  title,
}) => {
  return (
    <div>
      <div onClick={handleClick} className={`${containerStyles} CustomButton`}>
        {title}
      </div>
    </div>
  );
};

export default CustomButton;
