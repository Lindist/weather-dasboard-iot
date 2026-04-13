import { readSetting } from "@/app/actions";
import { SettingModalClient } from "./SettingModalClient";

export const SettingModal = async () => {
  const result = await readSetting();
  let entityType = "";
  let entityId = "";
  if (result.success && result.data.setting) {
    const s = result.data.setting;
    entityType = s.entityType;
    entityId = s.entityId;
  }
  return (
    <SettingModalClient entityType={entityType} entityId={entityId} />
  );
};
