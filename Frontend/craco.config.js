const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      // https://lightrun.com/answers/react-keycloak-react-keycloak-several-source-map-warnings-after-update-react-scripts-to-v500
      ignoreWarnings: [/Failed to parse source map.*(antd).*/],
    },
  },
};
