import React, { useEffect } from 'react';
import { styled } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TEXT_PRIMARY } from '../constants/colors';
import setRandomBg from '../helpers/layout/bg';
import { trackPageView } from '../helpers/analytics';

const About = () => {
  useEffect(() => {
    setRandomBg();
    trackPageView();
  });
  return (
    <AboutContainer item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <PageTitle>About</PageTitle>
        </Grid>
        <Grid item xs={12}>
          <AboutParagraph>
            I've created this tool to help out the people that wanted more out of Youtube
            playlists.
          </AboutParagraph>
          <PageSubTitle>
            It's an open-source project so any contributions are appreciated.
          </PageSubTitle>
          <AboutParagraph>
            Stefan Paduraru&nbsp;-&nbsp;
            <a
              style={{ color: TEXT_PRIMARY }}
              href="https://paduraru.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              paduraru.com
            </a>
          </AboutParagraph>
          <AboutParagraph>Latest Improvements</AboutParagraph>
          <AboutParagraph>(05 Apr 2021)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>
                added mix features (i know it's been a while since you guys asked for
                this){' '}
              </AboutParagraph>
            </li>
          </ul>
          <AboutParagraph>(06 Nov 2020)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>added repeat current song option </AboutParagraph>
            </li>
          </ul>
          <AboutParagraph>(08 Oct 2020)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>
                added more control over playlist items (refresh, remove){' '}
              </AboutParagraph>
            </li>
          </ul>
          <AboutParagraph>(29 Sept 2020)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>
                added visual effects toggle in place of the dynamic background toggle{' '}
              </AboutParagraph>
            </li>
            <li>
              <AboutParagraph>
                various performance improvements (a 5k videos playlist with effects turned
                off takes around a minute){' '}
              </AboutParagraph>
            </li>
          </ul>
          <AboutParagraph>(28 Sept 2020)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>
                added dynamic background toggle to mitigate performance issues on slower
                machines{' '}
              </AboutParagraph>
            </li>
          </ul>
          <AboutParagraph>(19 Aug 2020)</AboutParagraph>
          <ul>
            <li>
              <AboutParagraph>
                using React.Memo on playlist items to improve performance
              </AboutParagraph>
            </li>
            <li>
              <AboutParagraph>added about section</AboutParagraph>
            </li>
          </ul>
          <AboutParagraph align="center">
            <a
              rel="noopener noreferrer"
              href="https://github.com/stefanpaduraru/playlist-randomizer"
              target="_blank"
            >
              <img
                src="./images/icons/github.png"
                alt="Playlist-randomizer Github Repository"
              />
            </a>
          </AboutParagraph>
        </Grid>
      </Grid>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled(({ ...other }) => <Grid {...other} />)({
  marginBottom: 0,
  overflow: 'scroll',
  maxHeight: '80vh',
});

const PageTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.75em',
  },
});

const PageSubTitle = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.15em',
  },
});

const AboutParagraph = styled(Typography)({
  '&': {
    color: TEXT_PRIMARY,
    fontSize: '1.15em',
    marginTop: '1.3em',
  },
});
