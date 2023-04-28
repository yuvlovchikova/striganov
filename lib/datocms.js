import { gql, GraphQLClient } from "graphql-request";

// Запросы ==================================================

//* Адреса
export async function getAddresses() {
  const query = gql`
  {
    allAddresses {
      id
      address
      description
      picture {
        responsiveImage {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
    }
  }
  `;
  const response = await graphQLRequest({ query });
  return response.allAddresses;
}

//* Услуги
export async function getServices() {
  const query = gql`
  {
    allServices {
      id
      name
      price
      description
      picture {
        responsiveImage {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
    }
  }`;
  const response = await graphQLRequest({ query });
  return response.allServices;
}

//* вакансии ========
export async function getPositions() {
  const query = gql`
  {
    allPositions {
      positionSlug
      positionName
      positionDescription {
        value
      }
    }
  }
  `;
  const response = await graphQLRequest({ query });
  return response.allPositions;
}

//* Статьи ==========
export async function getArticles() {
  const query = gql`
  {
    allArticles {
      title
      slug
      short
      date
      mainPicture {
        alt
        responsiveImage {
          sizes
          src
          width
          height
          alt
          title
          base64
        }
      }
    }
  }`;
  const response = await graphQLRequest({ query });
  return response.allArticles;
}
export async function getArticlesPaths() {
  const query = gql`
  {
    allArticles {
      slug
    }
  }`;
  const response = await graphQLRequest({ query });
  return response.allArticles;
}

export async function getArticleDetails(slug) {
  const query = gql`
    query MyQuery($slug: String) {
      article(filter: {slug: {eq: $slug}}) {
        title
        short
        seo {
          twitterCard
          title
          description
        }
        articleText {
          value
        }
        mainPicture {
          alt
          responsiveImage {
            sizes
            src
            width
            height
            alt
            title
            base64
          }
        }
      }
    }  `;

  const variables = { slug }

  const response = await graphQLRequest({ query, variables });
  return response.article;
}


// Инструменты ==============================================
export function graphQLRequest(options) {
  const { query, variables, includeDrafts, excludeInvalid } = options;

  const headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  };
  if (includeDrafts) {
    headers["X-Include-Drafts"] = "true";
  }
  if (excludeInvalid) {
    headers["X-Exclude-Invalid"] = "true";
  }
  const client = new GraphQLClient("https://graphql.datocms.com", { headers });
  return client.request(query, variables);
}
