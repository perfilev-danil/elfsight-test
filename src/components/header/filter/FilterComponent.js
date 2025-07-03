/* eslint-disable prettier/prettier */
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectOption } from './SelectOption';

import axios from 'axios';
import styled from 'styled-components';

const API_RM_URL = 'https://rickandmortyapi.com/api/character';

export function FilterComponent() {
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [species, setSpecies] = useState([]);
  const [toReset, setToReset] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');

  useEffect(() => {
    setIsFetching(true);

    axios
      .get(API_RM_URL)
      .then(({ data }) => {
        const characters = data.results;

        setStatuses([...new Set(characters.map((c) => c.status))]);
        setGenders([...new Set(characters.map((c) => c.gender))]);
        setSpecies([...new Set(characters.map((c) => c.species))]);

        setIsFetching(false);
      })
      .catch(() => setIsFetching(false));
  }, [isFetching]);

  const handleNameChange = useCallback((e) => {
    setNameValue(e.target.value);
  }, []);

  const handleTypeChange = useCallback((e) => {
    setTypeValue(e.target.value);
  }, []);

  const resetFilters = useCallback(() => {
    setToReset((prev) => !prev);

    setNameValue('');
    setTypeValue('');
    setStatusValue('');
    setGenderValue('');
    setSpeciesValue('');

    const params = new URLSearchParams();
    params.set('page', '1');
    setSearchParams(params);
  }, [setSearchParams]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();

    if (nameValue) params.set('name', nameValue);
    if (typeValue) params.set('type', typeValue);
    if (statusValue) params.set('status', statusValue);
    if (genderValue) params.set('gender', genderValue);
    if (speciesValue) params.set('species', speciesValue);

    params.set('page', '1');

    setSearchParams(params);
  }, [
    nameValue,
    typeValue,
    statusValue,
    genderValue,
    speciesValue,
    setSearchParams
  ]);

  useEffect(() => {
    setNameValue(searchParams.get('name') || '');
    setTypeValue(searchParams.get('type') || '');
    setStatusValue(searchParams.get('status') || '');
    setGenderValue(searchParams.get('gender') || '');
    setSpeciesValue(searchParams.get('species') || '');
  }, [searchParams]);

  return (
    <FilterContainer>
      <SelectOption
        options={statuses}
        state={''}
        currentValue={statusValue || ''}
        initialValue={'Status'}
        toReset={toReset}
        onChange={setStatusValue}
      ></SelectOption>
      <SelectOption
        options={genders}
        state={''}
        currentValue={genderValue || ''}
        initialValue={'Gender'}
        toReset={toReset}
        onChange={setGenderValue}
      ></SelectOption>
      <SelectOption
        options={species}
        state={''}
        currentValue={speciesValue || ''}
        initialValue={'Species'}
        toReset={toReset}
        onChange={setSpeciesValue}
      ></SelectOption>

      <Input
        value={nameValue}
        hasValue={nameValue.trim() !== ''}
        onChange={handleNameChange}
        placeholder="Name"
      />
      <Input
        value={typeValue}
        hasValue={typeValue.trim() !== ''}
        onChange={handleTypeChange}
        placeholder="Type"
      />

      <ButtonsContainer>
        <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
        <ResetButton onClick={resetFilters}>Reset</ResetButton>
      </ButtonsContainer>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const Input = styled.input`
  width: 180px;
  height: 40px;
  padding: 12px 16px;
  background-color: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: ${({ hasValue }) => (hasValue ? '#ffffff' : '#b3b3b3')};
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: #334466;
  }

  &:focus {
    background-color: #334466;
    outline: none;
  }

  @media (max-width: 930px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    width: 240px;
  }
`;

const ButtonsContainer = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 930px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    width: 240px;
  }
`;

const ApplyButton = styled.button`
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  text-align: center;
  width: 100%;
  padding: 12px auto;
  color: #83bf46;
  border: 1px solid #83bf46;
  background-color: transparent;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #83bf46;
    color: white;
  }
`;

const ResetButton = styled.button`
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  text-align: center;
  width: 100%;
  padding: 12px auto;
  color: #ff5152;
  border: 1px solid #ff5152;
  background-color: transparent;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff5152;
    color: white;
  }
`;
