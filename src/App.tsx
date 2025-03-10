import { useMutation } from "@tanstack/react-query";
import { ExternalLink, Loader2, Search, UserRoundX, XIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import GithubLogoLight from "./assets/github-mark-white.svg";
import GithubLogoDark from "./assets/github-mark.svg";
import { ModeToggle } from "./components/mode-togle";
import Repos from "./components/repos";
import { useTheme } from "./components/theme-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { cn } from "./lib/utils";
import { User, UsersResult } from "./types/user";
import { toast } from "sonner";

function App() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}&page=${page}&per_page=5`
      );
      const data = await response.json();
      setUsers((old) => [...old, ...data.items]);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const { isPending, data, mutate, reset, status } = useMutation<UsersResult>({
    mutationFn: fetchUsers,
    onError: () => {
      toast("Error fetching users");
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && username.trim()) {
      setUsers([]);
      setPage(1);
      mutate();
    }
  };

  const handleSearch = () => {
    if (username.trim()) {
      setUsers([]);
      setPage(1);
      mutate();
    }
  };

  const handleClear = () => {
    setUsers([]);
    setUsername("");
    reset();
  };

  const handleLoadMore = () => {
    setPage((old) => old + 1);
    mutate();
  };

  return (
    <main className="w-full min-h-screen h-full bg-background flex items-center pt-20 font-sans relative flex-col">
      <div className="max-w-2xl h-full w-full p-4 flex flex-col items-center justify-center gap-4">
        <Header theme={theme} />
        <SearchBar
          username={username}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          isPending={isPending}
          mutate={handleSearch}
          clear={handleClear}
          total_count={data?.total_count}
        />
        <UserResults data={users} isPending={isPending} status={status} />
        {data && data.total_count > users.length && data.total_count >= 5 && (
          <Button onClick={handleLoadMore}>Load More</Button>
        )}
      </div>
      <ModeToggle />
    </main>
  );
}

const Header = ({ theme }: { theme: string }) => (
  <div className="flex flex-col items-center gap-2">
    <img
      src={theme === "dark" ? GithubLogoLight : GithubLogoDark}
      alt="github logo"
      className="rounded-lg size-16 bg-background"
    />
    <h1 className="text-primary text-2xl md:text-4xl font-sans font-bold text-center">
      Github Repository Explorer
    </h1>
  </div>
);

const SearchBar = ({
  username,
  handleChange,
  handleKeyDown,
  isPending,
  mutate,
  clear,
  total_count,
}: {
  username: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isPending: boolean;
  mutate: () => void;
  clear: () => void;
  total_count?: number;
}) => (
  <div className="w-full space-y-2">
    <div className="flex w-full items-center space-x-2">
      <Input
        className="w-full h-12"
        placeholder="Enter Username"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={username}
        disabled={isPending}
        icon={
          <XIcon
            onClick={clear}
            className={cn(
              "size-4 cursor-pointer hidden",
              username.length > 0 && "block"
            )}
          />
        }
      />
      <Button
        type="submit"
        className="h-12 cursor-pointer w-12"
        onClick={mutate}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Search />}
      </Button>
    </div>
    {total_count ? <Badge>{total_count} user found</Badge> : null}
  </div>
);

const UserResults = ({
  data,
  isPending,
  status,
}: {
  data: User[];
  isPending: boolean;
  status: string;
}) => (
  <div className="flex flex-col w-full">
    <Accordion type="single" collapsible className="w-full">
      {data?.map((user) => (
        <AccordionItem value={user.login} key={user.id}>
          <div className="sticky top-0 bg-background z-20">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar_url} alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{user.login}</span>
                <a
                  href={user.html_url}
                  target="_blank"
                  className="flex items-center"
                >
                  <ExternalLink className="size-3 ml-1 mt-0.5" />
                </a>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <Repos username={user.login} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    {isPending ? (
      <div className="space-y-2">
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
        <Skeleton className="w-full h-16" />
      </div>
    ) : (
      status !== "idle" &&
      data.length === 0 && (
        <div className="flex items-center justify-center gap-2">
          <UserRoundX size={18} />
          <span>User not found</span>
        </div>
      )
    )}
  </div>
);

export default App;
