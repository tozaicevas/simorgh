import { C_POSTBOX, C_WHITE } from '@bbc/psammead-styles/colours';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { news as brandSVG } from '@bbc/psammead-assets/svgs';
import '@bbc/moment-timezone-include/tz/Europe/London';

const service = {
  default: {
    lang: `gd`,
    articleAuthor: `https://www.facebook.com/BBCNaidheachdan`,
    articleTimestampPrefix: 'Updated',
    atiAnalyticsAppName: 'news-naidheachdan',
    atiAnalyticsProducerId: '79',
    brandName: "Naidheachdan a' BhBC",
    product: "Naidheachdan a' BhBC",
    defaultImage:
      'https://www.bbc.co.uk/news/special/2015/newsspec_11063/naidheachdan_1024x576.png',
    defaultImageAltText: "Naidheachdan a' BhBC",
    dir: `ltr`,
    externalLinkText: ', external',
    imageCaptionOffscreenText: 'Image caption, ',
    videoCaptionOffscreenText: 'Video caption, ',
    audioCaptionOffscreenText: 'Audio caption',
    defaultCaptionOffscreenText: 'Caption, ',
    imageCopyrightOffscreenText: 'Image source, ',
    locale: `gd`,
    datetimeLocale: `gd`,
    service: 'naidheachdan',
    serviceName: 'Naidheachdan',
    themeColor: `${C_POSTBOX}`,
    twitterCreator: '@bbcnaidheachdan',
    twitterSite: '@bbcnaidheachdan',
    noBylinesPolicy: 'https://www.bbc.com/news/help-41670342#authorexpertise',
    publishingPrinciples: 'https://www.bbc.com/news/help-41670342',
    script: latinDiacritics,
    manifestPath: '/manifest.json',
    swPath: '/sw.js',
    frontPageTitle: 'Dachaigh',
    theming: {
      brandBackgroundColour: `${C_POSTBOX}`,
      brandLogoColour: `${C_WHITE}`,
    },
    translations: {
      seeAll: 'See all',
      home: 'Alba',
      currentPage: 'Current page',
      skipLinkText: 'Air adhart',
      relatedContent: 'Related content',
      error: {
        404: {
          statusCode: '404',
          title: '404 – Chan eil sgeul air an duilleig',
          message:
            "'S dòcha gur e as coireach gun do sgrìobh sibh an seòladh ceàrr. Thoiribh sùil air an t-seòladh agus an litreachadh.",
          solutions: [
            'Double checking the url',
            'Hitting the refresh button in your browser',
            'Searching for this page using the BBC search bar',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: "Duilleag Dachaigh Naidheachdan a' BhBC",
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/naidheachdan',
        },
        500: {
          statusCode: '500',
          title: '500 - Mearachd',
          message: 'Bha trioblaid ann. Ùraich an duilleag.',
          solutions: [
            'Hitting the refresh button in your browser',
            'Coming back again later',
          ],
          callToActionFirst: 'Alternatively, please visit the ',
          callToActionLinkText: "Duilleag Dachaigh Naidheachdan a' BhBC",
          callToActionLast: '',
          callToActionLinkUrl: 'https://www.bbc.com/naidheachdan',
        },
      },
      consentBanner: {
        privacy: {
          title: "We've updated our Privacy and Cookies Policy",
          description: {
            uk: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
            international: {
              first:
                "We've made some important changes to our Privacy and Cookies Policy and we want you to know what this means for you and your data.",
              linkText: null,
              last: null,
              linkUrl: null,
            },
          },
          accept: 'OK',
          reject: "Find out what's changed",
          rejectUrl: 'https://www.bbc.co.uk/usingthebbc/your-data-matters',
        },
        cookie: {
          title: 'Let us know you agree to cookies',
          description: {
            uk: {
              first: 'We use ',
              linkText: 'cookies',
              last:
                ' to give you the best online experience. Please let us know if you agree to all of these cookies.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
            international: {
              first: 'We and our partners use technologies, such as ',
              linkText: 'cookies',
              last:
                ', and collect browsing data to give you the best online experience and to personalise the content and advertising shown to you. Please let us know if you agree.',
              linkUrl:
                'https://www.bbc.co.uk/usingthebbc/cookies/what-do-i-need-to-know-about-cookies/',
            },
          },
          accept: 'Yes, I agree',
          reject: 'No, take me to settings',
          rejectUrl:
            'https://www.bbc.co.uk/usingthebbc/cookies/how-can-i-change-my-bbc-cookie-settings/',
        },
      },
      media: {
        audio: 'Fuaim',
        photogallery: 'Gailearaidh dhealbhan',
        video: 'Bhidio',
      },
    },
    brandSVG,
    mostRead: {
      header: 'Most read',
      lastUpdated: 'Last updated: ',
    },
    footer: {
      externalLink: {
        href: 'https://www.bbc.co.uk/help/web/links/',
        text: 'Read about our approach to external linking.',
      },
      links: [
        {
          href: 'https://www.bbc.com/news/help-41670342',
          text: 'Why you can trust the BBC',
        },
        {
          href: 'https://www.bbc.com/terms',
          text: 'Terms of Use',
        },
        {
          href: 'https://www.bbc.com/privacy/',
          text: 'Privacy Policy',
        },
        {
          href: 'https://www.bbc.com/usingthebbc/cookies/',
          text: 'Cookies',
        },
        {
          href: 'https://www.bbc.com/contact/',
          text: 'Contact the BBC',
        },
      ],
      copyrightText:
        "BhBC. Chan eil uallach air a' BhBC son na tha air làraichean-lìn eile",
    },
    fonts: [],
    timezone: 'Europe/London',
    navigation: [
      {
        title: 'Alba',
        url: '/naidheachdan',
      },
      {
        title: 'Scotland News',
        url: '/news/scotland',
      },
    ],
  },
};

export default service;
