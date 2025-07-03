/* eslint-disable prettier/prettier */
import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

export function SelectOption({
  options,
  initialValue,
  currentValue,
  toReset,
  onChange
}) {
  const [selectedValue, setSelectedValue] = useState(currentValue || '');
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const handleOptionSelect = useCallback(
    (option) => {
      return () => {
        setSelectedValue(option);
        setIsOpen(false);
        onChange(option);
      };
    },
    [onChange]
  );

  useEffect(() => {
    setSelectedValue(currentValue || '');
  }, [currentValue]);

  useEffect(() => {
    if (toReset) {
      setSelectedValue('');
    }
  }, [toReset]);

  const resetSelect = useCallback(
    (e) => {
      e.stopPropagation();
      setSelectedValue('');
      onChange('');
    },
    [onChange]
  );

  useEffect(() => {
    const closeList = () => setIsOpen(false);
    document.addEventListener('click', closeList);

    return () => document.removeEventListener('click', closeList);
  }, []);

  const handleContainerClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <SelectContainer onClick={handleContainerClick}>
      <SelectButton isOpen={isOpen} onClick={handleButtonClick}>
        {selectedValue || initialValue}

        {!isOpen && selectedValue !== initialValue ? (
          <Cross onClick={resetSelect} />
        ) : (
          <Caret isOpen={isOpen} />
        )}
      </SelectButton>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option}
              onClick={handleOptionSelect(option)}
              selected={option === selectedValue}
            >
              {option}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  position: relative;
  width: 180px;

  @media (max-width: 930px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    width: 240px;
  }
`;

const SelectButton = styled.div`
  height: 40px;
  padding: 12px 16px;
  background-color: ${({ isOpen }) => (isOpen ? '#334466' : '#263750')};
  color: #b3b3b3;
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #334466;
  }
`;

const OptionsList = styled.div`
  position: absolute;
  width: 100%;
  max-height: calc(40px * 5);
  overflow-y: auto;
  background: white;
  box-shadow: 0 4px 8px rgba(12, 12, 13, 0.05);
  border: 1px solid #83bf46;
  border-radius: 12px;
  margin-top: 5px;
  z-index: 10;
`;

const OptionItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;

  font-weight: ${({ selected }) => (selected ? 'bold' : '')};

  &:hover {
    background-color: rgba(131, 191, 70, 0.2);
  }

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const Caret = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #b3b3b3;

  &:hover {
    border-top-color: #83bf46;
  }

  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.3s;
`;

const Cross = styled.div`
  position: relative;
  width: 12px;
  height: 12px;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    height: 12px;
    background-color: #b3b3b3;
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &:hover::before,
  &:hover::after {
    background-color: #83bf46;
  }
`;
