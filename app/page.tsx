import {Separator} from "@/components/ui/separator";

export default function Playground() {
  return (
      <>
          {/*<div className={"container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"}>*/}
          {/*    <h2 className={"text-lg font-semibold"}>Playground</h2> /!* add on click menu here that takes you to links *!/*/}
          {/*    /!*light dark theme switcher*!/*/}
          {/*</div>*/}
          <div className={"container flex flex-col items-start justify-between space-y-2 p-4 px-8"}>
              <h2 className={"text-lg font-semibold"}>Playground</h2> {/* add on click menu here that takes you to links */}
          </div>

          <Separator/>
      </>
  );
}
