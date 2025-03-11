import { SlPlus } from "react-icons/sl";

type LinkProps = {
  links: string[];
};

export default function Links({ links }: LinkProps) {
  return (
    <div>
      {links.length === 0 && (
        <div className="flex items-center">
          Click
          <SlPlus className="mx-2" />
          to add your first link.
        </div>
      )}
      <div className="">
        {links?.map((link, index) => {
          return <p key={index}>{link}</p>;
        })}
      </div>
    </div>
  );
}
