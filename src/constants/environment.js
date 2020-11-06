export default function getEnvironmentVariable(id, override) {
  const environmentVariables = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_LANGUAGE: process.env.REACT_APP_LANGUAGE,
    REACT_APP_ANALYTICS_ID: process.env.REACT_APP_ANALYTICS_ID,
  };

  const environmentVariable = environmentVariables[id];

  if (!environmentVariable) {
    return undefined;
  }

  return environmentVariable;
}
