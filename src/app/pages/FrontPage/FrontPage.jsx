/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import _ from 'lodash';
import React, { Fragment, useContext, useState } from 'react';
import { string, node } from 'prop-types';
import path from 'ramda/src/path';
import findIndex from 'ramda/src/findIndex';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { frontPageDataPropTypes } from '#models/propTypes/frontPage';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import LinkedData from '#containers/LinkedData';
import ATIAnalytics from '#containers/ATIAnalytics';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import AdContainer from '#containers/Ad';
import MPUContainer from '#containers/Ad/MPU';
import IndexPageContainer from '#app/components/PageLayout/IndexPageContainer';
import IndexPageSection from '#containers/IndexPageSection';
import RadioScheduleContainer from '#containers/RadioSchedule';
import MetadataContainer from '#containers/Metadata';
import MostReadContainer from '#containers/MostRead';
import MostReadSection from '#containers/MostRead/section';
import MostReadSectionLabel from '#containers/MostRead/label';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import { NEGATIVE_MARGIN } from '#lib/styles.const';
import mockPageData from './mockPageData';
import juventusStory from './juventusStory';

const FrontPageMostReadSection = styled(MostReadSection)`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const StyledRadioScheduleContainer = styled(RadioScheduleContainer)`
  ${NEGATIVE_MARGIN}
`;

const MostReadWrapper = ({ children }) => (
  <FrontPageMostReadSection>
    <MostReadSectionLabel />
    {children}
  </FrontPageMostReadSection>
);

const renderMostRead = mostReadEndpointOverride => (
  <MostReadContainer
    mostReadEndpointOverride={mostReadEndpointOverride}
    columnLayout="twoColumn"
    wrapper={MostReadWrapper}
  />
);

MostReadWrapper.propTypes = {
  children: node.isRequired,
};

const randomBetween = (min, max) => Math.floor(Math.random() * (max - 1)); // [min, max]

const getRandomImage = groups => {
  const group = groups[randomBetween(0, groups.length - 1)];
  const { items } = group;
  const randomItem = items[randomBetween(0, items.length - 1)];
  return randomItem.indexImage
    ? randomItem.indexImage.path
    : randomItem.imageThumbnail.path;
};

const getUpdatedGroup = (group, story) => {
  return {
    ...group,
    items: [story, ...group.items],
  };
};

const updateStoryId = story => {
  return {
    ...story,
    id: `${story.id}${Math.random()}`,
  };
};

const updateImage = (story, groups) => {
  const newImage = getRandomImage(groups);

  return {
    ...story,
    indexImage: {
      ...story.indexImage,
      path: newImage,
    },
    imageThumbnail: {
      ...story.imageThumbnail,
      path: newImage,
    },
  };
};

const getUpdatedGroups = groups => {
  return [
    getUpdatedGroup(
      groups[0],
      updateImage(updateStoryId(juventusStory), groups),
    ),
    ...groups.slice(1),
  ];
};

const FrontPage = ({ pageData, mostReadEndpointOverride }) => {
  const {
    product,
    serviceLocalizedName,
    translations,
    frontPageTitle,
  } = useContext(ServiceContext);

  const [groups, setGroups] = useState(mockPageData);
  const [inputText, setInputText] = useState('');

  const { enabled: adsEnabled } = useToggle('ads');
  const home = path(['home'], translations);

  const lang = path(['metadata', 'language'], pageData);
  const description = path(['metadata', 'summary'], pageData);
  const seoTitle = path(['promo', 'name'], pageData);
  const radioScheduleData = path(['radioScheduleData'], pageData);
  const radioSchedulePosition = path(['radioSchedulePosition'], pageData);

  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);

  const offScreenText = (
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text">
      <span lang="en-GB">{product}</span>, {serviceLocalizedName} - {home}
    </span>
  );

  // Most Read is required to render above useful-links if it exists

  const hasUsefulLinks =
    findIndex(group => group.type === 'useful-links')(groups) > -1;

  const handleInputTextChange = event => {
    setInputText(event.target.value);
    _.times(13, () => {
      setGroups(getUpdatedGroups);
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ paddingTop: 16 }}>
          Add stories:{' '}
          <input
            type="text"
            value={inputText}
            onChange={handleInputTextChange}
            name="add_stories"
          />
        </div>
      </div>
      {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
      {adsEnabled && showAdsBasedOnLocation && !isAmp && (
        <CanonicalAdBootstrapJs />
      )}
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      <MetadataContainer
        title={frontPageTitle}
        lang={lang}
        description={description}
        openGraphType="website"
      />
      <LinkedData type="WebPage" seoTitle={seoTitle} />
      <AdContainer slotType="leaderboard" />
      <main role="main">
        <VisuallyHiddenText id="content" tabIndex="-1" as="h1">
          {offScreenText}
        </VisuallyHiddenText>
        <IndexPageContainer>
          {groups.map((group, index) => (
            <Fragment key={group.title}>
              {group.type === 'useful-links' && renderMostRead()}
              {radioScheduleData &&
                radioSchedulePosition === group.semanticGroupName && (
                  <StyledRadioScheduleContainer
                    initialData={radioScheduleData}
                  />
                )}
              <IndexPageSection group={group} sectionNumber={index} />
              {group.type === 'top-stories' && <MPUContainer />}
            </Fragment>
          ))}
          {!hasUsefulLinks && renderMostRead(mostReadEndpointOverride)}
        </IndexPageContainer>
      </main>
    </div>
  );
};

FrontPage.propTypes = {
  pageData: frontPageDataPropTypes.isRequired,
  mostReadEndpointOverride: string,
};

FrontPage.defaultProps = {
  mostReadEndpointOverride: null,
};

export default FrontPage;
