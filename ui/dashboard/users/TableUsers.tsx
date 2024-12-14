import { useGetUsers } from "@/src/services/users/usersQueries";
import { useSearchParams } from "next/navigation";

export default function TableUsers() {
  const usersSearchParams = useSearchParams();

  const page = usersSearchParams.get("page");
  const size = usersSearchParams.get("size");

  const { data } = useGetUsers({
    page: page ? Number(page) - 1 : 0,
    size: size ? Number(size) : 10,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        {data?.items?.map((user) => (
          <div className="flex gap-4">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.status}</span>
            <span>{user.cc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
