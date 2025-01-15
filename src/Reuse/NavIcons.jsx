import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavIcons({ icon }) {
  return (
    <div>
      <FontAwesomeIcon icon={icon} className="lg:hidden cursor-pointer" />
    </div>
  );
}
