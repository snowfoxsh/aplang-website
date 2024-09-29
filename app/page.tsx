import {Separator} from "@/components/ui/separator";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Button} from "@/components/ui/button";
import {ColorModeToggle} from "@/app/components/color-mode-toggle";

export default function Playground() {
  return (
      <>
          {/*<div className={"container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"}>*/}
          {/*    <h2 className={"text-lg font-semibold"}>Playground</h2> /!* add on click menu here that takes you to links *!/*/}
          {/*    /!*light dark theme switcher*!/*/}
          {/*</div>*/}
          <div className={"w-full flex flex-row justify-between space-y-2 px-8 sm:flex-row sm:items-center sm:space-y-0 md:h-16"}>
              <HoverCard>
                  <HoverCardTrigger>
                      <h2 className={"text-lg font-bold"}>Playground</h2>
                  </HoverCardTrigger>
                  <HoverCardContent className={"flex flex-col content-center items-center space-y-2 [&>*]:w-full"}>
                      <Button variant={"secondary"}>Home</Button>
                      <Button variant={"secondary"}>Docs</Button>
                      <Button variant={"secondary"}>Repo</Button>
                  </HoverCardContent>
              </HoverCard>
              <ColorModeToggle/>
          </div>
          <Separator/>
          <div className={"flex-1"}></div>
      </>
  );
}
