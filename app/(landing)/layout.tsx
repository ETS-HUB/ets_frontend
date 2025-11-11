import { Container } from "../components";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
