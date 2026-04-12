import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SettingForm } from "@/components/forms/SettingForm";
import { readSetting } from "@/app/actions";
import { Badge } from "../ui/badge";

export async function SettingModal() {
  const result = await readSetting();
  let entityType = "";
  let entityId = "";
  let keys = "";
  let useStrictDataTypes = "";
  if (result.success && result.data.setting) {
    const s = result.data.setting;
    entityType = s.entityType;
    entityId = s.entityId;
    keys = s.keys;
    useStrictDataTypes = s.useStrictDataTypes;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="gap-1">
          <Icons.setting className="h-5 w-5" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            <p>
              Here you can adjust your telemetry settings to connect to
              ThingsBoard:
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex gap-1">
                <h1>EntityType:</h1>
                <Badge>{entityType ? entityType : "NA"}</Badge>
              </div>
              <div className="flex gap-1">
                <h1>EntityId:</h1>
                <Badge>{entityId ? entityId : "NA"}</Badge>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <SettingForm />
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
