import LogoutButton from "./LogoutButton";
import { getRequiredAuthSession } from "./auth";

export default async function User() {
  const session = await getRequiredAuthSession();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img src={session.user.image ?? ""} />
          </div>
        </div>
        <h2 className="card-title">{session.user.name}</h2>
        <p>{session.user.email}</p>
        <p className="text-xs italic text-gray-400">{session.user.id}</p>
        <div className="card-actions justify-end">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
