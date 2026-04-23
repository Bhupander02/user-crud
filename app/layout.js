import "./globals.css";

export const metadata = {
  title: "User CRUD",
  description: "Next.js CRUD app with JSONPlaceholder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
