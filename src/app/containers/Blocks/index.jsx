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
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Card = styled.div`
  width: 100%;
  flex-shrink: 0;
  scroll-snap-align: center;
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

      setTimeout(() => document.getElementById(id).scrollIntoView(), showFullStory ? 0 : 200)
    }

    return (
      <WrappingComponent key={isCardFormat ? `card-${id}` : id}>
        <div id={isCardFormat ? '' : id}>
          <Block
            position={position}
            type={type}
            typeOfPreviousBlock={typeOfPreviousBlock}
            {...model}
          />
          {isCardFormat && <button onClick={() => scrollToId(setShowFullStory, showFullStory, id)}>See More</button>}
        </div>
        
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
