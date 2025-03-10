import { useQuery } from "@tanstack/react-query";
import { Eye, GitFork, Loader2, Star } from "lucide-react";
import { useState } from "react";
import { Repo } from "../types/repo";
import { Button } from "./ui/button";
import { cn, formatDate, getColorLang } from "../lib/utils";
import { Badge } from "./ui/badge";

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="w-full bg-primary-foreground p-2 rounded-lg space-y-2">
      <div className="flex items-start gap-4 justify-between">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <h2 className="font-bold text-blue-500">{repo.name}</h2>
        </a>
        <div className="space-x-2">
          <Badge className="capitalize ">{repo.visibility}</Badge>
          <Badge variant={"outline"}>
            <Star /> {repo.stargazers_count}
            <Eye /> {repo.watchers_count}
            <GitFork /> {repo.forks_count}
          </Badge>
        </div>
      </div>
      <div className="gap-1 text-xs flex flex-col">
        <span>Updated on {formatDate(repo.pushed_at)}</span>
        <div className="flex items-center gap-1">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: getColorLang(repo.language) ?? "" }}
          ></div>
          <span className="text-primary/50">{repo.language}</span>
        </div>
      </div>
    </div>
  );
}

export default function Repos({ username }: { username: string }) {
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<Repo[]>([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?page=${page}&per_page=4`
      );
      const data = await response.json();
      setRepos((old) => [...old, ...data]);
      return data;
    } catch (error) {
      console.error("Failed to fetch repos:", error);
      throw error;
    }
  };

  const { data, error, isLoading, isFetching } = useQuery<Repo[]>({
    queryKey: ["user-repos", username, page],
    queryFn: fetchRepos,
    staleTime: 1000,
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = () => {
    setPage((old) => old + 1);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-2">
      {repos.length > 0 ? (
        repos.map((repo, i) => <RepoCard key={repo.id + i} repo={repo} />)
      ) : !isFetching ? (
        <div className="text-center">no repository found</div>
      ) : (
        <div className="flex justify-center">
          <Loader2 className="animate-spin size-4" />
        </div>
      )}
      <div
        className={cn(
          "flex justify-center mt-4",
          !isLoading && data && data?.length < 4 && "hidden"
        )}
      >
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={handleLoadMore}
          disabled={isLoading || isFetching}
          className="cursor-pointer"
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
