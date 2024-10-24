import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
  type Post = {
    title : Text;
    body : Text;
    author : Text;
  };

  stable var posts : [Post] = [];

  public func addPost(title : Text, body : Text, author : Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
    };
    posts := Array.append<Post>(posts, [newPost]);
  };

  public query func getPosts() : async [Post] {
    return posts;
  };
}
