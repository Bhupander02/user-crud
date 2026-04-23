2import Nav from '../../components/Nav';
import UserDetail from './UserDetail';

async function getUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('User not found');
  return res.json();
}

export default async function UserPage({ params }) {
  let user = null;
  let error = null;

  try {
    user = await getUser(params.id);
  } catch (e) {
    error = e.message;
  }

  return (
    <>
      <Nav crumb={user ? user.name : params.id} />
      <div className="container">
        <div className="page-header">
          <p className="page-label">User Detail</p>
          <h1 className="page-title">
            {user ? (
              <>
                {user.name.split(' ')[0]} <span>{user.name.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              'User'
            )}
          </h1>
        </div>

        {error && <div className="error-box">{error}</div>}
        {user && <UserDetail initialUser={user} />}
      </div>
    </>
  );
}
