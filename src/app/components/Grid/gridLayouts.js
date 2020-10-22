import { css } from 'styled-components';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const fourOfSixColumnsMaxWidthGroup4 = `30rem`;
/* (group4ColWidth 6.75rem * 4) + (3 * 16px gutters) = 27rem + 3rem = 30rem */

const eightOfTwelveColumnsMaxWidthGroup5 = `30.6rem`;
/* (group5ColWidth 2.95rem * 8) + (7 * 16px gutters) = 23.6rem + 7rem = 30.6rem */

const fiveOfSixColumnsMaxWidthScaleable = `83.33%`;
// (5 / 6) * 100 = 83.3333.. = 83.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666.. = 66.67%

export const gelGridMargin = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
`;

export const layoutGridItemSmall = css`
  ${gelGridMargin}

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ${({ padding = {} }) =>
      padding.group2 ? `padding: 0 ${padding.group2}` : ''};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    max-width: ${fourOfSixColumnsMaxWidthScaleable};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    max-width: ${fiveOfSixColumnsMaxWidthScaleable};
    ${({ padding = {} }) =>
      padding.group3 ? `padding: 0 ${padding.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    max-width: ${fourOfSixColumnsMaxWidthGroup4};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${eightOfTwelveColumnsMaxWidthGroup5};
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;
