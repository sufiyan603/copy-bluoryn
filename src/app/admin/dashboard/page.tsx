import ECommerce from "components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Bluoryn Admin Panel",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Dashboard() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
