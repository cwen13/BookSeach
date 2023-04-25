import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, passwod: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $author: [String!]!,
    $description: String!,
    $bookId: String!,
    $image: String,
    $link: String,
    $title: String!
  ) {
    user {
      savedBooks {    
        author: $author
        desription: $desciption
        bookId: $bookId
        image: $image
        link: $link
        title: $title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    user 
  }
`;

