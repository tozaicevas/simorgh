import React, { useContext } from 'react';
import MediaPlayerContainer from '../MediaPlayer';
import { RequestContext } from '#contexts/RequestContext';
import { MediumGridWithoutMargin } from '#lib/styledGrid';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const ArticleMediaPlayerContainer = ({ blocks }) => {
  const { id } = useContext(RequestContext);

  return (
    <MediumGridWithoutMargin>
      <MediaPlayerContainer
        blocks={blocks}
        assetId={id}
        assetType="articles"
        showPlaceholder
      />
    </MediumGridWithoutMargin>
  );
};

ArticleMediaPlayerContainer.propTypes = mediaPlayerPropTypes;
ArticleMediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default ArticleMediaPlayerContainer;
