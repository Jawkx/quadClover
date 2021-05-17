import fetch from "node-fetch";

const baseURI = "https://a.4cdn.org/";
const imageBaseURI = "https://i.4cdn.org/";
export const getAllBoards = async (updateBoards) => {
  const response = await fetch(baseURI + "boards.json");
  const data = await response.json();
  updateBoards(data.boards);
};

export const getThreads = async (code, page, updateThreads) => {
  const response = await fetch(`${baseURI}${code}/${page}.json`);
  const data = await response.json();

  updateThreads(data.threads);
};

export const getImageURI = (boardCode, tim, ext) => {
  return `${imageBaseURI}/${boardCode}/${tim}${ext}`;
};

export const getPosts = async (boardCode, threadCode, updatePosts) => {
  const response = await fetch(
    `${baseURI}${boardCode}/thread/${threadCode}.json`
  );
  const data = await response.json();

  updatePosts(data.posts);
};
