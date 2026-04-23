import Link from 'next/link';
import Nav from '../components/Nav';

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export default async function UsersPage() {
  let users = [];
  let error = null;

  try {
    users = await getUsers();
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="page-header">
          <p className="page-label">Directory</p>
          <h1 className="page-title">
            All <span>Users</span>
          </h1>
        </div>

        {error && <div className="error-box">{error}</div>}

        {!error && (
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <Link href={`/users/${user.id}`}>
                  <button className="btn btn-outline">View →</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
