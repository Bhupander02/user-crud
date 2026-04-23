import Link from "next/link";

export default function Nav({ crumb }) {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-inner">
          <span className="nav-logo">UserCRUD</span>
          <span className="nav-sep">/</span>
          <Link href="/users" className="nav-link">
            users
          </Link>
          {crumb && (
            <>
              <span className="nav-sep">/</span>
              <span className="nav-link">{crumb}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
