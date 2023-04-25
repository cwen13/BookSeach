import {gql } from "@apollo/client";

export const GET_ME = gql`
  {
    user {
      username
      email
      bookCount
      savedBooks
    }
  }
`;
