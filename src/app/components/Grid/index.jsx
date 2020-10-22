// import { LargeGridWithMargin } from '#app/components/Grid';
import React from 'react';
import styled from 'styled-components';
import { node, number } from 'prop-types';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { layoutGridItemSmall } from './gridLayouts';

export const GelPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

/* The following components relate to Grid configuration and Grid styles used on the following page types:
 * STY,MAP,PGL,Front Page,IDX page
 */
const StyledCPSPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

// Is this in case the developer doesn't know the max?
// We could cover this with a max input test instead
const getGroupFiveColumns = (specified, maximum) =>
  specified > maximum ? maximum : specified;

export const CPSPageGrid = ({ children, ...props }) => (
  <StyledCPSPageGrid
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 8,
    }}
    enableGelGutters
    {...props}
  >
    {children}
  </StyledCPSPageGrid>
);

export const ArticlePageGrid = ({ children, ...props }) => (
  <Grid
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
    {...props}
  >
    {children}
  </Grid>
);

export const SmallGridWithoutMargin = styled(props => (
  <Grid
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 4,
      group3: 5,
      group4: 4,
      group5: 8,
    }}
    {...props}
  />
))`
  ${layoutGridItemSmall}
`;

export const MediumGridWithMargin = props => (
  <Grid
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: props.gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: getGroupFiveColumns(props.gridSpan, 22),
    }}
    {...props}
  />
);

export const MediumGridWithoutMargin = props => (
  <Grid
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: props.gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: getGroupFiveColumns(props.gridSpan, 22),
    }}
    {...props}
  />
);

export const LargeGridWithMargin = props => (
  <Grid
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
    {...props}
  />
);

export const LargeGridWithoutMargin = props => (
  <Grid
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
    {...props}
  />
);

// This isn't used anywhere - delete?
export const GridItemConstrainedLargeWithTopMargin = styled(
  LargeGridWithMargin,
)`
  margin-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
`;

// 1.
// The max-height must be 0 at Group 5 breakpoints so that
// the item does not force the following sibling item downwards.

const PopOutAtGroup5 = styled(MediumGridWithMargin)`
  @supports (display: grid) {
    @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
      max-height: 0; /* [1] */
      padding-top: 0.25rem;
    }
  }
`;

export const PopOutGridItemMedium = props => {
  const { children } = props;
  return <PopOutAtGroup5 {...props}>{children}</PopOutAtGroup5>;
};

CPSPageGrid.propTypes = {
  children: node.isRequired,
};

MediumGridWithMargin.propTypes = {
  gridColumnStart: number,
  gridSpan: number,
};

MediumGridWithMargin.defaultProps = {
  gridColumnStart: 5,
  gridSpan: 10,
};

MediumGridWithoutMargin.propTypes = {
  gridColumnStart: number,
  gridSpan: number,
};

MediumGridWithoutMargin.defaultProps = {
  gridColumnStart: 5,
  gridSpan: 10,
};

PopOutGridItemMedium.propTypes = {
  children: node.isRequired,
  gridColumnStart: number,
  gridSpan: number,
};

PopOutGridItemMedium.defaultProps = {
  gridColumnStart: 1,
  gridSpan: 4,
};

export default Grid;
