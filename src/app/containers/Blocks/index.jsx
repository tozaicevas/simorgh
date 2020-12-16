import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import {
  objectOf,
  arrayOf,
  func,
  shape,
  string,
  oneOfType,
  object,
} from 'prop-types';

const Card = styled.div`
  width: 100%;
  margin-right: 24px;
  background-color: #fff;
  flex-shrink: 0;
  scroll-snap-align: center;
  padding: 16px;
  box-shadow: 0px 0px 11px #0000005e;
`;

const Button = styled.button`
  background: none;
  font-family: Helmet,Freesans,Helvetica,Arial,sans-serif;
  font-weight: normal;
	cursor: pointer;
	outline: inherit;
  display: block;
  color: #3F3F42;
  border: 1px solid #DB7F7F;
  font-weight: bold;
  padding: 1rem;
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #B80000;
    color: #FFFFFF;
  }
`;

const CSSHack = styled.div`
  & ul {
    list-style-type: disc;
  }

  & a {
    text-decoration: underline !important;
  }
`;

const Blocks = ({ blocks, componentsToRender, isCardFormat, setShowFullStory, showFullStory }) =>
  blocks.map((block, index) => {
    if (!block) {
      return null;
    }

    const { type, model, id, position } = block;

    if (!componentsToRender || !type) {
      return null;
    }

    const Block = componentsToRender[type];

    if (!Block) {
      return null;
    }

    const WrappingComponent = isCardFormat ? Card : Fragment;

    const { type: typeOfPreviousBlock } = blocks[index - 1] || {};

    const scrollToId = (setShowFullStory, showFullStory, id) => {
      setShowFullStory(true);

      setTimeout(() => document.getElementById(id).scrollIntoView({ behavior: "smooth" }), showFullStory ? 0 : 200)
    }

    return (
      <WrappingComponent key={isCardFormat ? `card-${id}` : id}>
        <CSSHack id={isCardFormat ? '' : id}>
          <Block
            position={position}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
          {isCardFormat && <Button onClick={() => scrollToId(setShowFullStory, showFullStory, id)}>See More</Button>}
        </CSSHack>
      </WrappingComponent>
    );
  });

Blocks.propTypes = {
  blocks: arrayOf(
    shape({
      type: string.isRequired,
      model: shape({
        blocks: arrayOf(oneOfType([string, object])),
      }).isRequired,
    }),
  ).isRequired,
  componentsToRender: objectOf(func).isRequired,
};

export default Blocks;
