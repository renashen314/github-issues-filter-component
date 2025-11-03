import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";
import { useQuery } from "@tanstack/react-query";

const MilestoneFilter = () => {
  const { data: milestones } = useQuery({
    queryKey: ["milestones"],
    queryFn: async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/milestones",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      return data;
    },
  });
  console.log("milestones", milestones);

  // todo - render milestones
  return (
    <GithubFilter
      name="Milestones"
      title="Filter by milestones"
      placeholder="milestones"
      data={milestones}
      renderData={(milestone) => milestone.title}
      filterFn={(milestone, query) =>
        milestone.title.match(new RegExp(query, "i"))
      }
    />
  );
};

export default MilestoneFilter;
