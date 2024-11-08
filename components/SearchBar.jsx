import Form from "next/form";
import ResetBtn from "./ResetBtn";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchBar({ search }) {
  return (
    <Form action="/" className="search-form">
      <input
        name="search"
        defaultValue={search}
        placeholder="Search Posts"
        className="search-input"
      />
      <div className="flex gap-2">
        {search && <ResetBtn />}
        <Button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
}
