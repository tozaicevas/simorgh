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
  flex-shrink: 0;
  scroll-snap-align: center;
`;

const Blocks = ({ blocks, componentsToRender, isCardFormat }) =>
  blocks.map((block, index) => {
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
    return (
      <WrappingComponent key={isCardFormat ? `card-${id}` : id}>
        <Block
          position={position}
          type={type}
          typeOfPreviousBlock={typeOfPreviousBlock}
          {...model}
        />
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
