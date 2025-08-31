"use server";
import "server-only";
import Container from "@/components/container";


export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container>
      {children}
    </Container>
  )
}
