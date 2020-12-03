import React, { useContext, useState, useEffect, useRef } from 'react';
import { node } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_SEXT,
} from '@bbc/gel-foundations/spacings';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import Grid, { GelPageGrid } from '#app/components/Grid';
import { getImageParts } from '#app/routes/cpsAsset/getInitialData/convertToOptimoBlocks/blocks/image/helpers';
import CpsMetadata from '#containers/CpsMetadata';
import ChartbeatAnalytics from '#containers/ChartbeatAnalytics';
import LinkedData from '#containers/LinkedData';
import headings from '#containers/Headings';
import Timestamp from '#containers/ArticleTimestamp';
import text from '#containers/CpsText';
import image from '#containers/Image';
import MediaPlayer from '#containers/CpsAssetMediaPlayer';
import Blocks from '#containers/Blocks';
import CpsRelatedContent from '#containers/CpsRelatedContent';
import TopStories from '#containers/CpsTopStories';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import MostReadContainer from '#containers/MostRead';
import ATIAnalytics from '#containers/ATIAnalytics';
import ComscoreAnalytics from '#containers/ComscoreAnalytics';
import cpsAssetPagePropTypes from '../../models/propTypes/cpsAssetPage';
import fauxHeadline from '#containers/FauxHeadline';
import visuallyHiddenHeadline from '#containers/VisuallyHiddenHeadline';
import Byline from '#containers/Byline';
import SocialEmbed from '#containers/SocialEmbed';
import CpsRecommendations from '#containers/CpsRecommendations';
import {
  getFirstPublished,
  getLastPublished,
  getAboutTags,
} from '#lib/utilities/parseAssetData';
import categoryType from './categoryMap/index';
import Include from '#containers/Include';
import { ServiceContext } from '#contexts/ServiceContext';
import AdContainer from '#containers/Ad';
import CanonicalAdBootstrapJs from '#containers/Ad/Canonical/CanonicalAdBootstrapJs';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import fetchPageData from '../../routes/cpsAsset/getInitialData';
import Switch from "react-switch";

const MpuContainer = styled(AdContainer)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const StyledTimestamp = styled(Timestamp)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
`;

const gridColsMain = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 8,
  group5: 8,
};

const CardTrack = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding: 16px;
  width: 100%;
`;

const CardTrackWrapper = styled.div`
  overflow-x: hidden;
  background-color: coral;
`;

const FullStorySection = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
`;

const InfiniteStory = ({ pageData }) => {
  const [showFullStory, setShowFullStory] = useState(false);

  const metadata = path(['metadata'], pageData);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const { enabled: adsEnabled } = useToggle('ads');
  const { showAdsBasedOnLocation } = useContext(RequestContext);

  const isAdsEnabled = [
    path(['metadata', 'options', 'allowAdvertising'], pageData),
    adsEnabled,
    showAdsBasedOnLocation,
  ].every(Boolean);

  const StyledByline = styled(Byline)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image,
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    byline: props => <StyledByline {...props} />,
    include: props => <Include {...props} />,
    social_embed: props => <SocialEmbed {...props} />,
    mpu: props =>
      isAdsEnabled ? <MpuContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations {...props} parentColumns={gridColsMain} items={[]} />
    ),
  };

  const [headline, timestamp, ...bodyBlocks] = blocks;
  const numberOfCards = 5;
  const cardBlocks = bodyBlocks.slice(0, numberOfCards);

  return (
    <>
      <Blocks
        blocks={[headline, timestamp]}
        componentsToRender={componentsToRender}
      />
      <>
        <Switch onChange={() => setShowFullStory(!showFullStory)} checked={showFullStory} />
        <CardTrackWrapper>
          <CardTrack>
            <Blocks
              blocks={cardBlocks}
              componentsToRender={componentsToRender}
              isCardFormat
            />
          </CardTrack>
        </CardTrackWrapper>
      </>
      <>
        <FullStorySection show={showFullStory}>
          <Blocks blocks={bodyBlocks} componentsToRender={componentsToRender} />
        </FullStorySection>
      </>
    </>
  );
};

const StoryPage = ({ pageData, mostReadEndpointOverride }) => {
  const { isAmp, showAdsBasedOnLocation, referrer } = useContext(RequestContext);
  const [showFullStory, setShowFullStory] = useState(referrer != 'social' ? true : false)
  const [isLoading, setIsLoading] = useState(false);
  const [infiniteStories, setInfiniteStories] = useState([]);

  const {
    dir,
    mostRead: { header },
    script,
    service,
    serviceLang,
    lang,
    variant,
  } = useContext(ServiceContext);
  const title = path(['promo', 'headlines', 'headline'], pageData);
  const shortHeadline = path(['promo', 'headlines', 'shortHeadline'], pageData);
  const category = path(
    ['promo', 'passport', 'category', 'categoryName'],
    pageData,
  );
  const summary = path(['promo', 'summary'], pageData);
  const metadata = path(['metadata'], pageData);
  const allowDateStamp = path(['options', 'allowDateStamp'], metadata);
  const assetUri = path(['locators', 'assetUri'], metadata);
  const blocks = pathOr([], ['content', 'model', 'blocks'], pageData);
  const relatedContent = pathOr(
    [],
    ['relatedContent', 'groups', 0, 'promos'],
    pageData,
  );
  const indexImagePath = path(['promo', 'indexImage', 'path'], pageData);
  const indexImageLocator = indexImagePath
    ? getImageParts(indexImagePath)[1]
    : null;
  const indexImageAltText = path(['promo', 'indexImage', 'altText'], pageData);
  const firstPublished = getFirstPublished(pageData);
  const lastPublished = getLastPublished(pageData);
  const aboutTags = getAboutTags(pageData);
  const mostReadInitialData = path(['mostRead'], pageData);
  const topStoriesInitialData = path(
    ['secondaryColumn', 'topStories'],
    pageData,
  );
  const featuresInitialData = path(['secondaryColumn', 'features'], pageData);
  const recommendationsInitialData = path(['recommendations'], pageData);

  const [nextRelatedItem, setNextRelatedItem] = useState(0);

  const gridColumns = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 12,
    group5: 12,
  };

  const gridMargins = {
    group0: false,
    group1: false,
    group2: false,
    group3: false,
    group4: true,
    group5: true,
  };

  const gridOffset = {
    group0: 1,
    group1: 1,
    group2: 1,
    group3: 1,
    group4: 1,
    group5: 1,
  };

  const gridColsSecondary = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 4,
    group5: 4,
  };

  // ads
  const { enabled: adsEnabled } = useToggle('ads');
  const adcampaign = path(['metadata', 'adCampaignKeyword'], pageData);

  /**
   * Should we display ads? We check:
   * 1. The CPS `allowAdvertising` field value.
   * 2. A value local to the STY page type.
   * - iSite toggles are handled by the Ad container.
   */
  const isAdsEnabled = [
    path(['metadata', 'options', 'allowAdvertising'], pageData),
    adsEnabled,
    showAdsBasedOnLocation,
  ].every(Boolean);

  const componentsToRender = {
    fauxHeadline,
    visuallyHiddenHeadline,
    headline: headings,
    subheadline: headings,
    text,
    image,
    timestamp: props =>
      allowDateStamp ? (
        <StyledTimestamp {...props} popOut={false} minutesTolerance={1} />
      ) : null,
    video: props => <MediaPlayer {...props} assetUri={assetUri} />,
    version: props => <MediaPlayer {...props} assetUri={assetUri} />,
    byline: props => <StyledByline {...props} />,
    include: props => <Include {...props} />,
    social_embed: props => <SocialEmbed {...props} />,
    mpu: props =>
      isAdsEnabled ? <MpuContainer {...props} slotType="mpu" /> : null,
    wsoj: props => (
      <CpsRecommendations
        {...props}
        parentColumns={gridColsMain}
        items={recommendationsInitialData}
      />
    ),
  };

  const StyledByline = styled(Byline)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING_DBL};
    }

    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      padding-bottom: ${GEL_SPACING_TRPL};
    }
  `;

  const StoryPageGrid = styled(GelPageGrid)`
    width: 100%; /* Needed for IE11 */
    margin: 0 auto;
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
    }
  `;

  // Firefox specific styling to prevent content from overflowing on smaller resolutions
  const GridPrimaryColumn = styled(Grid)`
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      width: 100%;
    }
    padding-bottom: ${GEL_SPACING_QUAD};
  `;

  const GridSecondaryColumn = styled(Grid)`
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      margin-top: ${GEL_SPACING_QUAD};
    }
  `;

  const ComponentWrapper = styled.div`
    margin-bottom: ${GEL_SPACING_TRPL};
    padding: ${GEL_SPACING_DBL};
  `;

  /**
   * this should be the defacto wrapper for OJs
   * as it displays a conditional padding, which
   * works well for mobile view.
   */
  const ResponsiveComponentWrapper = styled.div`
    margin-bottom: ${GEL_SPACING_TRPL};
    @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      margin-bottom: ${GEL_SPACING_SEXT};
      padding: ${GEL_SPACING_DBL};
    }
  `;

  const MostReadWrapper = ({ children }) => (
    <section role="region" aria-labelledby="Most-Read" data-e2e="most-read">
      <SectionLabel
        script={script}
        labelId="Most-Read"
        service={service}
        dir={dir}
      >
        {header}
      </SectionLabel>
      {children}
    </section>
  );

  MostReadWrapper.propTypes = {
    children: node.isRequired,
  };

  const [headline, timestamp, ...bodyBlocks] = blocks;
  const numberOfCards = 5;

  const cardBlocks = bodyBlocks.slice(0, numberOfCards);

  const loaderRef = useRef();

  const loadNextArticle = async () => {
    const itemToLoad = relatedContent[nextRelatedItem];

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const nextStoryData = await fetchPageData({
      path: itemToLoad.locators.assetUri,
      service,
      variant,
      pageType: itemToLoad.cpsType,
      toggles: {},
      forceLiveData: true,
    });

    setNextRelatedItem(prev => prev + 1);
    setIsLoading(false);
    setInfiniteStories(prev => [...prev, nextStoryData.pageData]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadNextArticle();
        }
      });
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  });

  return (
    <>
      <CpsMetadata
        title={title}
        shortHeadline={shortHeadline}
        language={lang}
        description={summary}
        firstPublished={firstPublished}
        lastPublished={lastPublished}
        imageLocator={indexImageLocator}
        imageAltText={indexImageAltText}
        aboutTags={aboutTags}
        hasAppleItunesAppBanner
      />
      <LinkedData
        type={categoryType(category)}
        seoTitle={title}
        headline={title}
        description={summary}
        showAuthor
        datePublished={firstPublished}
        dateModified={lastPublished}
        aboutTags={aboutTags}
        imageLocator={indexImageLocator}
      />
      <ATIAnalytics data={pageData} />
      <ChartbeatAnalytics data={pageData} />
      <ComscoreAnalytics />
      {/* dotcom and dotcomConfig need to be setup before the main dotcom javascript file is loaded */}
      {isAdsEnabled && !isAmp && (
        <CanonicalAdBootstrapJs adcampaign={adcampaign} />
      )}
      {isAdsEnabled && <AdContainer slotType="leaderboard" />}
      <StoryPageGrid
        columns={gridColumns}
        enableGelGutters
        margins={gridMargins}
      >
        <GridPrimaryColumn
          item
          columns={gridColsMain}
          startOffset={gridOffset}
          parentColumns={gridColumns}
        >
          <main role="main">
            <Blocks
              blocks={[headline, timestamp]}
              componentsToRender={componentsToRender}
            />
            <>
              <CardTrackWrapper>
                <CardTrack>
                  <Blocks
                    blocks={cardBlocks}
                    componentsToRender={componentsToRender}
                    isCardFormat
                    setShowFullStory={setShowFullStory} showFullStory={showFullStory}
                  />
                </CardTrack>
              </CardTrackWrapper>
            </>
            <>
              <button
                type="button"
                onClick={() => setShowFullStory(!showFullStory)}
              >
                Show Full Story
              </button>
              <FullStorySection show={showFullStory}>
                <Blocks
                  blocks={bodyBlocks}
                  componentsToRender={componentsToRender}
                />
              </FullStorySection>
            </>
            {infiniteStories.map(storyData => (
              <InfiniteStory pageData={storyData} />
            ))}
            <div ref={loaderRef}>{isLoading ? 'Loading...' : 'Load More'}</div>
          </main>
          {/* <CpsRelatedContent
            content={relatedContent}
            parentColumns={gridColsMain}
          /> */}
        </GridPrimaryColumn>
        {/* <GridSecondaryColumn
          item
          columns={gridColsSecondary}
          parentColumns={gridColumns}
          // `serviceLang` is defined when the language the page is written in is different to the
          // language of the service. `serviceLang` is used to override the page language.
          lang={serviceLang}
        >
          {topStoriesInitialData && (
            <ResponsiveComponentWrapper>
              <TopStories
                content={topStoriesInitialData}
                parentColumns={gridColsSecondary}
              />
            </ResponsiveComponentWrapper>
          )}
          {featuresInitialData && (
            <ResponsiveComponentWrapper>
              <FeaturesAnalysis
                content={featuresInitialData}
                parentColumns={gridColsSecondary}
              />
            </ResponsiveComponentWrapper>
          )}
          <ComponentWrapper>
            <MostReadContainer
              mostReadEndpointOverride={mostReadEndpointOverride}
              columnLayout="oneColumn"
              size="small"
              wrapper={MostReadWrapper}
              initialData={mostReadInitialData}
            />
          </ComponentWrapper>
        </GridSecondaryColumn> */}
      </StoryPageGrid>
    </>
  );
};

StoryPage.propTypes = cpsAssetPagePropTypes;

export default StoryPage;
