"use client";

import dynamic from "next/dynamic";

const ProfileModal = dynamic(
  () => import("./modals/ProfileModal").then((m) => m.ProfileModal),
  { ssr: false }
);
const ProfileDrawer = dynamic(
  () => import("./drawers/ProfileDrawer").then((m) => m.ProfileDrawer),
  { ssr: false }
);
const SettingModalClient = dynamic(
  () => import("./modals/SettingModalClient").then((m) => m.SettingModalClient),
  { ssr: false }
);
const SettingDrawer = dynamic(
  () => import("./drawers/SettingDrawer").then((m) => m.SettingDrawer),
  { ssr: false }
);

export const NavbarClientActions = () => {
  return (
    <>
      <li className="hidden md:block">
        <ProfileModal />
      </li>
      <li className="md:hidden">
        <ProfileDrawer />
      </li>
      <li className="hidden md:block">
        <SettingModalClient entityType="" entityId="" />
      </li>
      <li className="md:hidden">
        <SettingDrawer />
      </li>
    </>
  );
};

