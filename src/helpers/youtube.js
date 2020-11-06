import getEnvironmentVariable from '../constants/environment';

const apiBaseURL = getEnvironmentVariable('REACT_APP_API_URL');
const apiKey = getEnvironmentVariable('REACT_APP_API_KEY');

export function getPlaylistDataById(playlistId) {
  const fields = 'items(id,snippet)';
  const url = `${apiBaseURL}/playlists?key=${apiKey}&fields=${fields}&maxResults=50&part=snippet&id=${playlistId}`;

  return fetch(url);
}

export function getPlaylistItemData(playlistId, nextPageToken = false) {
  const fields =
    'nextPageToken,items(id,snippet/title,snippet/description,snippet/thumbnails,contentDetails(videoId,startAt,endAt))';
  const url = `${apiBaseURL}/playlistItems?key=${apiKey}&fields=${fields}&maxResults=50&part=snippet%2CcontentDetails&playlistId=${playlistId}&pageToken=${
    nextPageToken || ''
  }`;

  return fetch(url);
}
