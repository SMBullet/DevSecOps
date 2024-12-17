import * as React from "react";

export const IntegrationHeader = () => {
  return (
    <div className="flex flex-col max-w-full px-8">
      <h2 className="text-2xl font-black leading-snug max-md:max-w-full">
        Integrations with your favorite apps
      </h2>
      <p className="mt-1.5 text-xl leading-7">
        Combine your favorite tools to build a personal workflow.
      </p>
    </div>
  );
}