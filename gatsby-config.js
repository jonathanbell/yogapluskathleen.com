module.exports = {
  siteMetadata: {
    title: 'Yoga Plus Kathleen',
    desc:
      'Kathleen Kovach teaches SvaroopaⓇ and Hatha Yoga Classes in Victoria BC, Canada.'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // When the site is built this writes styled components out to actual
    // CSS styles, not JS styles and avoids FOUC : )
    'gatsby-plugin-styled-components',
    // Gives access to a nifty little unfocused/"sharpen" image plugin thingy
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // Supply a way for Gatsby to use the files (images, etc)
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`
      }
    },
    // Wordpress support
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'api.yogapluskathleen.com',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: false
      }
    },
    // Netlify deployment support
    'gatsby-plugin-netlify'
  ]
};
