"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function UserPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    const prev = { ...user };
    setUser((u) => ({ ...u, name: formData.name, email: formData.email }));
    setShowForm(false);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...user,
            name: formData.name,
            email: formData.email,
          }),
        },
      );
      if (!res.ok) throw new Error("Update failed");
      showToast("User updated successfully");
    } catch (err) {
      setUser(prev);
      setError(err.message);
      setShowForm(true);
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Delete failed");
      router.push("/users");
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <span className="nav-logo">UserCRUD</span>
            <span className="nav-sep">/</span>
            <Link href="/users" className="nav-link">
              users
            </Link>
            {user && (
              <>
                <span className="nav-sep">/</span>
                <span className="nav-link">{user.name}</span>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            Loading user…
          </div>
        )}

        {error && <div className="error-box">{error}</div>}

        {user && (
          <>
            <div className="page-header">
              <p className="page-label">User Detail</p>
              <h1 className="page-title">
                {user.name.split(" ")[0]}{" "}
                <span>{user.name.split(" ").slice(1).join(" ")}</span>
              </h1>
            </div>

            <Link href="/users" className="back-link">
              ← Back to users
            </Link>

            <div className="user-card">
              <div className="user-card-header">
                <div>
                  <div className="user-display-name">{user.name}</div>
                  <div className="user-display-email">{user.email}</div>
                </div>
                <span className="user-id-badge">ID #{user.id}</span>
              </div>
              <div className="user-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Username</span>
                  <span className="meta-value">{user.username}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Phone</span>
                  <span className="meta-value">{user.phone}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Website</span>
                  <span className="meta-value">{user.website}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Company</span>
                  <span className="meta-value">{user.company?.name}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">City</span>
                  <span className="meta-value">{user.address?.city}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Street</span>
                  <span className="meta-value">{user.address?.street}</span>
                </div>
              </div>
            </div>

            <div className="action-bar">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFormData({ name: user.name, email: user.email });
                  setShowForm((v) => !v);
                }}
              >
                {showForm ? "Cancel" : "✎ Update"}
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "✕ Delete"}
              </button>
            </div>

            {showForm && (
              <form className="form-panel" onSubmit={handleUpdate}>
                <div className="form-title">Update User</div>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updating}
                  >
                    {updating ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
