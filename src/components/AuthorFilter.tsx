import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";
import { useQuery } from "@tanstack/react-query";

const AuthorFilter = () => {
  const { data: authors } = useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      return data;
    },
  });

  console.log("authors", authors);

  // todo - render authors
  return (
    <GithubFilter
      name="Author"
      title="Filter by author"
      placeholder="Filter by author"
      data={authors}
      renderData={(author) => (
        <div className="flex gap-2 items-center">
          <img
            src={author.avatar_url}
            alt={author.login}
            className="w-4 h-4 rounded-lg border border-gray-300"
          />
          {author.login}
        </div>
      )}
      filterFn={(author, query) => author.login?.match(new RegExp(query, "i"))}
    />
  );
};
export default AuthorFilter;
