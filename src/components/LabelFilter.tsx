import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";
import { useQuery } from "@tanstack/react-query";

const LabelFilter = () => {
  const { data: labels } = useQuery({
    queryKey: ["labels"],
    queryFn: async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      return data;
    },
  });

  console.log("labels", labels);

  // todo - render labels
  return (
    <GithubFilter
      name="Label"
      title="Filter by label"
      data={labels}
      renderData={(label) => (
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: `#${label.color}` }}
            className="w-4 h-4 rounded-lg border border-gray-300"
          ></div>
          {label.name}
        </div>
      )}
      placeholder="label"
      filterFn={(label, query) => label.name.match(new RegExp(query, "i"))}
    />
  );
};

export default LabelFilter;
