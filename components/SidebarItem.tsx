import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
        flex items-center p-2 text-neutral-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 group`,
        active && "text-neutral-950 bg-gray-100 dark:bg-neutral-700"
      )}
    >
      <Icon
        size={26}
        className={twMerge(
          ` w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-neutral-900 dark:group-hover:text-white`,
          active && "text-neutral-900 dark:text-white "
        )}
      />
      <span className="ml-3">{label}</span>
    </Link>
  );
};

export default SidebarItem;
