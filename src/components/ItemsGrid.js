import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card/Card';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  useEffect(() => {
    if (popupSettings.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [popupSettings.visible]);

  const getClickHandler = useCallback((character) => {
    return function handleClick() {
      setPopupSettings({
        visible: true,
        content: { ...character }
      });
    };
  }, []);

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((character) => (
        <Card
          key={character.id}
          onClickHandler={getClickHandler(character)}
          {...character}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
