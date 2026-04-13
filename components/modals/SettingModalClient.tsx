"use client";

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
import { Badge } from "../ui/badge";

export type SettingModalClientProps = {
  entityType: string;
  entityId: string;
};

export const SettingModalClient = ({
  entityType,
  entityId,
}: SettingModalClientProps) => {
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
          <DialogDescription asChild>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground">
              <p className="m-0">
                Here you can adjust your telemetry settings to connect to
                ThingsBoard:
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-foreground">
                    EntityType:
                  </span>
                  <Badge>{entityType ? entityType : "NA"}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-foreground">
                    EntityId:
                  </span>
                  <Badge>{entityId ? entityId : "NA"}</Badge>
                </div>
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
};
