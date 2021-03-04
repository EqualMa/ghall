export const DEFAULT_QUERY = `\
# Welcome to Ghall GraphiQL
#
# Ghall is a subset of public GitHub api, which doesn't require authentication.
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
query userInfo($login: String!="EqualMa") {
  user(login: $login) {
    avatarUrl
    bio
    bioHTML
    company
    companyHTML
    databaseId
	 	# email will always be "" because it's only visible for logged in users
    email
    id
    location
    login
    name
    pinnedItems(first: 6) {
      totalCount
      nodes {
        ... on Repository {
          __typename
          name
          url
          description
          forkCount
        }
        ... on Gist {
          __typename
          id
          name
          stargazers {
            totalCount
          }
          url
          description
        }
      }
    }
    resourcePath
    status {
      emoji
      emojiHTML
      message
      user {
        login
      }
    }
    twitterUsername
    url
    websiteUrl
  }
}
`;
