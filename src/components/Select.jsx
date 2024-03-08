import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="inline-block" htmlFor={id}>
          {label}
        </label>
      )}
      <select className={` ${className}`} {...props} id={id} ref={ref}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
