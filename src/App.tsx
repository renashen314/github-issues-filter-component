import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthorFilter from "./components/AuthorFilter";
import LabelFilter from "./components/LabelFilter";
import MilestoneFilter from "./components/MilestoneFilter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold m-5">Github Issue filters</h1>
      <div className="flex bg-gray-100 text-gray-600 pr-5 border border-gray-300">
        <div className="ml-auto flex gap-10 m-3 text-sm">
          <AuthorFilter />
          <LabelFilter />
          <MilestoneFilter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
