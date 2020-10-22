import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import {
  GridWrapper,
  SmallGridWithoutMargin,
  MediumGridWithMargin,
  MediumGridWithoutMargin,
  LargeGridWithMargin,
  GridItemConstrainedLargeNoMargin,
  NestedGridItemSmall,
  NestedGridItemMedium,
  NestedGridItemLarge,
  PopOutGridItemMedium,
} from '.';

describe('Styled GridWrapper items', () => {
  describe('GridWrapper', () => {
    shouldMatchSnapshot('should render correctly', <GridWrapper />);
  });

  describe('SmallGridWithoutMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <SmallGridWithoutMargin>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemSmall>
        </SmallGridWithoutMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <SmallGridWithoutMargin>
          <NestedGridItemSmall gridColumnStart="1" gridSpan={{ default: '6' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemSmall>
        </SmallGridWithoutMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <SmallGridWithoutMargin>
          <NestedGridItemSmall
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemSmall>
        </SmallGridWithoutMargin>
      </GridWrapper>,
    );
  });

  describe('MediumGridWithMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <MediumGridWithMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </MediumGridWithMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <MediumGridWithMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </MediumGridWithMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <MediumGridWithMargin>
          <NestedGridItemMedium
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemMedium>
        </MediumGridWithMargin>
      </GridWrapper>,
    );
  });

  describe('MediumGridWithoutMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <MediumGridWithoutMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemMedium>
        </MediumGridWithoutMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <MediumGridWithoutMargin>
          <NestedGridItemMedium gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemMedium>
        </MediumGridWithoutMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <MediumGridWithoutMargin>
          <NestedGridItemMedium
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemMedium>
        </MediumGridWithoutMargin>
      </GridWrapper>,
    );
  });

  describe('LargeGridWithMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <LargeGridWithMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </LargeGridWithMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <LargeGridWithMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '8' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </LargeGridWithMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <LargeGridWithMargin>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemLarge>
        </LargeGridWithMargin>
      </GridWrapper>,
    );
  });

  describe('GridItemConstrainedLargeNoMargin', () => {
    shouldMatchSnapshot(
      'should start at column 1 & span 1',
      <GridWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '1' }}>
            <div>1/4 or 1/5 or 1/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span 8',
      <GridWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge gridColumnStart="1" gridSpan={{ default: '20' }}>
            <div>4/4 or 5/5 or 8/8</div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should start at column 1 & span columns depending on breakpoint',
      <GridWrapper>
        <GridItemConstrainedLargeNoMargin>
          <NestedGridItemLarge
            gridColumnStart="1"
            gridSpan={{
              group1: '1',
              group2: '2',
              group3: '3',
              group4: '4',
              group5: '5',
            }}
          >
            <div>
              Spanning a various number of columns depending on breakpoint
            </div>
          </NestedGridItemLarge>
        </GridItemConstrainedLargeNoMargin>
      </GridWrapper>,
    );
    shouldMatchSnapshot(
      'should pop out of grid at Group 5 breakpoint',
      <GridWrapper>
        <PopOutGridItemMedium>Group 5 pop out grid.</PopOutGridItemMedium>
      </GridWrapper>,
    );
  });
});
